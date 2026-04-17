import { db } from '@/lib/db/localDB';
import api from '@/lib/api';
import { imageService } from './imageService';

/**
 * Moteur de synchronisation Local-First pour REDAL Modern
 */
class SyncEngine {
    private isSyncing = false;
    private interval: NodeJS.Timeout | null = null;

    /**
     * Lance le moteur de synchro en arrière-plan
     */
    start() {
        if (this.interval) return;
        this.interval = setInterval(() => this.processOutbox(), 15000); // Toutes les 15s
        console.log('SyncEngine: Started');
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    /**
     * Traite les événements en attente dans l'Outbox
     */
    async processOutbox() {
        if (this.isSyncing || !navigator.onLine) return;
        this.isSyncing = true;

        try {
            const pendingEvents = await db.outbox.where('attempts').below(5).toArray();
            
            for (const event of pendingEvents) {
                try {
                    if (event.type === 'CREATE_COMPLAINT') {
                        const complaint = await db.complaints.get(event.localRef);
                        if (!complaint) {
                            await db.outbox.delete(event.id!);
                            continue;
                        }

                        // Préparer les données pour le serveur
                        // Ici, on pourrait uploader les images compressées d'abord
                        // Pour ce POC, on envoie les données de base
                        const response = await api.post('/complaints', event.payload) as any;
                        
                        if (response?._id) {
                            await db.complaints.update(event.localRef, {
                                serverId: response._id,
                                syncState: 'synced',
                                updatedAt: new Date()
                            });
                            await db.outbox.delete(event.id!);
                        }
                    }
                } catch (error) {
                    console.error(`SyncEngine: Failed event ${event.id}`, error);
                    await db.outbox.update(event.id!, { attempts: event.attempts + 1 });
                }
            }
        } finally {
            this.isSyncing = false;
        }
    }
}

export const syncEngine = new SyncEngine();
