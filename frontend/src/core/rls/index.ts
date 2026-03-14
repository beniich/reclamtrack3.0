import { pool } from '../db/pool';

/**
 * Enable Row Level Security (RLS) on a table and create a tenant isolation policy.
 * @param tableName Name of the table
 * @param tenantColumn Column used for tenant isolation (default: 'tenant_id')
 */
export async function enableTenantIsolation(tableName: string, tenantColumn: string = 'tenant_id'): Promise<void> {
  const query = `
    ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;

    DO $$
    BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies
            WHERE tablename = '${tableName}' AND policyname = 'tenant_isolation_policy'
        ) THEN
            CREATE POLICY tenant_isolation_policy ON ${tableName}
            USING (${tenantColumn}::text = current_setting('app.tenant_id', true));
        END IF;
    END
    $$;
  `;

  await pool.query(query);
}
