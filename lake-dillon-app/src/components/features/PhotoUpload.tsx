import React, { useState, useRef } from 'react';
import { Button, Icons } from '../ui';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface PhotoUploadProps {
  eventId: string;
  onPhotoUploaded: (photoUrl: string) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ eventId, onPhotoUploaded }) => {
  const [uploading, setUploading] = useState(false);
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

    setUploading(true);

    try {
      // Create a unique filename
      const timestamp = Date.now();
      const filename = `timeline-photos/${eventId}/${timestamp}-${file.name}`;
      const storageRef = ref(storage, filename);

      // Upload file
      await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Call callback with URL
      onPhotoUploaded(downloadURL);

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
      setUploading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Camera Input (with capture attribute for mobile camera) */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        id={`photo-camera-${eventId}`}
      />
      <label htmlFor={`photo-camera-${eventId}`}>
        <Button
          as="span"
          variant="compact"
          disabled={uploading}
          className="cursor-pointer"
        >
          <Icons.Camera size={14} />
          {uploading ? 'Uploading...' : 'Camera'}
        </Button>
      </label>

      {/* Gallery Input (file picker) */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id={`photo-gallery-${eventId}`}
      />
      <label htmlFor={`photo-gallery-${eventId}`}>
        <Button
          as="span"
          variant="compact"
          disabled={uploading}
          className="cursor-pointer"
        >
          <Icons.Image size={14} />
          Gallery
        </Button>
      </label>
    </div>
  );
};
