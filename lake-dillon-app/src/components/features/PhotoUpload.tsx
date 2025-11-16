import React, { useState, useRef } from 'react';
import { Button, Icons, Input } from '../ui';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Photo } from '../../types';

interface PhotoUploadProps {
  eventId: string;
  onPhotoUploaded: (photo: Photo) => void;
  defaultLocation?: {
    activityId?: string;
    activityName?: string;
    restaurantId?: string;
    restaurantName?: string;
    customLocation?: string;
  };
  defaultDate?: string;
  defaultTimeSlot?: 'morning' | 'afternoon' | 'evening';
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  eventId,
  onPhotoUploaded,
  defaultLocation,
  defaultDate,
  defaultTimeSlot
}) => {
  const [uploading, setUploading] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState<{ url: string; uploadedAt: number } | null>(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
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

      // Show metadata modal
      setPendingPhoto({ url: downloadURL, uploadedAt: timestamp });

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

  const handleSavePhoto = () => {
    if (!pendingPhoto) return;

    const photo: Photo = {
      id: `photo-${pendingPhoto.uploadedAt}`,
      url: pendingPhoto.url,
      uploadedAt: pendingPhoto.uploadedAt,
      description: description.trim() || undefined,
      location: defaultLocation,
      date: defaultDate,
      timeSlot: defaultTimeSlot,
      tags: tags.trim() ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
    };

    onPhotoUploaded(photo);
    setPendingPhoto(null);
    setDescription('');
    setTags('');
  };

  const handleSkipMetadata = () => {
    if (!pendingPhoto) return;

    const photo: Photo = {
      id: `photo-${pendingPhoto.uploadedAt}`,
      url: pendingPhoto.url,
      uploadedAt: pendingPhoto.uploadedAt,
      location: defaultLocation,
      date: defaultDate,
      timeSlot: defaultTimeSlot,
    };

    onPhotoUploaded(photo);
    setPendingPhoto(null);
    setDescription('');
    setTags('');
  };

  return (
    <>
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

      {/* Metadata Modal */}
      {pendingPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-md">
          <div
            className="absolute inset-0 bg-deep-navy bg-opacity-80 backdrop-blur-sm"
            onClick={handleSkipMetadata}
          />
          <div className="relative bg-gradient-to-b from-icy-blue to-deep-navy rounded-subtle border border-pale-ice border-opacity-10 shadow-2xl max-w-md w-full">
            <div className="p-md border-b border-pale-ice border-opacity-10">
              <h3 className="text-h3 text-frost-white">Add Photo Details</h3>
              <p className="text-body-compact text-pale-ice mt-1">Optional - you can skip this</p>
            </div>

            <div className="p-md space-y-md">
              <img src={pendingPhoto.url} alt="Uploaded" className="w-full rounded-subtle" />

              <div>
                <label className="text-label text-pale-ice mb-2 block">DESCRIPTION</label>
                <Input
                  type="text"
                  placeholder="What's happening in this photo?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="text-label text-pale-ice mb-2 block">TAGS (comma-separated)</label>
                <Input
                  type="text"
                  placeholder="family, sunset, mountain, etc."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              {defaultLocation && (
                <div className="text-body-compact text-pale-ice flex items-center gap-2">
                  <Icons.MapPin size={14} className="text-accent-blue" />
                  <span>
                    {defaultLocation.activityName || defaultLocation.restaurantName}
                  </span>
                </div>
              )}
            </div>

            <div className="p-md border-t border-pale-ice border-opacity-10 flex gap-2">
              <Button variant="secondary" onClick={handleSkipMetadata} className="flex-1">
                Skip
              </Button>
              <Button variant="primary" onClick={handleSavePhoto} className="flex-1">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
