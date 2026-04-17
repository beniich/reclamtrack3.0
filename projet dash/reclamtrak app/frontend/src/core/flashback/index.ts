import { FlashbackResult } from '../../types/db';
import { pool } from '../db/pool';

/**
 * Reconstitue l'état d'une ligne à un instant T (démo conceptuelle).
 * Requiert une table [tableName]_history avec triggers.
 */
export async function queryAsOf<T>(
  tableName: string,
  rowId: string,
  timestamp: Date
): Promise<FlashbackResult<T> | null> {
  // Pattern standard SCD2 (Slowly Changing Dimensions) pour flashback query
  // Nécessite que le nom de la table soit sûr (non injectable) - à valider en prod !
  const query = `
    SELECT * FROM ${tableName}_history
    WHERE id = $1
      AND valid_from <= $2
      AND (valid_to > $2 OR valid_to IS NULL)
  `;
  try {
     const result = await pool.query(query, [rowId, timestamp]);
     if (result.rows.length === 0) return null;

     return {
       asOfStart: result.rows[0].valid_from,
       asOfEnd: result.rows[0].valid_to,
       data: result.rows[0] as T,
     };
  } catch (error: any) {
     throw new Error(`Flashback as of failed for ${tableName}: ${error.message}`);
  }
}
