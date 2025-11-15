import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icons } from '../ui';
import { PhotoUpload } from './PhotoUpload';
import { PhotoGallery } from './PhotoGallery';

interface SortableTimelineItemProps {
  id: string;
  children: React.ReactNode;
  onDelete?: () => void;
  photos?: string[];
  onPhotoUploaded?: (photoUrl: string) => void;
  onDeletePhoto?: (photoUrl: string) => void;
}

export const SortableTimelineItem: React.FC<SortableTimelineItemProps> = ({
  id,
  children,
  onDelete,
  photos = [],
  onPhotoUploaded,
  onDeletePhoto,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
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
              <PhotoUpload eventId={id} onPhotoUploaded={onPhotoUploaded} />
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
