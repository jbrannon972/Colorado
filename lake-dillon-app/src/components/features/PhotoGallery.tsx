import React, { useState } from 'react';
import { Icons } from '../ui';

interface PhotoGalleryProps {
  photos: string[];
  onDeletePhoto?: (photoUrl: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onDeletePhoto }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (photos.length === 0) return null;

  return (
    <div>
      {/* Photo Grid */}
      <div className="flex gap-1 mt-2 overflow-x-auto pb-1">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-16 h-16 rounded cursor-pointer overflow-hidden border border-pale-ice border-opacity-20 hover:border-accent-blue transition-colors"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo}
              alt={`Timeline photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {onDeletePhoto && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Delete this photo?')) {
                    onDeletePhoto(photo);
                  }
                }}
                className="absolute top-0.5 right-0.5 bg-deep-navy bg-opacity-80 text-error-rose rounded-full p-0.5 hover:bg-opacity-100 transition-opacity"
              >
                <Icons.X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-deep-navy bg-opacity-95 flex items-center justify-center p-lg"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-frost-white hover:text-accent-blue transition-colors"
          >
            <Icons.X size={32} />
          </button>
          <img
            src={selectedPhoto}
            alt="Full size"
            className="max-w-full max-h-full object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
