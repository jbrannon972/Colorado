import React from 'react';
import { Button, Icons } from '../ui';
import type { Activity } from '../../types';

interface ActivityDetailModalProps {
  activity: Activity;
  onClose: () => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  onClose,
}) => {
  const handleOpenWebsite = () => {
    if (activity.website) {
      window.open(activity.website, '_blank', 'noopener,noreferrer');
    } else if (activity.bookingLink) {
      window.open(activity.bookingLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGetDirections = () => {
    if (activity.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${activity.coordinates.lat},${activity.coordinates.lng}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (activity.address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-deep-navy bg-opacity-90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gradient-to-b from-icy-blue to-deep-navy rounded-t-lg md:rounded-lg border border-pale-ice border-opacity-10 shadow-2xl w-full md:max-w-lg max-h-[85vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-deep-navy bg-opacity-95 backdrop-blur-sm p-md md:p-lg border-b border-pale-ice border-opacity-10 flex items-start justify-between z-10">
          <div className="flex-1 pr-4">
            <h2 className="text-h2 md:text-h1 text-frost-white mb-2">{activity.name}</h2>
            <div className="flex flex-wrap gap-2">
              {activity.category.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-1 bg-accent-blue bg-opacity-20 text-accent-blue rounded-subtle text-body-compact"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-pale-ice hover:text-frost-white p-2 -m-2"
          >
            <Icons.X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-md md:p-lg space-y-lg">
          {/* Description */}
          <div>
            <p className="text-body text-frost-white">{activity.description}</p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-label text-pale-ice">DURATION</div>
              <div className="text-h3 text-frost-white">
                {activity.durationHours.min}-{activity.durationHours.max}h
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-label text-pale-ice">DRIVE TIME</div>
              <div className="text-h3 text-frost-white">{activity.driveTimeMinutes} min</div>
            </div>

            {activity.costPerPerson && (
              <div className="space-y-1">
                <div className="text-label text-pale-ice">COST</div>
                <div className="text-h3 text-frost-white">
                  ${activity.costPerPerson.min}-${activity.costPerPerson.max}
                  <span className="text-body text-pale-ice"> /person</span>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <div className="text-label text-pale-ice">LOCATION</div>
              <div className="text-h3 text-frost-white">{activity.town}</div>
            </div>
          </div>

          {/* Family Friendly Icons */}
          <div className="flex items-center gap-4 p-md bg-deep-navy bg-opacity-30 rounded-subtle">
            <div className="flex items-center gap-2">
              <Icons.Baby size={20} className={activity.toddlerFriendly ? 'text-success-teal' : 'text-pale-ice opacity-30'} />
              <span className={`text-body ${activity.toddlerFriendly ? 'text-frost-white' : 'text-pale-ice opacity-30'}`}>
                Toddler Friendly
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Pregnant size={20} className={activity.pregnancySafe ? 'text-success-teal' : 'text-pale-ice opacity-30'} />
              <span className={`text-body ${activity.pregnancySafe ? 'text-frost-white' : 'text-pale-ice opacity-30'}`}>
                Pregnancy Safe
              </span>
            </div>
          </div>

          {/* Address */}
          {activity.address && (
            <div className="space-y-2">
              <div className="text-label text-pale-ice">ADDRESS</div>
              <button
                onClick={handleGetDirections}
                className="flex items-start gap-2 text-body text-frost-white hover:text-accent-blue transition-colors text-left w-full group"
              >
                <Icons.MapPin size={16} className="text-accent-blue flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="underline decoration-transparent group-hover:decoration-accent-blue transition-colors">
                  {activity.address}
                </span>
              </button>
            </div>
          )}

          {/* Rating */}
          {activity.rating && (
            <div className="flex items-center gap-2">
              <Icons.Star size={20} className="text-accent-blue fill-accent-blue" />
              <span className="text-h3 text-frost-white">{activity.rating}</span>
              {activity.reviewCount && (
                <span className="text-body text-pale-ice">({activity.reviewCount} reviews)</span>
              )}
            </div>
          )}

          {/* Seasonal Notes */}
          {activity.seasonalNotes && (
            <div className="bg-info-slate bg-opacity-10 border border-info-slate border-opacity-30 rounded-subtle p-md">
              <div className="flex items-start gap-2">
                <Icons.Info size={16} className="text-info-slate flex-shrink-0 mt-1" />
                <p className="text-body text-frost-white">{activity.seasonalNotes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-deep-navy bg-opacity-95 backdrop-blur-sm p-md md:p-lg border-t border-pale-ice border-opacity-10 space-y-2">
          {(activity.website || activity.bookingLink) && (
            <Button
              variant="primary"
              onClick={handleOpenWebsite}
              className="w-full"
            >
              <Icons.ExternalLink size={18} />
              {activity.bookingLink ? 'Book Now' : 'Visit Website'}
            </Button>
          )}

          {(activity.address || activity.coordinates) && (
            <Button
              variant="secondary"
              onClick={handleGetDirections}
              className="w-full"
            >
              <Icons.MapPin size={18} />
              Get Directions
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
