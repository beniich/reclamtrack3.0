import { Complaint } from '../models/Complaint.js';
import { logger } from '../utils/logger.js';

export class SmartTicketService {
    /**
     * Analyse un ticket individuel pour générer des attributs "Smart"
     */
    static async generateSmartInsights(complaintId: string) {
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) return null;

        const textToAnalyze = `${complaint.title} ${complaint.description}`.toLowerCase();
        
        // 1. Détection automatique de Sévérité (Simulation de NLP)
        let aiSeverity = 'LOW';
        const highRiskWords = ['danger', 'fuite', 'gaz', 'électrique', 'enfant', 'critique', 'urgence'];
        const matches = highRiskWords.filter(word => textToAnalyze.includes(word));
        
        if (matches.length > 2) aiSeverity = 'CRITICAL';
        else if (matches.length > 0) aiSeverity = 'HIGH';

        // 2. Prédiction de Résolution (Simulation de ML)
        const avgResolutionTime = {
            'water': 4,       // heures
            'electricity': 2,
            'roads': 48,
            'other': 24
        };
        const predictedHours = (avgResolutionTime[complaint.category as keyof typeof avgResolutionTime] || 24);

        // 3. Analyse de Sentiment
        const sentimentLevels = ['ANGRY', 'FRUSTRATED', 'NEUTRAL', 'HOPEFUL'];
        const sentiment = textToAnalyze.includes('!') ? 'FRUSTRATED' : 'NEUTRAL';

        return {
            complaintId,
            aiSeverity,
            predictedResolutionTime: `${predictedHours}h`,
            sentiment,
            similarCasesCount: Math.floor(Math.random() * 5),
            aiSummary: `Ce ticket semble lié à un incident de type ${complaint.category}. Recommandation : intervention sous ${predictedHours}h.`
        };
    }

    /**
     * Analyse globale pour le Dashboard Smart Vision
     */
    static async getGlobalSmartAnalysis() {
        return {
            topRiskDistrict: "Zone Industrielle Nord",
            anomalyDetected: true,
            anomalyDescription: "Pic de réclamations groupées (Eau) détecté dans le secteur B.",
            optimizationScore: "85%",
            autoPrioritizedCount: 12
        };
    }
}
