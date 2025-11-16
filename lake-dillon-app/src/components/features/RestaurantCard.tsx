import React from 'react';
import type { Restaurant } from '../../types';
import { Button, Icons } from '../ui';

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
    <div className="list-item">
      <div className="flex items-start gap-3">
        {/* Main Content - Tappable for Menu */}
        <div
          className="flex-1 space-y-2 cursor-pointer"
          onClick={() => onViewMenu && onViewMenu(restaurant)}
        >
          {/* Title */}
          <h3 className="text-h3 text-frost-white">{restaurant.name}</h3>

          {/* Cuisine */}
          <p className="text-metadata">
            {restaurant.cuisine.join(' • ')}
          </p>

          {/* Metadata Row */}
          <div className="flex items-center gap-4 text-metadata flex-wrap">
            <div className="flex items-center gap-1">
              <Icons.MapPin size={14} className="text-pale-ice" />
              <span>{restaurant.driveTimeFromSpinnaker} min</span>
            </div>
            {restaurant.pricePerPerson && (
              <div className="flex items-center gap-1">
                <Icons.DollarSign size={14} className="text-pale-ice" />
                <span>${restaurant.pricePerPerson.min}-${restaurant.pricePerPerson.max}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Icons.Star size={14} className="text-accent-blue" />
              <span>{restaurant.rating}/5</span>
            </div>
          </div>

          {/* Meal Times */}
          <div className="flex gap-2 text-metadata">
            {restaurant.servesBreakfast && <span>Breakfast</span>}
            {restaurant.servesLunch && <span>Lunch</span>}
            {restaurant.servesDinner && <span>Dinner</span>}
          </div>

          {/* Family Friendly */}
          {restaurant.toddlerFriendly && (
            <div className="flex items-center gap-1 text-metadata text-success-teal">
              <Icons.Baby size={14} />
              <span>Family-friendly</span>
            </div>
          )}
        </div>

        {/* Add Button */}
        {onAddToDay && (
          <Button
            variant="icon"
            onClick={(e) => {
              e.stopPropagation();
              onAddToDay(restaurant);
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
