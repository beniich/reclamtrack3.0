import { config } from 'dotenv';
config();

export const envValidator = () => {
    const required = [
        'PORT',
        'JWT_SECRET',
        'SMTP_HOST',
        'SMTP_PORT',
        'SMTP_USER',
        'SMTP_PASSWORD'
    ];

    if (process.env.ENABLE_DEMO !== 'true') {
        required.push('MONGODB_URI');
    }

    const missing = required.filter((k) => !(k in process.env));
    if (missing.length) {
        console.error(`❌ Variables d'environnement manquantes : ${missing.join(', ')}`);
        process.exit(1);
    }
};
