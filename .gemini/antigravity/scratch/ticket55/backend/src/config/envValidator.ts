import { config } from 'dotenv';
config();

export const envValidator = () => {
    const required = [
        'PORT',
        'JWT_SECRET'
    ];
    const optional = [
        'MONGODB_URI',
        'SMTP_HOST',
        'SMTP_PORT',
        'SMTP_USER',
        'SMTP_PASSWORD'
    ];
    const missing = required.filter((k) => !(k in process.env));
    if (missing.length) {
        console.error(`❌ Variables d'environnement manquantes : ${missing.join(', ')}`);
        process.exit(1);
    }

    const missingOptional = optional.filter((k) => !(k in process.env));
    if (missingOptional.length) {
        console.warn(`⚠️  Variables optionnelles manquantes : ${missingOptional.join(', ')}`);
    }
};
