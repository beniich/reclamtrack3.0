import { NextResponse } from 'next/server';
import { createOrder, getRecentOrders } from '../../../server/actions/orders';
import { SessionContext } from '../../../types/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenantId') || 'unknown-tenant';
  const userId = searchParams.get('userId') || 'system';

  const context: SessionContext = { userId, tenantId, role: 'user' };

  try {
    const orders = await getRecentOrders(context);
    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenantId') || 'unknown-tenant';
  const userId = searchParams.get('userId') || 'system';

  const context: SessionContext = { userId, tenantId, role: 'user' };

  try {
    const order = await createOrder(context, body);
    return NextResponse.json({ success: true, data: order });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
