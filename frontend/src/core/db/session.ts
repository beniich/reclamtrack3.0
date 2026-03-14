import { PoolClient } from 'pg';
import { SessionContext } from '../../types/db';
import { pool } from './pool';

/**
 * Execute un callback dans un contexte transactionnel sécurisé.
 * Applique le paramètre "app.current_user_id" et "app.tenant_id" pour
 * le Row-Level Security et les Triggers d'Audit.
 *
 * @param context SessionContext (userId, tenantId, etc.)
 * @param callback Fonction asynchrone prenant un client pg
 * @returns Le résultat de la requête
 */
export async function executeWithContext<T>(
  context: SessionContext,
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();

  try {
    // 1. Début de la transaction
    await client.query('BEGIN');

    // 2. Définition du contexte de session (utile pour RLS et Audit via Trigger)
    // On utilise "SET LOCAL" pour s'assurer que le paramètre ne fuit pas sur d'autres transactions
    // via le connection polling.
    if (context.userId) {
      await client.query('SET LOCAL app.current_user_id = $1;', [context.userId]);
    }

    if (context.tenantId) {
      await client.query('SET LOCAL app.tenant_id = $1;', [context.tenantId]);
    }

    // 3. Exécution métier
    const result = await callback(client);

    // 4. Commit si tout s'est bien passé
    await client.query('COMMIT');
    return result;

  } catch (error) {
    // 5. Rollback en cas d'erreur
    await client.query('ROLLBACK');
    throw error;
  } finally {
    // 6. Relâchement du client dans le pool
    client.release();
  }
}
