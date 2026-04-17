exports.up = (pgm) => {
  // 1. Table d'audit unifié
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id VARCHAR(255),
      action VARCHAR(50) NOT NULL,
      table_name VARCHAR(100) NOT NULL,
      row_id VARCHAR(255) NOT NULL,
      old_data JSONB,
      new_data JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  // 2. Fonction Trigger générique pour l'audit
  pgm.sql(`
    CREATE OR REPLACE FUNCTION fn_audit_trigger()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO audit_log(user_id, action, table_name, row_id, old_data, new_data)
      VALUES (
        current_setting('app.current_user_id', true),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id::text, OLD.id::text, 'unknown'),
        row_to_json(OLD),
        row_to_json(NEW)
      );
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // 3. Table des tâches planifiées (Scheduler)
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS scheduled_jobs (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      cron_expr VARCHAR(50),
      last_run TIMESTAMP WITH TIME ZONE,
      status VARCHAR(20) DEFAULT 'idle', -- idle, running, failed, success
      payload JSONB
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS scheduled_jobs;`);
  pgm.sql(`DROP FUNCTION IF EXISTS fn_audit_trigger CASCADE;`);
  pgm.sql(`DROP TABLE IF EXISTS audit_log;`);
};
