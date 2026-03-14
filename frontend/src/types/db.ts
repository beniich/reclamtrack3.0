export interface SessionContext {
  userId: string;
  tenantId?: string;
  role?: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: 'INSERT' | 'UPDATE' | 'DELETE';
  table_name: string;
  row_id: string;
  old_data: Record<string, any> | null;
  new_data: Record<string, any> | null;
  created_at: Date;
}

export interface FlashbackResult<T> {
  asOfStart: Date;
  asOfEnd: Date | null;
  data: T;
}

export interface JobRecord {
  id: string;
  name: string;
  cron_expr: string | null;
  last_run: Date | null;
  status: 'idle' | 'running' | 'failed' | 'success';
  payload: Record<string, any> | null;
}
