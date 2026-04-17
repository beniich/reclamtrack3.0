import { Connection, Model } from 'mongoose';

/**
 * Registry pour stocker les modèles déjà initialisés par connexion
 * Clé: "connId_modelName"
 */
const modelCache = new Map<string, Model<any>>();

/**
 * Fonction utilitaire pour obtenir ou créer un modèle sur une connexion spécifique
 * @param conn La connexion Mongoose (Tenant ou Default)
 * @param name Le nom du modèle
 * @param schema Le schéma Mongoose
 */
export const getModel = <T>(conn: Connection, name: string, schema: any): Model<T> => {
    // Créer un identifiant unique pour cette paire (connexion, modèle)
    // On utilise l'ID de l'organisation si c'est une connexion de tenant
    const connId = (conn as any).id || 'default';
    const cacheKey = `${connId}_${name}`;

    if (modelCache.has(cacheKey)) {
        return modelCache.get(cacheKey) as Model<T>;
    }

    const model = conn.model<T>(name, schema);
    modelCache.set(cacheKey, model);
    return model;
};
