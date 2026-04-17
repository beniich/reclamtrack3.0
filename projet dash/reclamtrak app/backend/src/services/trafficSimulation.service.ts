import { Team } from '../models/Team.js';
import { Complaint } from '../models/Complaint.js';
import { logger } from '../utils/logger.js';

export class TrafficSimulationService {
    private static interval: NodeJS.Timeout | null = null;

    /**
     * Démarre la simulation globale de la flotte
     */
    static startSimulation() {
        if (this.interval) return;

        logger.info('Simulation de trafic démarrée...');
        this.interval = setInterval(async () => {
            await this.updatePositions();
        }, 5000); // Mise à jour toutes les 5 secondes
    }

    static stopSimulation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            logger.info('Simulation de trafic arrêtée.');
        }
    }

    /**
     * Logique de mouvement vers les tickets assignés
     */
    private static async updatePositions() {
        try {
            // 1. Trouver les équipes en intervention
            const activeTeams = await Team.find({ status: 'intervention' });

            for (const team of activeTeams) {
                // 2. Trouver le ticket actif pour cette équipe
                const complaint = await Complaint.findOne({ 
                    assignedTeamId: team._id, 
                    status: 'en cours' 
                });

                if (complaint && complaint.location && team.location) {
                    const destLat = complaint.location.latitude;
                    const destLng = complaint.location.longitude;

                    // 3. Calcul de simulation de mouvement (0.001 deg approx 100m)
                    const step = 0.0005; // Vitesse de simulation
                    
                    let newLat = team.location.lat;
                    let newLng = team.location.lng;

                    // Mouvement vers la cible
                    if (Math.abs(destLat - newLat) > step) {
                        newLat += destLat > newLat ? step : -step;
                    }
                    if (Math.abs(destLng - newLng) > step) {
                        newLng += destLng > newLng ? step : -step;
                    }

                    // 4. Update
                    await Team.findByIdAndUpdate(team._id, {
                        'location.lat': newLat,
                        'location.lng': newLng
                    });

                    // Si arrivé à destination (proche)
                    const distance = Math.sqrt(Math.pow(destLat - newLat, 2) + Math.pow(destLng - newLng, 2));
                    if (distance < 0.001) {
                         logger.info(`Équipe ${team.name} arrivée sur les lieux du ticket ${complaint.number}`);
                    }
                }
            }
        } catch (err) {
            logger.error('Erreur simulation trafic:', err);
        }
    }
}
