import React, { useState } from 'react';
import { Icons } from '../ui';
import type { Photo } from '../../types';

interface PhotoGalleryProps {
  photos: Photo[];
  onDeletePhoto?: (photoUrl: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onDeletePhoto }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (photos.length === 0) return null;

  return (
    <div>
      {/* Photo Grid */}
      <div className="flex gap-1 mt-2 overflow-x-auto pb-1">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative flex-shrink-0 w-16 h-16 rounded cursor-pointer overflow-hidden border border-pale-ice border-opacity-20 hover:border-accent-blue transition-colors"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.url}
              alt={photo.description || 'Timeline photo'}
              className="w-full h-full object-cover"
            />
            {onDeletePhoto && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Delete this photo?')) {
                    onDeletePhoto(photo.url);
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

      {/* Lightbox Modal with Metadata */}
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
          <div className="max-w-4xl max-h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.description || 'Full size'}
              className="w-full object-contain rounded-subtle mb-4"
            />
            {(selectedPhoto.description || selectedPhoto.tags) && (
              <div className="bg-deep-navy bg-opacity-60 backdrop-blur-sm rounded-subtle p-md space-y-2">
                {selectedPhoto.description && (
                  <p className="text-body text-frost-white">{selectedPhoto.description}</p>
                )}
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-accent-blue bg-opacity-20 text-accent-blue rounded-subtle text-body-compact"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
