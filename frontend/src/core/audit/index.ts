import { AuditLog, SessionContext } from '../../types/db';
import { pool } from '../db/pool';

export async function getAuditLogs(
  tableName?: string,
  limit: number = 50,
  offset: number = 0
): Promise<AuditLog[]> {
  const query = tableName
    ? 'SELECT * FROM audit_log WHERE table_name = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3'
    : 'SELECT * FROM audit_log ORDER BY created_at DESC LIMIT $1 OFFSET $2';

  const params = tableName ? [tableName, limit, offset] : [limit, offset];

  const result = await pool.query(query, params);
  return result.rows;
}

export async function logManualEvent(
  context: SessionContext,
  action: string,
  tableName: string,
  rowId: string,
  oldData: any = null,
  newData: any = null
): Promise<void> {
  const query = `
    INSERT INTO audit_log (user_id, action, table_name, row_id, old_data, new_data)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  await pool.query(query, [context.userId, action, tableName, rowId, oldData, newData]);
}
