import mongoose, { Connection } from 'mongoose';
import { cryptoService } from './cryptoService.js';
import { logger } from '../utils/logger.js';

/**
 * TenantManager : Gestionnaire de connexions multi-tenant (Piscine de connexions)
 */
class TenantManager {
    private connections = new Map<string, Connection>();
    private connectionMetrics = new Map<string, { lastAccess: number; averageLatencyMs: number; connectionErrors: number }>();

    /**
     * Récupère ou crée une connexion pour une organisation spécifique (Tenant)
     */
    async getTenantConnection(orgId: string, encryptedUri: string): Promise<Connection> {
        const startTime = Date.now();
        // 1. Vérifier si la connexion est déjà en cache
        if (this.connections.has(orgId)) {
            const conn = this.connections.get(orgId)!;
            // Vérifier si la connexion est toujours active
            if (conn.readyState === 1) {
                this.updateMetrics(orgId, Date.now() - startTime);
                return conn;
            }
            // Sinon on la supprime pour la recréer
            this.connections.delete(orgId);
        }

        try {
            // 2. Déchiffrer l'URI (AES-256)
            const uri = cryptoService.decrypt(encryptedUri);
            
            logger.info(`🏗️ TenantManager: Création d'une connexion dédiée pour l'organisation ${orgId}`);

            // 3. Créer une nouvelle connexion dédiée
            // Note: On utilise createConnection pour isoler les instances Mongoose
            const connection = await mongoose.createConnection(uri).asPromise();

            // 4. Mettre en cache
            this.connections.set(orgId, connection);

            // Gestion d'erreur de connexion après coup
            connection.on('error', (err) => {
                logger.error(`❌ Erreur sur la connexion Tenant ${orgId}:`, err);
                this.connections.delete(orgId);
                this.recordError(orgId);
            });

            this.updateMetrics(orgId, Date.now() - startTime);
            return connection;
        } catch (error) {
            this.recordError(orgId);
            logger.error(`❌ Échec de connexion au serveur MongoDB du tenant ${orgId}`, error);
            throw new Error(`Impossible de se connecter au serveur de données dédié: ${error instanceof Error ? error.message : 'Détails inconnus'}`);
        }
    }

    /**
     * Ferme proprement toutes les connexions (pour le shutdown du serveur)
     */
    async closeAll() {
        for (const [orgId, conn] of this.connections.entries()) {
            await conn.close();
        }
        this.connections.clear();
    }

    /**
     * Met à jour les métriques de connexion d'un tenant.
     */
    private updateMetrics(orgId: string, latency: number) {
        let metric = this.connectionMetrics.get(orgId) || { lastAccess: Date.now(), averageLatencyMs: 0, connectionErrors: 0 };
        metric.lastAccess = Date.now();
        // Moving average of latency
        metric.averageLatencyMs = metric.averageLatencyMs === 0 ? latency : (metric.averageLatencyMs * 0.9) + (latency * 0.1);
        this.connectionMetrics.set(orgId, metric);
        
        // Alerte si la latence devient trop élevée (Health Monitoring)
        if (metric.averageLatencyMs > 500) {
            logger.warn(`⚠️ [TenantAlert] Le serveur MongoDB dédié du tenant ${orgId} est anormalement lent (${Math.round(metric.averageLatencyMs)}ms de latence moyenne).`);
        }
    }

    private recordError(orgId: string) {
        let metric = this.connectionMetrics.get(orgId) || { lastAccess: Date.now(), averageLatencyMs: 0, connectionErrors: 0 };
        metric.connectionErrors += 1;
        this.connectionMetrics.set(orgId, metric);
        
        if (metric.connectionErrors >= 3) {
            logger.error(`🚨 [CRITICAL ALERT] Le serveur MongoDB du tenant ${orgId} est tombé ou injoignable après plusieurs tentatives.`);
        }
    }
}

export const tenantManager = new TenantManager();
