'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Camera } from 'lucide-react';
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
