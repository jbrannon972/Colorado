import React from 'react';
import type { Activity } from '../../types';
import { Card, Button, Icons } from '../ui';

interface ActivityCardProps {
  activity: Activity;
  onAddToDay?: (activity: Activity) => void;
  onMoreInfo?: (activity: Activity) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onAddToDay,
  onMoreInfo,
}) => {
  return (
    <Card className="space-y-sm">
      {/* Header */}
      <div>
        <h3 className="text-h3 text-frost-white">{activity.name}</h3>
        <p className="text-label text-pale-ice mt-1">
          {activity.category.join(' • ')}
        </p>
      </div>

      {/* Metadata */}
      <div className="space-y-1 text-body-compact text-pale-ice">
        <div className="flex items-center gap-2">
          <Icons.Clock size={16} className="text-pale-ice" />
          <span>
            {activity.durationHours.min}-{activity.durationHours.max} hrs
          </span>
          <span className="mx-2">|</span>
          <Icons.MapPin size={16} className="text-pale-ice" />
          <span>{activity.driveTimeMinutes} min drive</span>
        </div>

        {activity.costPerPerson && (
          <div className="flex items-center gap-2">
            <Icons.DollarSign size={16} className="text-pale-ice" />
            <span>
              ${activity.costPerPerson.min}-${activity.costPerPerson.max} per person
            </span>
          </div>
        )}
      </div>

      {/* Family Suitability */}
      <div className="flex items-center gap-3 text-body-compact">
        <div className="flex items-center gap-1">
          <Icons.Baby size={16} className={activity.toddlerFriendly ? 'text-success-teal' : 'text-error-rose'} />
          <span className={activity.toddlerFriendly ? 'text-success-teal' : 'text-error-rose'}>
            {activity.toddlerFriendly ? 'Toddler-friendly' : 'Not for toddlers'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Icons.Pregnant size={16} className={activity.pregnancySafe ? 'text-success-teal' : 'text-warning-brown'} />
          <span className={activity.pregnancySafe ? 'text-success-teal' : 'text-warning-brown'}>
            {activity.pregnancySafe ? 'Pregnancy-safe' : 'Check restrictions'}
          </span>
        </div>
      </div>

      {/* Rating */}
      {activity.rating && (
        <div className="flex items-center gap-2 text-body-compact text-pale-ice">
          <Icons.Star size={16} className="text-accent-blue fill-accent-blue" />
          <span>{activity.rating}/5</span>
          <span className="text-pale-ice opacity-70">({activity.reviewCount} reviews)</span>
        </div>
      )}

      {/* Seasonal Notes */}
      {activity.seasonalNotes && (
        <div className="flex items-center gap-2 text-label text-warning-brown bg-warning-brown bg-opacity-10 px-2 py-1 rounded-subtle">
          <Icons.Warning size={14} />
          <span>{activity.seasonalNotes}</span>
        </div>
      )}

      {/* Actions */}
      {(onMoreInfo || onAddToDay) && (
        <div className="flex gap-2 pt-xs">
          {onMoreInfo && (
            <Button variant="secondary" onClick={() => onMoreInfo(activity)}>
              More Info
            </Button>
          )}
          {onAddToDay && (
            <Button variant="primary" onClick={() => onAddToDay(activity)}>
              <Icons.Plus size={16} />
              Add to Day
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};
