import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

// On Vercel build phase, DATABASE_URL might not be defined. We export a mock to prevent the build from failing.
// In runtime, it will properly throw if still undefined upon querying, or connect if present.
export const pool = new Pool(
  connectionString
    ? {
        connectionString,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      }
    : {}
);

if (!connectionString) {
  console.warn('⚠️ DATABASE_URL is not defined in environment variables. Database features will not work.');
}

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
