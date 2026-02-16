import express, { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { protect } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

const router = Router();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2026-01-28.clover', // Use latest API version
});

// Mock Plans (should be in DB or Stripe Products)
const PLANS = {
    'starter': 'price_starter_id',
    'pro': 'price_pro_id',
    'enterprise': 'price_enterprise_id'
};

// POST /api/billing/create-checkout-session
router.post('/create-checkout-session', protect, async (req: Request, res: Response) => {
    try {
        const { planId, interval } = req.body;
        const user = (req as any).user;

        // In a real app, you would look up the price ID based on planId and interval
        // For now, we'll just mock it or use a test ID
        const priceId = 'price_1234567890'; // Replace with dynamic lookup

        logger.info(`Creating checkout session for user ${user.id} and plan ${planId}`);

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            customer_email: user.email,
            success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/pricing`,
            metadata: {
                userId: user.id,
                planId: planId
            }
        });

        res.json({ url: session.url, id: session.id });

    } catch (error: any) {
        logger.error('Error creating checkout session:', error);
        res.status(500).json({ message: 'Failed to create checkout session', error: error.message });
    }
});

// GET /api/billing/plans
router.get('/plans', (req: Request, res: Response) => {
    res.json({
        success: true,
        data: [
            {
                id: 'starter',
                name: 'Starter',
                price: 29,
                features: ['Up to 5 users', 'Basic Reporting', 'Email Support']
            },
            {
                id: 'pro',
                name: 'Professional',
                price: 99,
                popular: true,
                features: ['Up to 20 users', 'Advanced Analytics', 'Priority Support', 'API Access']
            },
            {
                id: 'enterprise',
                name: 'Enterprise',
                price: 299,
                features: ['Unlimited users', 'Custom Integrations', 'Dedicated Account Manager', 'SLA']
            }
        ]
    });
});

// POST /api/billing/webhook
// Note: This endpoint should NOT use 'protect' middleware as it's called by Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        if (endpointSecret && sig) {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } else {
            event = req.body; // Fallback for testing without signature verification (NOT SECURE FOR PROD)
        }
    } catch (err: any) {
        logger.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            logger.info(`Payment successful for session: ${session.id}`);
            // TODO: Provision subscription, update user role/org status
            break;
        case 'invoice.payment_succeeded':
            // Continue subscription
            break;
        case 'invoice.payment_failed':
            // Handle failed payment
            break;
        default:
        // console.log(`Unhandled event type ${event.type}`);
    }

    res.send({ received: true });
});

export default router;
