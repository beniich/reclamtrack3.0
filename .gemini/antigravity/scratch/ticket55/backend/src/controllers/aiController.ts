import { Request, Response } from 'express';
import aiService from '../services/aiService';

export class AIController {
    // Classification automatique d'une réclamation
    static async classifyComplaint(req: Request, res: Response) {
        try {
            const { description, location } = req.body;

            if (!description) {
                return res.status(400).json({
                    error: 'La description est requise'
                });
            }

            const classification = await aiService.classifyComplaint(description, location);

            res.json({
                success: true,
                classification,
                message: 'Réclamation classifiée avec succès'
            });
        } catch (error: any) {
            console.error('Erreur classification:', error);
            res.status(500).json({
                error: 'Erreur lors de la classification',
                details: error.message
            });
        }
    }

    // Génération de réponse citoyen
    static async generateResponse(req: Request, res: Response) {
        try {
            const { classification } = req.body;

            if (!classification) {
                return res.status(400).json({
                    error: 'La classification est requise'
                });
            }

            const response = await aiService.generateCitizenResponse(classification);

            res.json({
                success: true,
                response,
                message: 'Réponse générée avec succès'
            });
        } catch (error: any) {
            res.status(500).json({
                error: 'Erreur lors de la génération de réponse',
                details: error.message
            });
        }
    }

    // Analyse des tendances
    static async analyzeTrends(req: Request, res: Response) {
        try {
            const { complaints } = req.body;

            if (!complaints || !Array.isArray(complaints)) {
                return res.status(400).json({
                    error: 'Les réclamations sont requises'
                });
            }

            const trends = await aiService.analyzeTrends(complaints);

            res.json({
                success: true,
                trends,
                message: 'Tendances analysées avec succès'
            });
        } catch (error: any) {
            res.status(500).json({
                error: 'Erreur lors de l\'analyse des tendances',
                details: error.message
            });
        }
    }

    // Test de connexion à l'IA
    static async healthCheck(req: Request, res: Response) {
        try {
            const testClassification = await aiService.classifyComplaint(
                "Il y a une fuite d'eau importante dans la rue principale, ça inonde tout !",
                "Quartier des Palmiers"
            );

            res.json({
                success: true,
                message: 'Service IA opérationnel',
                testResult: testClassification
            });
        } catch (error: any) {
            res.status(500).json({
                error: 'Service IA indisponible',
                details: error.message
            });
        }
    }
}
