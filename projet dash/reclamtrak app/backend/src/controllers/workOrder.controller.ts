import { Request, Response } from 'express';
import WorkOrder from '../models/WorkOrder.js';
import { Complaint } from '../models/Complaint.js';

export const createWorkOrder = async (req: Request, res: Response) => {
  try {
    const workOrder = new WorkOrder(req.body);
    await workOrder.save();
    res.status(201).json({ success: true, data: workOrder });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getWorkOrders = async (req: Request, res: Response) => {
  try {
    const workOrders = await WorkOrder.find()
      .populate('assetId', 'name code category')
      .populate('complaintId', 'number title')
      .populate('assignedTeamId', 'name')
      .populate('technicianIds', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: workOrders });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getWorkOrderById = async (req: Request, res: Response) => {
  try {
    const workOrder = await WorkOrder.findById(req.params.id)
      .populate('assetId', 'name code category location status')
      .populate('complaintId', 'number title description')
      .populate('assignedTeamId', 'name specialization')
      .populate('technicianIds', 'firstName lastName email');
      
    if (!workOrder) return res.status(404).json({ success: false, message: 'Ordre de Travail non trouvé' });
    res.status(200).json({ success: true, data: workOrder });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const updateWorkOrder = async (req: Request, res: Response) => {
  try {
    const workOrder = await WorkOrder.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!workOrder) return res.status(404).json({ success: false, message: 'Ordre de Travail non trouvé' });
    res.status(200).json({ success: true, data: workOrder });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const deleteWorkOrder = async (req: Request, res: Response) => {
  try {
    const workOrder = await WorkOrder.findByIdAndDelete(req.params.id);
    if (!workOrder) return res.status(404).json({ success: false, message: 'Ordre de Travail non trouvé' });
    res.status(200).json({ success: true, message: 'Ordre de Travail supprimé' });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const convertComplaintToWorkOrder = async (req: Request, res: Response) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findById(complaintId);
    
    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Réclamation introuvable' });
    }

    // Check if a WO already exists for this complaint
    const existingWO = await WorkOrder.findOne({ complaintId });
    if (existingWO) {
      return res.status(400).json({ success: false, message: 'Un Ordre de Travail existe déjà pour ce ticket', data: existingWO });
    }

    const workOrder = new WorkOrder({
      number: `OT-${complaint.number || Date.now()}`,
      title: `Rép. : ${complaint.title}`,
      description: complaint.description,
      type: 'corrective',
      priority: complaint.priority === 'urgent' ? 'emergency' : 'high',
      status: 'pending',
      complaintId: complaint._id,
      assetId: complaint.assetId, // Link the asset if it was selected in the ticket
      organizationId: (complaint as any).organizationId
    });

    await workOrder.save();

    // Update complaint status
    complaint.status = 'en cours';
    complaint.timeline.push({
      eventType: 'status_changed',
      message: `Ticket converti en Ordre de Travail (${workOrder.number})`,
      createdAt: new Date()
    } as any);
    await complaint.save();

    res.status(201).json({ success: true, data: workOrder });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};
