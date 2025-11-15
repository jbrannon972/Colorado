import React from 'react';
import type { Restaurant } from '../../types';
import { Card, Button, Icons, AddressLink } from '../ui';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onAddToDay?: (restaurant: Restaurant) => void;
  onViewMenu?: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onAddToDay,
  onViewMenu,
}) => {
  return (
    <Card className="space-y-sm">
      {/* Header */}
      <div>
        <h3 className="text-h3 text-frost-white">{restaurant.name}</h3>
        <p className="text-label text-pale-ice mt-1">
          {restaurant.cuisine.join(' • ')} • {restaurant.town}
        </p>
      </div>

      {/* Location & Contact */}
      <div className="space-y-1 text-body-compact text-pale-ice">
        <div className="flex items-center gap-2">
          <Icons.MapPin size={16} className="text-pale-ice" />
          <span>{restaurant.driveTimeFromSpinnaker} min drive from Spinnaker</span>
        </div>

        {/* Address (Google Maps Link) */}
        {restaurant.address && (
          <AddressLink
            address={restaurant.address}
            coordinates={restaurant.coordinates}
            name={restaurant.name}
            className="text-pale-ice"
          />
        )}

        {/* Phone */}
        {restaurant.phone && (
          <button
            onClick={() => window.open(`tel:${restaurant.phone}`, '_self')}
            className="flex items-start gap-2 text-left transition-smooth hover:text-accent-blue"
          >
            <Icons.Phone size={14} className="mt-0.5 flex-shrink-0" />
            <span className="text-body-compact underline">{restaurant.phone}</span>
          </button>
        )}

        {/* Website */}
        {restaurant.website && (
          <button
            onClick={() => window.open(restaurant.website, '_blank', 'noopener,noreferrer')}
            className="flex items-start gap-2 text-left transition-smooth hover:text-accent-blue"
          >
            <Icons.ExternalLink size={14} className="mt-0.5 flex-shrink-0" />
            <span className="text-body-compact underline">Visit Website</span>
          </button>
        )}
      </div>

      {/* Pricing */}
      {restaurant.pricePerPerson && (
        <div className="flex items-center gap-2 text-body-compact text-pale-ice">
          <Icons.DollarSign size={16} className="text-pale-ice" />
          <span>
            ${restaurant.pricePerPerson.min}-${restaurant.pricePerPerson.max} per person
          </span>
          {restaurant.totalForFamilyOf5 && (
            <span className="text-label opacity-70">
              (~${restaurant.totalForFamilyOf5} for 5)
            </span>
          )}
        </div>
      )}

      {/* Meal Times */}
      <div className="flex gap-2 text-label">
        {restaurant.servesBreakfast && (
          <span className="bg-pale-ice bg-opacity-15 text-pale-ice px-2 py-1 rounded-subtle">
            Breakfast
          </span>
        )}
        {restaurant.servesLunch && (
          <span className="bg-pale-ice bg-opacity-15 text-pale-ice px-2 py-1 rounded-subtle">
            Lunch
          </span>
        )}
        {restaurant.servesDinner && (
          <span className="bg-pale-ice bg-opacity-15 text-pale-ice px-2 py-1 rounded-subtle">
            Dinner
          </span>
        )}
      </div>

      {/* Family Suitability */}
      <div className="flex items-center gap-3 text-body-compact">
        <div className="flex items-center gap-1">
          <Icons.Baby size={16} className={restaurant.toddlerFriendly ? 'text-success-teal' : 'text-error-rose'} />
          <span className={restaurant.toddlerFriendly ? 'text-success-teal' : 'text-error-rose'}>
            {restaurant.toddlerFriendly ? 'Family-friendly' : 'Adults preferred'}
          </span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 text-body-compact text-pale-ice">
        <Icons.Star size={16} className="text-accent-blue fill-accent-blue" />
        <span>{restaurant.rating}/5</span>
        <span className="text-pale-ice opacity-70">({restaurant.reviewCount} reviews)</span>
      </div>

      {/* Thanksgiving Special */}
      {restaurant.openThanksgiving && (
        <div className="flex items-center gap-2 text-label text-success-teal bg-success-teal bg-opacity-10 px-2 py-1 rounded-subtle">
          <Icons.Check size={14} />
          <span>Open Thanksgiving{restaurant.specialThanksgivingMenu ? ' - Special Menu Available' : ''}</span>
        </div>
      )}

      {/* Actions */}
      {(onViewMenu || onAddToDay) && (
        <div className="flex gap-2 pt-xs">
          {onViewMenu && (
            <Button variant="secondary" onClick={() => onViewMenu(restaurant)}>
              Menu
            </Button>
          )}
          {onAddToDay && (
            <Button variant="primary" onClick={() => onAddToDay(restaurant)}>
              <Icons.Plus size={16} />
              Add to Day
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};
