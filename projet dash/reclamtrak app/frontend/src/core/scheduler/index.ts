import { pool } from '../db/pool';

export async function acquireLock(jobName: string): Promise<string | null> {
  const query = `
    UPDATE scheduled_jobs
    SET status = 'running', last_run = NOW()
    WHERE name = $1 AND (status = 'idle' OR status = 'failed' OR status = 'success')
    RETURNING id
  `;
  const result = await pool.query(query, [jobName]);
  return result.rows.length > 0 ? result.rows[0].id : null;
}

export async function releaseLock(jobName: string, status: 'idle' | 'failed' | 'success', payload: any = null): Promise<void> {
  const query = `
    UPDATE scheduled_jobs
    SET status = $2, payload = $3
    WHERE name = $1
  `;
  await pool.query(query, [jobName, status, payload]);
}

export async function runJob(jobName: string, handler: () => Promise<any>): Promise<any> {
  const lockId = await acquireLock(jobName);
  if (!lockId) {
    console.log(`Job ${jobName} is already running or locked.`);
    return { status: 'locked' };
  }

  try {
    const result = await handler();
    await releaseLock(jobName, 'success', result);
    return { status: 'success', result };
  } catch (error: any) {
    await releaseLock(jobName, 'failed', { error: error.message });
    throw error;
  }
}
