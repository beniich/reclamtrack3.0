import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
    return `${timestamp} [${level}] ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''
        }`;
});

export const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(timestamp(), logFormat),
    transports: [
        new winston.transports.Console({
            format: combine(colorize(), logFormat)
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
});
