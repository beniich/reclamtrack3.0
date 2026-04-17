import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.DB_ENCRYPTION_KEY || 'reclamtrack-secret-key-32chars-min-!!';

/**
 * Service de chiffrement AES-256 pour les données sensibles (URIs de base de données)
 */
export const cryptoService = {
    /**
     * Chiffre une chaîne de caractères
     */
    encrypt: (text: string): string => {
        return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
    },

    /**
     * Déchiffre une chaîne de caractères
     */
    decrypt: (cipherText: string): string => {
        const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
};
