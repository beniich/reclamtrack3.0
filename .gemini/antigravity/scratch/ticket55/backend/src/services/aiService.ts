import openai, { openaiConfig } from '../config/openai';

export interface ClassificationResult {
    category: string;
    subcategory: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    urgencyScore: number; // 0-100
    confidence: number;   // 0-100
    suggestedActions: string[];
    estimatedResolutionTime: number; // heures
    departmentsInvolved: string[];
}

export interface SentimentAnalysis {
    sentiment: 'positive' | 'neutral' | 'negative';
    intensity: number; // 0-10
    keywords: string[];
}

export class AIService {
    private readonly CATEGORIES = [
        'Eau',
        'Électricité',
        'Routes',
        'Assainissement',
        'Éclairage public',
        'Collecte déchets',
        'Espaces verts',
        'Bâtiments publics',
        'Télécommunications',
        'Autre'
    ];

    private readonly SUBCATEGORIES: Record<string, string[]> = {
        'Eau': ['Fuite', 'Coupure', 'Qualité de l\'eau', 'Compteur', 'Canalisation'],
        'Électricité': ['Panne', 'Coupure', 'Danger électrique', 'Compteur', 'Lampadaire'],
        'Routes': ['Nid-de-poule', 'Signalisation', 'Éclairage', 'Obstacle', 'Marquage'],
        'Assainissement': ['Égouts bouchés', 'Inondation', 'Odeur', 'Fuites'],
        'Éclairage public': ['Lampadaire cassé', 'Éclairage défectueux', 'Horloge'],
        'Collecte déchets': ['Conteneur plein', 'Retard collecte', 'Dépôt sauvage'],
        'Espaces verts': ['Arbre tombé', 'Tonte', 'Arrosage', 'Désherbage'],
        'Bâtiments publics': ['Toiture', 'Porte/Fenêtre', 'Plomberie', 'Chauffage'],
        'Télécommunications': ['Antenne', 'Câbles', 'Boîtier'],
        'Autre': ['Divers', 'Information', 'Signalement']
    };

    private readonly PRIORITY_RULES: Record<string, any> = {
        keywords: {
            urgent: ['urgence', 'danger', 'accident', 'blessé', 'inondation', 'incendie'],
            high: ['coupure', 'panne', 'bouché', 'cassé', 'tombe'],
            medium: ['défectueux', 'retard', 'plein', 'sale'],
            low: ['information', 'question', 'renseignement']
        }
    };

    async classifyComplaint(description: string, location?: string): Promise<ClassificationResult> {
        try {
            // Analyse de sentiment préalable
            const sentiment = await this.analyzeSentiment(description);

            // Classification principale avec OpenAI
            const classification = await this.performClassification(description, location);

            // Application des règles métier locales
            const finalClassification = this.applyBusinessRules(
                classification,
                description,
                sentiment
            );

            return finalClassification;
        } catch (error) {
            console.error('Erreur classification IA:', error);
            // Fallback sur classification basique
            return this.fallbackClassification(description);
        }
    }

    private async performClassification(description: string, location?: string): Promise<Omit<ClassificationResult, 'confidence'>> {
        const prompt = `
Vous êtes un expert en gestion municipale. Classifiez cette réclamation citoyenne selon les critères suivants:

DESCRIPTION: ${description}
${location ? `LOCATION: ${location}` : ''}

CATÉGORIES DISPONIBLES:
${this.CATEGORIES.map(cat => `- ${cat}`).join('\n')}

SOUS-CATÉGORIES PAR CATÉGORIE:
${Object.entries(this.SUBCATEGORIES)
                .map(([cat, subs]) => `${cat}: ${subs.join(', ')}`)
                .join('\n')}

Répondez UNIQUEMENT en JSON avec cette structure exacte:
{
  "category": "nom de la catégorie",
  "subcategory": "nom de la sous-catégorie",
  "priority": "low|medium|high|urgent",
  "urgencyScore": nombre_entre_0_et_100,
  "suggestedActions": ["action1", "action2"],
  "estimatedResolutionTime": nombre_heures,
  "departmentsInvolved": ["service1", "service2"]
}

Exemple de réponse:
{
  "category": "Électricité",
  "subcategory": "Panne",
  "priority": "high",
  "urgencyScore": 75,
  "suggestedActions": ["Envoyer technicien", "Couper alimentation si danger"],
  "estimatedResolutionTime": 4,
  "departmentsInvolved": ["Électricité", "Sécurité"]
}
`;

        const completion = await openai.chat.completions.create({
            model: openaiConfig.model,
            messages: [
                {
                    role: "system",
                    content: "Vous êtes un assistant IA spécialisé dans la classification des réclamations municipales."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: openaiConfig.temperature,
            max_tokens: 500,
            response_format: { type: "json_object" }
        });

        try {
            const result = JSON.parse(completion.choices[0].message.content || '{}');
            return {
                category: result.category || 'Autre',
                subcategory: result.subcategory || 'Divers',
                priority: result.priority || 'medium',
                urgencyScore: result.urgencyScore || 50,
                suggestedActions: result.suggestedActions || [],
                estimatedResolutionTime: result.estimatedResolutionTime || 24,
                departmentsInvolved: result.departmentsInvolved || ['Général']
            };
        } catch (error) {
            throw new Error('Impossible de parser la réponse de l\'IA');
        }
    }

    private async analyzeSentiment(text: string): Promise<SentimentAnalysis> {
        const prompt = `
Analysez le sentiment de ce texte de réclamation municipale:

TEXTE: ${text}

Répondez UNIQUEMENT en JSON avec cette structure exacte:
{
  "sentiment": "positive|neutral|negative",
  "intensity": nombre_entre_0_et_10,
  "keywords": ["mot1", "mot2"]
}

Exemple de réponse:
{
  "sentiment": "negative",
  "intensity": 8,
  "keywords": ["urgence", "dangereux", "attendre"]
}
`;

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "Vous êtes un analyste de sentiment spécialisé dans les communications citoyennes."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.1,
                max_tokens: 200,
                response_format: { type: "json_object" }
            });

            return JSON.parse(completion.choices[0].message.content || '{}');
        } catch (error) {
            return {
                sentiment: 'neutral',
                intensity: 5,
                keywords: []
            };
        }
    }

    private applyBusinessRules(
        classification: Omit<ClassificationResult, 'confidence'>,
        description: string,
        sentiment: SentimentAnalysis
    ): ClassificationResult {
        const lowerDescription = description.toLowerCase();
        let confidence = 90; // Confiance de base

        // Ajustement de la priorité basé sur les mots-clés
        const urgentKeywords = this.PRIORITY_RULES.keywords.urgent;
        const highKeywords = this.PRIORITY_RULES.keywords.high;

        if (urgentKeywords.some(keyword => lowerDescription.includes(keyword))) {
            classification.priority = 'urgent';
            classification.urgencyScore = Math.min(100, classification.urgencyScore + 20);
        } else if (highKeywords.some(keyword => lowerDescription.includes(keyword))) {
            if (classification.priority === 'low' || classification.priority === 'medium') {
                classification.priority = 'high';
                classification.urgencyScore = Math.min(100, classification.urgencyScore + 15);
            }
        }

        // Ajustement basé sur le sentiment
        if (sentiment.sentiment === 'negative' && sentiment.intensity > 7) {
            classification.urgencyScore = Math.min(100, classification.urgencyScore + 10);
            if (classification.priority === 'low' || classification.priority === 'medium') {
                classification.priority = 'high';
            }
        }

        // Calcul de la confiance finale
        confidence = Math.max(50, Math.min(100,
            confidence - (Math.abs(sentiment.intensity - 5) * 2)
        ));

        return {
            ...classification,
            confidence
        };
    }

    private fallbackClassification(description: string): ClassificationResult {
        const lowerDesc = description.toLowerCase();

        // Classification basique par mots-clés
        if (lowerDesc.includes('eau') || lowerDesc.includes('canalisation')) {
            return this.createFallbackResult('Eau', 'Fuite', 'medium', 60);
        } else if (lowerDesc.includes('électricité') || lowerDesc.includes('lampadaire')) {
            return this.createFallbackResult('Électricité', 'Panne', 'high', 70);
        } else if (lowerDesc.includes('route') || lowerDesc.includes('nid-de-poule')) {
            return this.createFallbackResult('Routes', 'Nid-de-poule', 'medium', 55);
        } else {
            return this.createFallbackResult('Autre', 'Divers', 'low', 30);
        }
    }

    private createFallbackResult(
        category: string,
        subcategory: string,
        priority: 'low' | 'medium' | 'high' | 'urgent',
        urgencyScore: number
    ): ClassificationResult {
        return {
            category,
            subcategory,
            priority,
            urgencyScore,
            confidence: 60,
            suggestedActions: [`Vérifier la ${subcategory.toLowerCase()}`],
            estimatedResolutionTime: priority === 'urgent' ? 2 :
                priority === 'high' ? 8 :
                    priority === 'medium' ? 24 : 48,
            departmentsInvolved: [category]
        };
    }

    // Génération de réponse standardisée pour le citoyen
    async generateCitizenResponse(classification: ClassificationResult): Promise<string> {
        const prompt = `
Générez une réponse professionnelle et rassurante à un citoyen pour cette réclamation classifiée:

CLASSIFICATION:
- Catégorie: ${classification.category}
- Sous-catég orie: ${classification.subcategory}
- Priorité: ${classification.priority}
- Temps estimé: ${classification.estimatedResolutionTime} heures

INSTRUCTIONS:
- Soyez courtois et professionnel
- Expliquez brièvement l'action entreprise
- Donnez une estimation réaliste
- Rassurez le citoyen
- Mentionnez le numéro de suivi si applicable

Réponse:
`;

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "Vous êtes un agent municipal courtois qui répond aux citoyens."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 300
            });

            return completion.choices[0].message.content || 'Votre réclamation a été enregistrée et sera traitée prochainement.';
        } catch (error) {
            return 'Nous accusons réception de votre réclamation et un technicien sera envoyé dès que possible.';
        }
    }

    // Analyse prédictive pour identifier les tendances
    async analyzeTrends(complaints: any[]): Promise<any> {
        const categoriesCount: Record<string, number> = {};
        const locationsCount: Record<string, number> = {};

        complaints.forEach(complaint => {
            categoriesCount[complaint.category] = (categoriesCount[complaint.category] || 0) + 1;
            if (complaint.location?.address) {
                const location = complaint.location.address.split(',')[0]; // Quartier
                locationsCount[location] = (locationsCount[location] || 0) + 1;
            }
        });

        const hotspots = Object.entries(locationsCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([location, count]) => ({ location, count }));

        const frequentCategories = Object.entries(categoriesCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([category, count]) => ({ category, count }));

        return {
            hotspots,
            frequentCategories,
            totalAnalyzed: complaints.length,
            recommendations: await this.generateRecommendations(hotspots, frequentCategories)
        };
    }

    private async generateRecommendations(hotspots: any[], categories: any[]): Promise<string[]> {
        const prompt = `
Basé sur ces tendances municipales:
- Zones problématiques: ${hotspots.map(h => h.location).join(', ')}
- Catégories fréquentes: ${categories.map(c => c.category).join(', ')}

Proposez 3 recommandations proactives pour le service municipal.
Répondez en JSON avec cette structure:
{
  "recommendations": ["reco1", "reco2", "reco3"]
}
`;

        try {
            const completion = await openai.chat.completions.create({
                model: openaiConfig.model,
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.5,
                max_tokens: 300,
                response_format: { type: "json_object" }
            });

            const result = JSON.parse(completion.choices[0].message.content || '{}');
            return result.recommendations || [];
        } catch (error) {
            return [
                "Renforcer les patrouilles dans les zones à risque",
                "Planifier une maintenance préventive",
                "Organiser une campagne d'information citoyenne"
            ];
        }
    }
}

export default new AIService();
