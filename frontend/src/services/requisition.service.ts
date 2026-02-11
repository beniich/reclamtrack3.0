
import { db } from '@/lib/db';
import { sendNotification } from '@/lib/notifications';
import { RequisitionAction, RequisitionStatus, canTransition, getNextStatus, requiresComment } from '@/lib/workflows/requisition-workflow';

interface TransitionPayload {
    requisitionId: string;
    action: RequisitionAction;
    userId: string;
    userRole: string;
    comment?: string;
}

export class RequisitionWorkflowService {
    async transition(payload: TransitionPayload): Promise<void> {
        const { requisitionId, action, userId, userRole, comment } = payload;

        // Récupérer la réquisition
        const requisition = await db.requisition.findUnique({
            where: { id: requisitionId },
            include: {
                requester: true,
                items: true,
            },
        });

        if (!requisition) {
            throw new Error('Réquisition introuvable');
        }

        const currentStatus = requisition.status as RequisitionStatus;

        // Vérifier si la transition est autorisée
        if (!canTransition(currentStatus, action, userRole)) {
            throw new Error('Transition non autorisée');
        }

        // Vérifier si un commentaire est requis
        if (requiresComment(currentStatus, action) && !comment) {
            throw new Error('Un commentaire est requis pour cette action');
        }

        // Obtenir le nouveau statut
        const nextStatus = getNextStatus(currentStatus, action);
        if (!nextStatus) {
            throw new Error('Statut suivant invalide');
        }

        // Effectuer la transition dans une transaction
        await db.$transaction(async (tx) => {
            // Mettre à jour le statut
            await tx.requisition.update({
                where: { id: requisitionId },
                data: {
                    status: nextStatus,
                    updatedAt: new Date(),
                },
            });

            // Enregistrer l'historique
            await tx.requisitionHistory.create({
                data: {
                    requisitionId,
                    fromStatus: currentStatus,
                    toStatus: nextStatus,
                    action,
                    userId,
                    comment,
                    timestamp: new Date(),
                },
            });

            // Envoyer les notifications appropriées
            await this.sendTransitionNotifications(requisition, nextStatus, action, comment);
        });
    }

    private async sendTransitionNotifications(
        requisition: any,
        newStatus: RequisitionStatus,
        action: RequisitionAction,
        comment?: string
    ): Promise<void> {
        switch (newStatus) {
            case RequisitionStatus.PENDING:
                // Notifier les managers
                await sendNotification({
                    recipients: ['managers', 'warehouse_managers'],
                    title: 'Nouvelle réquisition à examiner',
                    message: `Réquisition #${requisition.id} soumise par ${requisition.requester.name}`,
                    type: 'info',
                    link: `/inventory/requisition/${requisition.id}`,
                });
                break;

            case RequisitionStatus.APPROVED:
                // Notifier le demandeur
                await sendNotification({
                    recipients: [requisition.requesterId],
                    title: 'Réquisition approuvée',
                    message: `Votre réquisition #${requisition.id} a été approuvée`,
                    type: 'success',
                    link: `/inventory/requisition/${requisition.id}`,
                });
                break;

            case RequisitionStatus.REJECTED:
                // Notifier le demandeur avec le commentaire
                await sendNotification({
                    recipients: [requisition.requesterId],
                    title: 'Réquisition rejetée',
                    message: `Réquisition #${requisition.id} rejetée. Raison: ${comment}`,
                    type: 'error',
                    link: `/inventory/requisition/${requisition.id}`,
                });
                break;

            case RequisitionStatus.READY:
                // Notifier le demandeur et l'équipe
                await sendNotification({
                    recipients: [requisition.requesterId],
                    title: 'Réquisition prête',
                    message: `Votre réquisition #${requisition.id} est prête à être récupérée`,
                    type: 'success',
                    link: `/inventory/requisition/${requisition.id}`,
                });
                break;

            case RequisitionStatus.DELIVERED:
                // Notifier tous les concernés
                await sendNotification({
                    recipients: [requisition.requesterId, 'warehouse_managers'],
                    title: 'Réquisition livrée',
                    message: `Réquisition #${requisition.id} livrée avec succès`,
                    type: 'success',
                    link: `/inventory/requisition/${requisition.id}`,
                });
                break;
        }
    }

    // Obtenir l'historique complet d'une réquisition
    async getHistory(requisitionId: string) {
        return db.requisitionHistory.findMany({
            where: { requisitionId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
            orderBy: { timestamp: 'asc' },
        });
    }
}
