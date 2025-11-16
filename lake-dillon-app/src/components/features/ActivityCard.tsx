import React from 'react';
import type { Activity } from '../../types';
import { Button, Icons } from '../ui';

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
    <div className="list-item">
      <div className="flex items-start gap-3">
        {/* Main Content - Tappable for More Info */}
        <div
          className="flex-1 space-y-2 cursor-pointer"
          onClick={() => onMoreInfo && onMoreInfo(activity)}
        >
          {/* Title */}
          <h3 className="text-h3 text-frost-white">{activity.name}</h3>

          {/* Category */}
          <p className="text-metadata">
            {activity.category.join(' • ')}
          </p>

          {/* Metadata Row */}
          <div className="flex items-center gap-4 text-metadata flex-wrap">
            <div className="flex items-center gap-1">
              <Icons.Clock size={14} className="text-pale-ice" />
              <span>{activity.durationHours.min}-{activity.durationHours.max} hrs</span>
            </div>
            <div className="flex items-center gap-1">
              <Icons.MapPin size={14} className="text-pale-ice" />
              <span>{activity.driveTimeMinutes} min</span>
            </div>
            {activity.costPerPerson && (
              <div className="flex items-center gap-1">
                <Icons.DollarSign size={14} className="text-pale-ice" />
                <span>${activity.costPerPerson.min}-${activity.costPerPerson.max}</span>
              </div>
            )}
          </div>

          {/* Family Suitability Icons */}
          <div className="flex items-center gap-3 text-metadata">
            {activity.toddlerFriendly && (
              <div className="flex items-center gap-1 text-success-teal">
                <Icons.Baby size={14} />
                <span>Toddler OK</span>
              </div>
            )}
            {activity.pregnancySafe && (
              <div className="flex items-center gap-1 text-success-teal">
                <Icons.Pregnant size={14} />
                <span>Pregnancy Safe</span>
              </div>
            )}
          </div>
        </div>

        {/* Add Button */}
        {onAddToDay && (
          <Button
            variant="icon"
            onClick={(e) => {
              e.stopPropagation();
              onAddToDay(activity);
            }}
            aria-label="Add to day"
          >
            <Icons.Plus size={20} className="text-accent-blue" />
          </Button>
        )}
      </div>
    </div>
  );
};
