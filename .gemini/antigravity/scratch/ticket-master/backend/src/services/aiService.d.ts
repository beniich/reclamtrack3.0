/**
 * Service d'IA pour ReclamTrack.
 * Gère la classification automatique et les suggestions d'actions.
 */
declare class AIService {
    /**
     * Analyse une réclamation pour suggérer une catégorie et une priorité.
     */
    analyzeComplaint(title: string, description: string): Promise<{
        priority: "low" | "medium" | "high" | "urgent";
        category: string;
        confidence: number;
        reasoning: string;
    }>;
}
declare const _default: AIService;
export default _default;
//# sourceMappingURL=aiService.d.ts.map