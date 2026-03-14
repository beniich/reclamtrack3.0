import { NextResponse } from 'next/server';
import { runJob } from '../../../../core/scheduler';

export async function POST(request: Request) {
  // Vérification du Header Authorization (Vercel Cron Secret)
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await runJob('daily-cleanup', async () => {
      // Logique métier du job
      console.log('Running daily cleanup...');
      return { cleanedRows: 42 };
    });

    return NextResponse.json({ success: true, jobResult: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
