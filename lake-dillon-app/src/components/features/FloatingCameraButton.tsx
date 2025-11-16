import React, { useState, useRef } from 'react';
import { Icons } from '../ui';
import { PhotoTaggingModal } from './PhotoTaggingModal';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Photo } from '../../types';

export const FloatingCameraButton: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState<Photo | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB');
      return;
    }

    setIsUploading(true);
    setShowMenu(false);

    try {
      // Create a unique filename
      const timestamp = Date.now();
      const filename = `quick-photos/${timestamp}-${file.name}`;
      const storageRef = ref(storage, filename);

      // Upload file
      await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Create pending photo for tagging
      const photo: Photo = {
        id: `photo-${timestamp}`,
        url: downloadURL,
        uploadedAt: timestamp,
      };

      setPendingPhoto(photo);

      // Clear file inputs
      if (cameraInputRef.current) {
        cameraInputRef.current.value = '';
      }
      if (galleryInputRef.current) {
        galleryInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoTagged = () => {
    setPendingPhoto(null);
  };

  const handleCancel = () => {
    setPendingPhoto(null);
  };

  return (
    <>
      {/* Floating Camera Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {showMenu && (
          <div className="absolute bottom-16 right-0 bg-gradient-to-b from-icy-blue to-deep-navy rounded-subtle border border-pale-ice border-opacity-20 shadow-2xl p-2 space-y-2 animate-slideUp">
            {/* Camera Option */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
              id="floating-camera-input"
            />
            <label htmlFor="floating-camera-input">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 bg-deep-navy bg-opacity-50 hover:bg-opacity-80 rounded-subtle transition-all text-frost-white"
                onClick={() => cameraInputRef.current?.click()}
                disabled={isUploading}
              >
                <Icons.Camera size={18} />
                <span className="text-body whitespace-nowrap">Take Photo</span>
              </button>
            </label>

            {/* Gallery Option */}
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="floating-gallery-input"
            />
            <label htmlFor="floating-gallery-input">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 bg-deep-navy bg-opacity-50 hover:bg-opacity-80 rounded-subtle transition-all text-frost-white"
                onClick={() => galleryInputRef.current?.click()}
                disabled={isUploading}
              >
                <Icons.Image size={18} />
                <span className="text-body whitespace-nowrap">From Gallery</span>
              </button>
            </label>
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          disabled={isUploading}
          className="w-14 h-14 bg-accent-blue hover:bg-opacity-90 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
          aria-label="Quick photo"
        >
          {isUploading ? (
            <div className="animate-spin">
              <Icons.Camera size={24} className="text-frost-white" />
            </div>
          ) : showMenu ? (
            <Icons.X size={24} className="text-frost-white" />
          ) : (
            <Icons.Camera size={24} className="text-frost-white" />
          )}
        </button>
      </div>

      {/* Photo Tagging Modal */}
      {pendingPhoto && (
        <PhotoTaggingModal
          photo={pendingPhoto}
          onSave={handlePhotoTagged}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};
