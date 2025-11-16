import React, { useState } from 'react';
import { PhotoUpload } from './PhotoUpload';
import { Icons, Button } from '../ui';
import type { Photo } from '../../types';

interface TimelineItemPhotosProps {
  itemId: string;
  photos?: Photo[];
  onPhotoAdded: (photo: Photo) => void;
  onPhotoRemoved: (photoUrl: string) => void;
}

export const TimelineItemPhotos: React.FC<TimelineItemPhotosProps> = ({
  itemId,
  photos = [],
  onPhotoAdded,
  onPhotoRemoved,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleDeletePhoto = (photoUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this photo?')) {
      onPhotoRemoved(photoUrl);
      if (selectedPhoto?.url === photoUrl) {
        setSelectedPhoto(null);
      }
    }
  };

  return (
    <div className="space-y-2">
      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square rounded-subtle overflow-hidden cursor-pointer group"
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                src={photo.url}
                alt={photo.description || 'Timeline photo'}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <button
                onClick={(e) => handleDeletePhoto(photo.url, e)}
                className="absolute top-1 right-1 bg-deep-navy bg-opacity-80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icons.X size={12} className="text-frost-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Photo Button / Upload */}
      <div className="flex items-center gap-2">
        {showUpload ? (
          <>
            <PhotoUpload
              eventId={itemId}
              onPhotoUploaded={(photo) => {
                onPhotoAdded(photo);
                setShowUpload(false);
              }}
            />
            <Button
              variant="secondary"
              onClick={() => setShowUpload(false)}
              className="btn-compact"
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="secondary"
            onClick={() => setShowUpload(true)}
            className="btn-compact"
          >
            <Icons.Camera size={14} />
            {photos.length === 0 ? 'Add Photos' : `Add More (${photos.length})`}
          </Button>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[200] bg-deep-navy bg-opacity-95 flex items-center justify-center"
          style={{ position: 'fixed' }}
          onClick={handleCloseModal}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 bg-deep-navy bg-opacity-80 rounded-full p-2 touch-opacity"
          >
            <Icons.X size={24} className="text-frost-white" />
          </button>
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.description || 'Full size'}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => handleDeletePhoto(selectedPhoto.url, e)}
            className="absolute bottom-4 right-4 bg-error-rose bg-opacity-80 rounded-full p-3 touch-opacity"
          >
            <Icons.Trash size={20} className="text-frost-white" />
          </button>
        </div>
      )}
    </div>
  );
};
