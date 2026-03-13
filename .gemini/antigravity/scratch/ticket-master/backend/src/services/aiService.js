/**
 * Service d'IA pour ReclamTrack.
 * Gère la classification automatique et les suggestions d'actions.
 */
class AIService {
    /**
     * Analyse une réclamation pour suggérer une catégorie et une priorité.
     */
    async analyzeComplaint(title, description) {
        const text = `${title} ${description}`.toLowerCase();
        // Simulation d'une analyse IA (En production, ceci appellerait OpenAI/Claude)
        let suggestedPriority = 'medium';
        let suggestedCategory = 'général';
        if (text.includes('urgent') || text.includes('danger') || text.includes('fuite') || text.includes('électrique')) {
            suggestedPriority = 'urgent';
        }
        else if (text.includes('panne') || text.includes('arrêt') || text.includes('bloqué')) {
            suggestedPriority = 'high';
        }
        else if (text.includes('entretien') || text.includes('nettoyage')) {
            suggestedPriority = 'low';
        }
        if (text.includes('eau') || text.includes('fuite') || text.includes('plomberie')) {
            suggestedCategory = 'Plomberie';
        }
        else if (text.includes('électricité') || text.includes('lumière') || text.includes('courant')) {
            suggestedCategory = 'Électricité';
        }
        else if (text.includes('ascenseur') || text.includes('étage')) {
            suggestedCategory = 'Ascenseur';
        }
        else if (text.includes('climatisation') || text.includes('chaud') || text.includes('froid')) {
            suggestedCategory = 'HVAC';
        }
        return {
            priority: suggestedPriority,
            category: suggestedCategory,
            confidence: 0.85,
            reasoning: "Analyse sémantique basée sur les mots-clés détectés dans le titre et la description."
        };
    }
}
export default new AIService();
//# sourceMappingURL=aiService.js.map