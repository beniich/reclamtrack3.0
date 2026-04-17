import imageCompression from 'browser-image-compression';
import { db } from './db/localDB';

/**
 * Service pour la gestion des images en mode Local-First
 */
export const imageService = {
    /**
     * Compresse une image pour le serveur (copie petite)
     */
    compressForServer: async (file: File): Promise<File> => {
        const options = {
            maxSizeMB: 0.2, // ~200KB max
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };
        try {
            return await imageCompression(file, options);
        } catch (error) {
            console.error('Compression error:', error);
            return file;
        }
    },

    /**
     * Convertit un File en Base64 pour le stockage local (Vault)
     */
    toBase64: (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
};
