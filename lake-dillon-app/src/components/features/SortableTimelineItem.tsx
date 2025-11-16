import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect } from 'react';
import { Icons } from '../ui';
import { PhotoUpload } from './PhotoUpload';
import { PhotoGallery } from './PhotoGallery';
import type { Photo } from '../../types';

interface SortableTimelineItemProps {
  id: string;
  children: React.ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
  photos?: Photo[];
  onPhotoUploaded?: (photo: Photo) => void;
  onDeletePhoto?: (photoUrl: string) => void;
  photoMetadata?: {
    location?: {
      activityId?: string;
      activityName?: string;
      restaurantId?: string;
      restaurantName?: string;
      customLocation?: string;
    };
    date?: string;
    timeSlot?: 'morning' | 'afternoon' | 'evening';
  };
}

export const SortableTimelineItem: React.FC<SortableTimelineItemProps> = ({
  id,
  children,
  onDelete,
  onClick,
  photos = [],
  onPhotoUploaded,
  onDeletePhoto,
  photoMetadata,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    // Mark as not new after animation completes
    const timer = setTimeout(() => {
      setIsNew(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        animation: isNew ? 'slideUp 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), fadeIn 200ms ease-out' : undefined,
      }}
      className="bg-deep-navy bg-opacity-50 rounded-subtle overflow-hidden"
    >
      {/* Top Bar - Drag, Delete, Photos */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-pale-ice hover:text-frost-white transition-colors flex-shrink-0 p-2 -ml-2"
          aria-label="Drag to reorder"
        >
          <Icons.GripVertical size={18} />
        </button>

        <div className="flex-1" />

        {onPhotoUploaded && (
          <div className="flex-shrink-0">
            <PhotoUpload
              eventId={id}
              onPhotoUploaded={onPhotoUploaded}
              defaultLocation={photoMetadata?.location}
              defaultDate={photoMetadata?.date}
              defaultTimeSlot={photoMetadata?.timeSlot}
            />
          </div>
        )}

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-pale-ice hover:text-error-rose transition-colors p-2 -mr-2 flex-shrink-0"
            aria-label="Delete item"
          >
            <Icons.X size={20} />
          </button>
        )}
      </div>

      {/* Main Content - Clickable */}
      <div
        onClick={onClick}
        className={`px-3 pb-3 ${onClick ? 'cursor-pointer active:bg-deep-navy active:bg-opacity-30' : ''}`}
      >
        <div className="text-body text-frost-white min-h-[44px] flex items-center">
          {children}
        </div>
      </div>

      {/* Photo Gallery */}
      {photos && photos.length > 0 && (
        <div className="px-3 pb-3">
          <PhotoGallery photos={photos} onDeletePhoto={onDeletePhoto} />
        </div>
      )}
    </div>
  );
};
