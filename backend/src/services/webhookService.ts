/**
 * @file webhookService.ts
 * @description Service for triggering and managing outgoing webhooks.
 * @module backend/services
 */

import axios from 'axios';
import crypto from 'crypto';
import { logger } from '../utils/logger.js';

export interface WebhookPayload {
  event: string;
  timestamp: string;
  data: unknown;
}

export interface WebhookConfig {
  url: string;
  secret?: string;
  events: string[];
}

// In-memory store for demonstration purposes. In a real app, store in DB.
const webhooks: Record<string, WebhookConfig> = {};

export const registerWebhook = (id: string, config: WebhookConfig) => {
  webhooks[id] = config;
  logger.info(`Webhook registered: ${id} -> ${config.url}`);
};

export const unregisterWebhook = (id: string) => {
  delete webhooks[id];
  logger.info(`Webhook unregistered: ${id}`);
};

export const getWebhooks = () => {
  return Object.entries(webhooks).map(([id, config]) => ({ id, ...config }));
};

const signPayload = (payload: string, secret: string) => {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
};

export const triggerWebhooks = async (event: string, data: unknown) => {
  const payload: WebhookPayload = {
    event,
    timestamp: new Date().toISOString(),
    data,
  };
  
  const payloadString = JSON.stringify(payload);

  const triggerPromises = Object.entries(webhooks)
    .filter(([_, config]) => config.events.includes(event) || config.events.includes('*'))
    .map(async ([id, config]) => {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'X-ReclamTrack-Event': event,
        };

        if (config.secret) {
          headers['X-ReclamTrack-Signature'] = signPayload(payloadString, config.secret);
        }

        await axios.post(config.url, payload, { headers, timeout: 5000 });
        logger.info(`Webhook triggered successfully: ${id} for event ${event}`);
      } catch (error) {
        logger.error(`Webhook failed: ${id} for event ${event}`, { error: (error as Error).message });
      }
    });

  await Promise.allSettled(triggerPromises);
};
