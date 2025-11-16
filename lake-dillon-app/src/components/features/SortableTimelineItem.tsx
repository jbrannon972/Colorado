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
      <div className="p-2 space-y-2">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-pale-ice hover:text-frost-white transition-colors flex-shrink-0"
          >
            <Icons.GripVertical size={16} />
          </button>
          <div className="flex-1 text-body text-frost-white">
            {children}
          </div>
          <div className="flex items-center gap-1">
            {onPhotoUploaded && (
              <PhotoUpload
                eventId={id}
                onPhotoUploaded={onPhotoUploaded}
                defaultLocation={photoMetadata?.location}
                defaultDate={photoMetadata?.date}
                defaultTimeSlot={photoMetadata?.timeSlot}
              />
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="text-pale-ice hover:text-error-rose transition-colors p-1"
              >
                <Icons.X size={16} />
              </button>
            )}
          </div>
        </div>
        <PhotoGallery photos={photos} onDeletePhoto={onDeletePhoto} />
      </div>
    </div>
  );
};
