import dotenv from 'dotenv';
import path from 'path';
import Stripe from 'stripe';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

async function testStripe() {
  console.log('--- Testing Stripe Connectivity ---');
  console.log('Key:', STRIPE_SECRET_KEY ? `${STRIPE_SECRET_KEY.substring(0, 7)}...` : 'MISSING');

  if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY.includes('placeholder')) {
    console.error('❌ Error: The Stripe Secret Key is missing or is a placeholder.');
    process.exit(1);
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia' as any,
  });

  try {
    const customers = await stripe.customers.list({ limit: 1 });
    console.log('✅ Connection successful! Stripe is responsive.');
    console.log(
      'Customer count (at least 1 exists?):',
      customers.data.length > 0 ? 'Yes' : 'None yet, but key is valid.'
    );
  } catch (error: any) {
    console.error('❌ Stripe Connection Failed:');
    console.error('Message:', error.message);
    console.error('Type:', error.type);
  }
}

testStripe();
