# 🚀 PLAN D'ACTION SEMAINE 1 - ReclamTrack

> **Période**: 10-16 Février 2026  
> **Objectif**: Connexion Backend ↔ Frontend Stable + PWA Basique  
> **Statut**: 🟢 EN COURS

---

## 📋 Vue d'Ensemble

Cette semaine est **critique** pour transformer ReclamTrack d'un prototype à une application fonctionnelle connectée.

### 🎯 Livrables de la Semaine
- ✅ API Réclamations opérationnelle avec pagination
- ✅ Authentification end-to-end avec JWT
- ✅ Upload photos fonctionnel
- ✅ PWA basique installable
- ✅ Notifications Socket.IO temps réel

---

## 📅 PLANNING DÉTAILLÉ

### **JOUR 1-2 (Lundi-Mardi)** : API Réclamations + Hooks Frontend

#### Backend - Endpoints Réclamations

**Fichier**: `backend/src/controllers/complaintController.ts`

```typescript
import { Request, Response } from 'express';
import { Complaint } from '../models/Complaint';
import { validationResult } from 'express-validator';

/**
 * GET /api/complaints
 * Liste des réclamations avec pagination et filtres
 */
export const getComplaints = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, status, priority, category, search } = req.query;
    
    // Construction de la requête MongoDB
    const query: any = {};
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;
    
    // Recherche textuelle
    if (search) {
      query.$or = [
        { description: { $regex: search, $options: 'i' } },
        { ticketId: { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } }
      ];
    }

    const complaints = await Complaint.find(query)
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name department')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await Complaint.countDocuments(query);

    res.json({
      success: true,
      data: complaints,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    console.error('Erreur getComplaints:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

/**
 * GET /api/complaints/:id
 * Détails d'une réclamation
 */
export const getComplaintById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const complaint = await Complaint.findById(id)
      .populate('reportedBy', 'name email phone')
      .populate('assignedTo', 'name members status');

    if (!complaint) {
      return res.status(404).json({ 
        success: false, 
        error: 'Réclamation non trouvée' 
      });
    }

    res.json({ success: true, data: complaint });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/complaints
 * Création d'une réclamation
 */
export const createComplaint = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { description, category, priority, location, photos } = req.body;
    
    // Générer ticketId unique (CPL-XXXX)
    const count = await Complaint.countDocuments();
    const ticketId = `CPL-${String(count + 1).padStart(4, '0')}`;

    const complaint = await Complaint.create({
      ticketId,
      description,
      category,
      priority,
      location,
      photos: photos || [],
      status: 'pending',
      reportedBy: req.user.id // Depuis middleware auth
    });

    // Notification Socket.IO
    global.io?.emit('complaint:created', {
      complaintId: complaint._id,
      ticketId: complaint.ticketId,
      category: complaint.category,
      priority: complaint.priority
    });

    res.status(201).json({ 
      success: true, 
      data: complaint 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * PATCH /api/complaints/:id
 * Mise à jour d'une réclamation
 */
export const updateComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({ 
        success: false, 
        error: 'Réclamation non trouvée' 
      });
    }

    // Notification si changement de statut
    if (updates.status) {
      global.io?.emit('complaint:statusChanged', {
        complaintId: complaint._id,
        newStatus: updates.status,
        ticketId: complaint.ticketId
      });
    }

    res.json({ success: true, data: complaint });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/complaints/:id/assign
 * Assigner une réclamation à une équipe
 */
export const assignComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { teamId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { 
        assignedTo: teamId,
        status: 'assigned'
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ 
        success: false, 
        error: 'Réclamation non trouvée' 
      });
    }

    // Notification équipe assignée
    global.io?.to(teamId).emit('complaint:assigned', {
      complaintId: complaint._id,
      ticketId: complaint.ticketId,
      teamId
    });

    res.json({ success: true, data: complaint });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

**Fichier**: `backend/src/routes/complaints.ts`

```typescript
import express from 'express';
import { body } from 'express-validator';
import * as complaintController from '../controllers/complaintController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

// Toutes les routes nécessitent authentification
router.use(authenticate);

// GET /api/complaints
router.get('/', complaintController.getComplaints);

// GET /api/complaints/:id
router.get('/:id', complaintController.getComplaintById);

// POST /api/complaints
router.post(
  '/',
  [
    body('description').notEmpty().withMessage('Description requise'),
    body('category').notEmpty().withMessage('Catégorie requise'),
    body('priority').isIn(['low', 'medium', 'high', 'urgent']),
    body('location.address').notEmpty().withMessage('Adresse requise'),
    body('location.coordinates.lat').isFloat(),
    body('location.coordinates.lng').isFloat()
  ],
  complaintController.createComplaint
);

// PATCH /api/complaints/:id
router.patch('/:id', complaintController.updateComplaint);

// POST /api/complaints/:id/assign
router.post('/:id/assign', complaintController.assignComplaint);

export default router;
```

#### Frontend - Hook useComplaints

**Fichier**: `frontend/src/hooks/useComplaints.ts`

```typescript
import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

export interface Complaint {
  id: string;
  ticketId: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  description: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  photos: string[];
  reportedBy: {
    id: string;
    name: string;
    email: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    department: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ComplaintFilters {
  status?: string;
  priority?: string;
  category?: string;
  search?: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const useComplaints = (initialFilters: ComplaintFilters = {}) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  const [filters, setFilters] = useState<ComplaintFilters>(initialFilters);

  const fetchComplaints = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== undefined && v !== '')
        )
      });

      const response = await api.get(`/complaints?${queryParams}`);
      const data = response.data;
      
      setComplaints(data.data);
      setPagination(data.pagination);
    } catch (err: any) {
      console.error('Erreur fetch complaints:', err);
      setError(err.response?.data?.error || 'Erreur lors du chargement des réclamations');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const refreshComplaints = () => {
    fetchComplaints(pagination.page);
  };

  const goToPage = (page: number) => {
    fetchComplaints(page);
  };

  const updateFilters = (newFilters: Partial<ComplaintFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  useEffect(() => {
    fetchComplaints(1);
  }, [fetchComplaints]);

  return {
    complaints,
    loading,
    error,
    pagination,
    filters,
    fetchComplaints,
    refreshComplaints,
    goToPage,
    updateFilters,
    resetFilters
  };
};

/**
 * Hook pour créer une réclamation
 */
export const useCreateComplaint = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComplaint = async (data: Partial<Complaint>) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/complaints', data);
      return response.data.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erreur lors de la création';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { createComplaint, loading, error };
};

/**
 * Hook pour une réclamation individuelle
 */
export const useComplaint = (id: string) => {
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComplaint = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/complaints/${id}`);
      setComplaint(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur chargement réclamation');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateComplaint = async (updates: Partial<Complaint>) => {
    try {
      const response = await api.patch(`/complaints/${id}`, updates);
      setComplaint(response.data.data);
      return response.data.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Erreur mise à jour');
    }
  };

  const assignToTeam = async (teamId: string) => {
    try {
      const response = await api.post(`/complaints/${id}/assign`, { teamId });
      setComplaint(response.data.data);
      return response.data.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Erreur assignation');
    }
  };

  useEffect(() => {
    if (id) fetchComplaint();
  }, [id, fetchComplaint]);

  return { 
    complaint, 
    loading, 
    error, 
    updateComplaint, 
    assignToTeam,
    refetch: fetchComplaint
  };
};
```

---

### **JOUR 3-4 (Mercredi-Jeudi)** : Authentification JWT Complète

#### Backend - Auth Controller

**Fichier**: `backend/src/controllers/authController.ts`

```typescript
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { validationResult } from 'express-validator';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key';
const JWT_EXPIRES_IN = '7d';
const REFRESH_EXPIRES_IN = '30d';

/**
 * POST /api/auth/register
 * Inscription nouvel utilisateur
 */
export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { email, password, name, role = 'staff' } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'Cet email est déjà utilisé' 
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role
    });

    // Générer les tokens
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token,
      refreshToken
    });
  } catch (error: any) {
    console.error('Erreur register:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/auth/login
 * Connexion utilisateur
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Email ou mot de passe incorrect' 
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Email ou mot de passe incorrect' 
      });
    }

    // Générer les tokens
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_EXPIRES_IN }
    );

    // Mettre à jour la dernière connexion
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar
      },
      token,
      refreshToken
    });
  } catch (error: any) {
    console.error('Erreur login:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/auth/refresh
 * Rafraîchir le token JWT
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ 
        success: false, 
        error: 'Refresh token manquant' 
      });
    }

    // Vérifier le refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as any;

    // Générer nouveau token
    const newToken = jwt.sign(
      { userId: decoded.userId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ success: true, token: newToken });
  } catch (error: any) {
    res.status(401).json({ 
      success: false, 
      error: 'Refresh token invalide' 
    });
  }
};

/**
 * GET /api/auth/me
 * Récupérer l'utilisateur connecté
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'Utilisateur non trouvé' 
      });
    }

    res.json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

#### Frontend - Amélioration useAuth

**Fichier**: `frontend/src/hooks/useAuth.ts` (version complète)

```typescript
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'dispatcher' | 'staff';
  avatar?: string;
}

export const useAuth = () => {
  const router = useRouter();
  const { user, token, setUser, setToken, logout: clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Connexion
   */
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/auth/login', { email, password });
      const { user, token, refreshToken } = response.data;

      // Stocker les tokens
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Configurer le header Authorization
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Mettre à jour le store
      setUser(user);
      setToken(token);

      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erreur de connexion';
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inscription
   */
  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/auth/register', { 
        email, 
        password, 
        name 
      });
      const { user, token, refreshToken } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
      setToken(token);

      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erreur lors de l\'inscription';
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
    clearAuth();
    router.push('/login');
  };

  /**
   * Vérifier l'authentification au chargement
   */
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken && !user) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          const response = await api.get('/auth/me');
          setUser(response.data.user);
          setToken(storedToken);
        } catch (error) {
          // Token invalide, déconnecter
          logout();
        }
      }
    };

    checkAuth();
  }, []);

  /**
   * Intercepteur pour rafraîchir le token automatiquement
   */
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Si 401 et pas déjà retry
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) throw new Error('No refresh token');

            const response = await api.post('/auth/refresh', { refreshToken });
            const { token: newToken } = response.data;

            localStorage.setItem('token', newToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            setToken(newToken);

            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  return {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token
  };
};
```

---

### **JOUR 5 (Vendredi)** : Upload Photos + PWA Basique

#### Backend - Upload Service

**Fichier**: `backend/src/routes/upload.ts`

```typescript
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `complaint-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max par fichier
    files: 5 // Max 5 fichiers
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images (JPEG, PNG, WebP) sont autorisées'));
    }
  }
});

/**
 * POST /api/upload
 * Upload de photos (max 5)
 */
router.post('/', authenticate, upload.array('photos', 5), (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Aucun fichier uploadé' 
      });
    }

    const urls = files.map(file => `/uploads/${file.filename}`);

    res.json({
      success: true,
      urls,
      count: files.length
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Servir les fichiers statiques
router.use('/', express.static(uploadsDir));

export default router;
```

#### Frontend - Composant PhotoUploader

**Fichier**: `frontend/src/components/PhotoUploader.tsx`

```typescript
'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Camera, Image as ImageIcon } from 'lucide-react';
import api from '@/lib/api';

interface Props {
  onPhotosChange: (urls: string[]) => void;
  maxPhotos?: number;
  existingPhotos?: string[];
}

export const PhotoUploader = ({ 
  onPhotosChange, 
  maxPhotos = 5, 
  existingPhotos = [] 
}: Props) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>(existingPhotos);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxPhotos - previewUrls.length;
    if (files.length > remainingSlots) {
      setError(`Maximum ${maxPhotos} photos autorisées`);
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    const formData = new FormData();
    Array.from(files).forEach(file => {
      // Vérifier la taille (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} dépasse 5MB`);
        return;
      }
      formData.append('photos', file);
    });

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 100)
          );
          setUploadProgress(percent);
        }
      });

      const newUrls = response.data.urls;
      const updatedUrls = [...previewUrls, ...newUrls];
      setPreviewUrls(updatedUrls);
      onPhotosChange(updatedUrls);
    } catch (err: any) {
      console.error('Erreur upload:', err);
      setError(err.response?.data?.error || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removePhoto = (index: number) => {
    const updatedUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(updatedUrls);
    onPhotosChange(updatedUrls);
  };

  return (
    <div className="space-y-4">
      {/* Zone de drop */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/jpg,image/webp"
          onChange={handleFileSelect}
          disabled={uploading || previewUrls.length >= maxPhotos}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-xs">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Upload en cours... {uploadProgress}%
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Upload className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Cliquez pour ajouter des photos
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Maximum {maxPhotos} photos • JPEG, PNG • 5MB max
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Camera className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500">
                {previewUrls.length}/{maxPhotos} photos
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Erreur */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Galerie des photos */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {previewUrls.map((url, index) => (
            <div 
              key={index} 
              className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700"
            >
              <img 
                src={url} 
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white">Photo {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

#### PWA Configuration

**Fichier**: `frontend/public/manifest.json`

```json
{
  "name": "ReclamTrack - Gestion Réclamations",
  "short_name": "ReclamTrack",
  "description": "Plateforme de gestion des réclamations citoyennes",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**Fichier**: `frontend/public/sw.js` (Service Worker basique)

```javascript
const CACHE_NAME = 'reclamtrack-v1';
 const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Strategy: Network First, fallback to Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone la réponse
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        // Si le réseau échoue, chercher dans le cache
        return caches.match(event.request);
      })
  );
});
```

**Mise à jour**: `frontend/src/app/layout.tsx`

```typescript
export const metadata = {
  title: 'ReclamTrack - Gestion des Réclamations Citoyennes',
  description: 'Plateforme de gestion intelligente des services municipaux',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ReclamTrack'
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png'
  }
};
```

---

## ✅ CHECKLIST DE FIN DE SEMAINE

### Backend
- [ ] Endpoints réclamations opérationnels (GET, POST, PATCH)
- [ ] Pagination fonctionnelle
- [ ] Authentification JWT avec refresh token
- [ ] Middleware `authenticate` actif
- [ ] Upload photos opérationnel
- [ ] Socket.IO configuré pour notifications temps réel

### Frontend
- [ ] Hook `useComplaints` fonctionnel avec filtres
- [ ] Hook `useAuth` avec refresh automatique
- [ ] Composant `<PhotoUploader />` opérationnel
- [ ] PWA installable sur mobile
- [ ] Service Worker enregistré

### Tests Manuels
- [ ] Créer un compte → Login → Logout
- [ ] Créer une réclamation avec photos
- [ ] Filtrer les réclamations (statut, priorité)
- [ ] Pagination de la liste
- [ ] Installer l'app sur mobile (A2HS)
- [ ] Tester mode hors ligne basique

---

## 📊 KPIs À MESURER

- **Temps de réponse API** : < 200ms
- **Taux de succès upload** : > 99%
- **Couverture fonctionnelle** : 80%+
- **Installation PWA** : Testée sur iOS + Android

---

## 🚀 PROCHAINES ÉTAPES (Semaine 2)

1. Socket.IO notifications temps réel
2. Dashboard analytics avec graphiques
3. IA de classification automatique (si OpenAI configuré)
4. Amélioration UX/UI

---

**Créé le**: 9 Février 2026  
**Mise à jour**: Quotidienne  
**Responsable**: Équipe Dev ReclamTrack
