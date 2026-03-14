import { SessionContext } from '../../types/db';
import { executeWithContext } from '../db/session';

export async function createOrder(context: SessionContext, orderData: { title: string; amount: number }) {
  return await executeWithContext(context, async (client) => {
    // 1. Création de la commande
    const orderResult = await client.query(
      'INSERT INTO orders (title, amount, tenant_id) VALUES ($1, $2, $3) RETURNING *',
      [orderData.title, orderData.amount, context.tenantId]
    );
    const newOrder = orderResult.rows[0];

    // 2. Logique métier additionnelle (ex: décrémenter un stock ou autre)
    // Ici, le Trigger SQL fn_audit_trigger s'occupera automatiquement de l'audit_log
    // si le trigger est activé sur la table 'orders'.

    console.log(`Order created: ${newOrder.id} for user ${context.userId}`);

    return newOrder;
  });
}

export async function getRecentOrders(context: SessionContext) {
  return await executeWithContext(context, async (client) => {
    // Grâce au RLS (si activé), cette requête ne retournera que les commandes du tenant_id actuel
    const result = await client.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 10');
    return result.rows;
  });
}
