import { NextResponse } from 'next/server';
import { queryAsOf } from '../../../core/flashback';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const table = searchParams.get('table');
  const id = searchParams.get('id');
  const at = searchParams.get('at');

  if (!table || !id || !at) {
    return NextResponse.json({ error: 'Missing table, id or at param' }, { status: 400 });
  }

  try {
    const timestamp = new Date(at);
    const data = await queryAsOf(table, id, timestamp);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
