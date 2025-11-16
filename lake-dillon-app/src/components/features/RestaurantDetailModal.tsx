import React from 'react';
import { Button, Icons } from '../ui';
import type { Restaurant } from '../../types';

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  onClose,
}) => {
  const handleOpenWebsite = () => {
    if (restaurant.website) {
      window.open(restaurant.website, '_blank', 'noopener,noreferrer');
    } else if (restaurant.reservationLink) {
      window.open(restaurant.reservationLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCall = () => {
    if (restaurant.phone) {
      window.location.href = `tel:${restaurant.phone}`;
    }
  };

  const handleGetDirections = () => {
    if (restaurant.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.coordinates.lat},${restaurant.coordinates.lng}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (restaurant.address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;
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
            <h2 className="text-h2 md:text-h1 text-frost-white mb-2">{restaurant.name}</h2>
            <div className="flex flex-wrap gap-2">
              {restaurant.cuisine.map((cuisine) => (
                <span
                  key={cuisine}
                  className="px-2 py-1 bg-accent-blue bg-opacity-20 text-accent-blue rounded-subtle text-body-compact"
                >
                  {cuisine}
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
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-label text-pale-ice">LOCATION</div>
              <div className="text-h3 text-frost-white">{restaurant.town}</div>
            </div>

            <div className="space-y-1">
              <div className="text-label text-pale-ice">DRIVE TIME</div>
              <div className="text-h3 text-frost-white">{restaurant.driveTimeFromSpinnaker} min</div>
            </div>

            {restaurant.totalForFamilyOf5 && (
              <div className="space-y-1 col-span-2">
                <div className="text-label text-pale-ice">ESTIMATED COST (FAMILY OF 5)</div>
                <div className="text-h3 text-frost-white">
                  ${restaurant.totalForFamilyOf5}
                </div>
              </div>
            )}
          </div>

          {/* Meal Service */}
          <div className="space-y-2">
            <div className="text-label text-pale-ice">SERVES</div>
            <div className="flex flex-wrap gap-2">
              {restaurant.servesBreakfast && (
                <span className="px-3 py-1.5 bg-deep-navy bg-opacity-50 text-frost-white rounded-subtle text-body">
                  Breakfast
                </span>
              )}
              {restaurant.servesLunch && (
                <span className="px-3 py-1.5 bg-deep-navy bg-opacity-50 text-frost-white rounded-subtle text-body">
                  Lunch
                </span>
              )}
              {restaurant.servesDinner && (
                <span className="px-3 py-1.5 bg-deep-navy bg-opacity-50 text-frost-white rounded-subtle text-body">
                  Dinner
                </span>
              )}
            </div>
          </div>

          {/* Family Friendly Icons */}
          <div className="grid grid-cols-2 gap-3 p-md bg-deep-navy bg-opacity-30 rounded-subtle">
            <div className="flex items-center gap-2">
              <Icons.Baby size={18} className={restaurant.toddlerFriendly ? 'text-success-teal' : 'text-pale-ice opacity-30'} />
              <span className={`text-body-compact ${restaurant.toddlerFriendly ? 'text-frost-white' : 'text-pale-ice opacity-30'}`}>
                Toddler Friendly
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Pregnant size={18} className={restaurant.pregnancySafe ? 'text-success-teal' : 'text-pale-ice opacity-30'} />
              <span className={`text-body-compact ${restaurant.pregnancySafe ? 'text-frost-white' : 'text-pale-ice opacity-30'}`}>
                Pregnancy Safe
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Baby size={18} className={restaurant.boosterSeatAvailable ? 'text-success-teal' : 'text-pale-ice opacity-30'} />
              <span className={`text-body-compact ${restaurant.boosterSeatAvailable ? 'text-frost-white' : 'text-pale-ice opacity-30'}`}>
                Booster Seats
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.Baby size={18} className={restaurant.spaceForStroller ? 'text-success-teal' : 'text-pale-ice opacity-30'} />
              <span className={`text-body-compact ${restaurant.spaceForStroller ? 'text-frost-white' : 'text-pale-ice opacity-30'}`}>
                Stroller Space
              </span>
            </div>
          </div>

          {/* Address */}
          {restaurant.address && (
            <div className="space-y-2">
              <div className="text-label text-pale-ice">ADDRESS</div>
              <div className="flex items-start gap-2 text-body text-frost-white">
                <Icons.MapPin size={16} className="text-accent-blue flex-shrink-0 mt-1" />
                <span>{restaurant.address}</span>
              </div>
            </div>
          )}

          {/* Phone */}
          {restaurant.phone && (
            <div className="space-y-2">
              <div className="text-label text-pale-ice">PHONE</div>
              <button
                onClick={handleCall}
                className="flex items-center gap-2 text-body text-accent-blue hover:underline"
              >
                <Icons.Phone size={16} />
                <span>{restaurant.phone}</span>
              </button>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Icons.Star size={20} className="text-accent-blue fill-accent-blue" />
            <span className="text-h3 text-frost-white">{restaurant.rating}</span>
            <span className="text-body text-pale-ice">({restaurant.reviewCount} reviews)</span>
          </div>

          {/* Top Reviews */}
          {restaurant.topReviews && restaurant.topReviews.length > 0 && (
            <div className="space-y-2">
              <div className="text-label text-pale-ice">TOP REVIEWS</div>
              <div className="space-y-2">
                {restaurant.topReviews.slice(0, 2).map((review, index) => (
                  <div
                    key={index}
                    className="bg-deep-navy bg-opacity-30 rounded-subtle p-md"
                  >
                    <p className="text-body-compact text-pale-ice italic">"{review}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Thanksgiving Special */}
          {restaurant.openThanksgiving && (
            <div className="bg-accent-blue bg-opacity-10 border border-accent-blue border-opacity-30 rounded-subtle p-md">
              <div className="flex items-start gap-2">
                <Icons.Star size={16} className="text-accent-blue flex-shrink-0 mt-1" />
                <div>
                  <p className="text-body text-frost-white font-semibold">Open Thanksgiving!</p>
                  {restaurant.specialThanksgivingMenu && (
                    <p className="text-body-compact text-pale-ice mt-1">Special Thanksgiving menu available</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          {(restaurant.takeout || restaurant.delivery || restaurant.curbside || restaurant.outdoorSeating) && (
            <div className="space-y-2">
              <div className="text-label text-pale-ice">FEATURES</div>
              <div className="flex flex-wrap gap-2">
                {restaurant.takeout && (
                  <span className="px-3 py-1.5 bg-deep-navy bg-opacity-50 text-frost-white rounded-subtle text-body-compact">
                    Takeout
                  </span>
                )}
                {restaurant.delivery && (
                  <span className="px-3 py-1.5 bg-deep-navy bg-opacity-50 text-frost-white rounded-subtle text-body-compact">
                    Delivery
                  </span>
                )}
                {restaurant.curbside && (
                  <span className="px-3 py-1.5 bg-deep-navy bg-opacity-50 text-frost-white rounded-subtle text-body-compact">
                    Curbside Pickup
                  </span>
                )}
                {restaurant.outdoorSeating && (
                  <span className="px-3 py-1.5 bg-deep-navy bg-opacity-50 text-frost-white rounded-subtle text-body-compact">
                    Outdoor Seating
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-deep-navy bg-opacity-95 backdrop-blur-sm p-md md:p-lg border-t border-pale-ice border-opacity-10 space-y-2">
          {(restaurant.website || restaurant.reservationLink) && (
            <Button
              variant="primary"
              onClick={handleOpenWebsite}
              className="w-full"
            >
              <Icons.ExternalLink size={18} />
              {restaurant.reservationLink ? 'Make Reservation' : 'Visit Website'}
            </Button>
          )}

          <div className="grid grid-cols-2 gap-2">
            {restaurant.phone && (
              <Button
                variant="secondary"
                onClick={handleCall}
                className="w-full"
              >
                <Icons.Phone size={18} />
                Call
              </Button>
            )}

            {(restaurant.address || restaurant.coordinates) && (
              <Button
                variant="secondary"
                onClick={handleGetDirections}
                className="w-full"
              >
                <Icons.MapPin size={18} />
                Directions
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
