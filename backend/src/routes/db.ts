// routes/db.ts – Routes pour l'administration de base de données (Enterprise DB Management)
import express, { Request, Response } from 'express';
import { generateMetrics } from '../data/db-generator.js';
import { clusters, backups } from '../data/db-fixtures.js';

const router = express.Router();

/**
 * GET /api/db/metrics
 * Retourne les indicateurs agrégés de performance de la base de données
 */
router.get('/metrics', (req: Request, res: Response) => {
    const metrics = generateMetrics();
    res.json(metrics);
});

/**
 * GET /api/db/replicas
 * Retourne la liste des réplicas de base de données
 */
router.get('/replicas', (req: Request, res: Response) => {
    const replicas = clusters.filter((c) => c.role === "replica");
    res.json(replicas);
});

/**
 * GET /api/db/backups
 * Retourne l'historique des sauvegardes
 */
router.get('/backups', (req: Request, res: Response) => {
    res.json(backups);
});

/**
 * GET /api/db/clusters
 * Retourne la liste de tous les clusters (master + replicas)
 */
router.get('/clusters', (req: Request, res: Response) => {
    res.json(clusters);
});

export default router;
