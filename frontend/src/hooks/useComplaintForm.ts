// hooks/useComplaintForm.ts
'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast'; // Changed form sonner to react-hot-toast as per package.json
import {
    step1Schema,
    step2Schema,
    step3Schema,
    step4Schema,
    Step1Data,
    Step2Data,
    Step3Data,
    Step4Data,
} from '@/lib/validations/complaint-form.validation';

const STORAGE_KEY = 'complaint_form_draft';
const TOTAL_STEPS = 4;

export type FormStep = 1 | 2 | 3 | 4;

interface UseComplaintFormOptions {
    onSuccess?: (complaintId: string) => void;
    enableAutosave?: boolean;
}

export function useComplaintForm(options: UseComplaintFormOptions = {}) {
    const { onSuccess, enableAutosave = true } = options;
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState<FormStep>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

    // Forms pour chaque étape
    const step1Form = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
        mode: 'onBlur',
        defaultValues: loadDraft('step1'),
    });

    const step2Form = useForm<Step2Data>({
        resolver: zodResolver(step2Schema),
        mode: 'onBlur',
        defaultValues: loadDraft('step2'),
    });

    const step3Form = useForm<Step3Data>({
        resolver: zodResolver(step3Schema),
        mode: 'onBlur',
        defaultValues: loadDraft('step3') || { photos: [] },
    });

    const step4Form = useForm<Step4Data>({
        resolver: zodResolver(step4Schema),
        mode: 'onBlur',
        defaultValues: loadDraft('step4') || {
            isAnonymous: false,
            notificationPreference: 'both',
            agreeToTerms: false,
        },
    });

    const forms = {
        1: step1Form,
        2: step2Form,
        3: step3Form,
        4: step4Form,
    };

    const currentForm = forms[currentStep];

    // Chargement du brouillon depuis localStorage
    function loadDraft(step: string) {
        if (typeof window === 'undefined') return undefined;

        try {
            const draft = localStorage.getItem(STORAGE_KEY);
            if (!draft) return undefined;

            const parsed = JSON.parse(draft);
            return parsed[step];
        } catch (error) {
            console.error('Error loading draft:', error);
            return undefined;
        }
    }

    // Sauvegarde auto du brouillon
    const saveDraft = useCallback(() => {
        if (!enableAutosave || typeof window === 'undefined') return;

        try {
            const draft = {
                step1: step1Form.getValues(),
                step2: step2Form.getValues(),
                step3: step3Form.getValues(),
                step4: step4Form.getValues(),
                savedAt: new Date().toISOString(),
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
            toast.success('Brouillon sauvegardé', { duration: 2000 });
        } catch (error) {
            console.error('Error saving draft:', error);
        }
    }, [step1Form, step2Form, step3Form, step4Form, enableAutosave]);

    // Suppression du brouillon
    const clearDraft = useCallback(() => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    // Navigation entre les étapes
    const goToNextStep = useCallback(async () => {
        const isValid = await currentForm.trigger();

        if (!isValid) {
            toast.error('Veuillez corriger les erreurs avant de continuer');
            return false;
        }

        saveDraft();

        if (currentStep < TOTAL_STEPS) {
            setCurrentStep((prev) => (prev + 1) as FormStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return true;
        }

        return false;
    }, [currentStep, currentForm, saveDraft]);

    const goToPreviousStep = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep((prev) => (prev - 1) as FormStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentStep]);

    const goToStep = useCallback((step: FormStep) => {
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Upload de fichiers avec progression
    const uploadFile = useCallback(async (
        file: File,
        type: 'photo' | 'document' | 'audio'
    ): Promise<string> => {
        // We will return the file object itself or a temporary URL, 
        // as the actual upload will happen on form submission to link it to the complaint.
        // OR we can implement immediate upload if backend supports it.
        // Given backend route for '/api/complaints' handles upload with 'photos' field,
        // we should probably collect files in state and send them on final submit.
        // However, the FileUpload component expects a URL return usually for preview.

        // For now, let's just return a local preview URL
        // The actual File object should be stored in the form state.

        return URL.createObjectURL(file);
    }, []);

    // Soumission finale du formulaire
    const submitComplaint = useCallback(async (files?: File[]) => { // Accept files argument
        setIsSubmitting(true);

        try {
            // Validation finale de toutes les étapes
            const [valid1, valid2, valid3, valid4] = await Promise.all([
                step1Form.trigger(),
                step2Form.trigger(),
                step3Form.trigger(),
                step4Form.trigger(),
            ]);

            if (!valid1 || !valid2 || !valid3 || !valid4) {
                toast.error('Certaines informations sont manquantes ou invalides');

                // Retour à la première étape avec erreurs
                if (!valid1) setCurrentStep(1);
                else if (!valid2) setCurrentStep(2);
                else if (!valid3) setCurrentStep(3);
                else if (!valid4) setCurrentStep(4);

                return;
            }

            // Collecte des données
            const formData = new FormData();

            // Step 1
            const step1 = step1Form.getValues();
            formData.append('category', step1.category);
            formData.append('subcategory', step1.subcategory);
            formData.append('priority', step1.priority);
            formData.append('title', step1.title);
            formData.append('description', step1.description);

            // Step 2
            const step2 = step2Form.getValues();
            formData.append('address', step2.address);
            formData.append('city', step2.city);
            formData.append('district', step2.district);
            if (step2.postalCode) formData.append('postalCode', step2.postalCode);
            if (step2.latitude) formData.append('latitude', String(step2.latitude));
            if (step2.longitude) formData.append('longitude', String(step2.longitude));

            // Step 3 (Files)
            if (files && files.length > 0) {
                files.forEach(file => {
                    formData.append('photos', file);
                });
            }

            // Step 4
            const step4 = step4Form.getValues();
            formData.append('isAnonymous', String(step4.isAnonymous));

            // Only append contact info if NOT anonymous to respect privacy/backend logic
            if (!step4.isAnonymous) {
                if (step4.firstName) formData.append('firstName', step4.firstName);
                if (step4.lastName) formData.append('lastName', step4.lastName);
                if (step4.email) formData.append('email', step4.email);
                if (step4.phone) formData.append('phone', step4.phone);
            }

            // Envoi au backend
            const token = localStorage.getItem('token');
            const headers: Record<string, string> = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/complaints`, {
                method: 'POST',
                headers: headers, // Do NOT set Content-Type, browser sets it with boundary
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Erreur lors de la soumission');
            }

            const result = await response.json();

            // Succès
            clearDraft();
            toast.success('Réclamation soumise avec succès!');

            if (onSuccess) {
                onSuccess(result._id || result.id);
            } else {
                router.push(`/complaints/${result._id || result.id}`);
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            toast.error(error.message || 'Erreur lors de la soumission');
        } finally {
            setIsSubmitting(false);
        }
    }, [step1Form, step2Form, step3Form, step4Form, clearDraft, onSuccess, router]);

    return {
        currentStep,
        totalSteps: TOTAL_STEPS,
        currentForm,
        forms,

        // Navigation
        goToNextStep,
        goToPreviousStep,
        goToStep,

        // Actions
        saveDraft,
        clearDraft,
        uploadFile,
        submitComplaint,

        // État
        isSubmitting,
        uploadProgress,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === TOTAL_STEPS,
        progress: Math.round((currentStep / TOTAL_STEPS) * 100),
    };
}
