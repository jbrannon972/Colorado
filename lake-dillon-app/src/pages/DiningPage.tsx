import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { RestaurantCard } from '../components/features/RestaurantCard';
import { RestaurantSelectionModal } from '../components/features/RestaurantSelectionModal';
import { Input, Chip, Icons } from '../components/ui';
import { restaurants } from '../data/restaurants';
import { useTimeline } from '../hooks/useTimeline';
import type { Restaurant, TimeSlotType, MealType } from '../types';

export const DiningPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTown, setSelectedTown] = useState<string>('All');
  const [selectedMealType, setSelectedMealType] = useState<string>('All');
  const [toddlerFriendlyOnly, setToddlerFriendlyOnly] = useState(false);
  const [thanksgivingOnly, setThanksgivingOnly] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const { addMealToTimeline } = useTimeline();
  const navigate = useNavigate();

  const towns = ['All', 'Breckenridge', 'Silverthorne', 'Frisco', 'Keystone', 'Dillon', 'Idaho Springs'];
  const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner'];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Search filter
    if (searchTerm && !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }

    // Town filter
    if (selectedTown !== 'All' && restaurant.town !== selectedTown) {
      return false;
    }

    // Meal type filter
    if (selectedMealType !== 'All') {
      if (selectedMealType === 'Breakfast' && !restaurant.servesBreakfast) return false;
      if (selectedMealType === 'Lunch' && !restaurant.servesLunch) return false;
      if (selectedMealType === 'Dinner' && !restaurant.servesDinner) return false;
    }

    // Toddler friendly filter
    if (toddlerFriendlyOnly && !restaurant.toddlerFriendly) {
      return false;
    }

    // Thanksgiving filter
    if (thanksgivingOnly && !restaurant.openThanksgiving) {
      return false;
    }

    return true;
  });

  const handleAddToDay = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleConfirmAddToTimeline = async (
    date: string,
    slot: TimeSlotType,
    mealType: MealType
  ) => {
    if (selectedRestaurant) {
      const success = await addMealToTimeline(date, slot, {
        type: mealType,
        restaurantId: selectedRestaurant.id,
        participants: [],
      });

      if (success) {
        setSelectedRestaurant(null);
        alert(`✅ Added "${selectedRestaurant.name}" to your meal plan!`);
        navigate('/');
      } else {
        alert('Failed to add restaurant. Please try again.');
      }
    }
  };

  const handleViewMenu = (restaurant: Restaurant) => {
    if (restaurant.website) {
      window.open(restaurant.website, '_blank');
    } else {
      alert(`Menu for "${restaurant.name}" - visit in person or call ${restaurant.phone || 'for details'}`);
    }
  };

  return (
    <Layout title="Dining">
      <div className="space-y-lg">
        {/* Search */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Icons.Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-pale-ice"
          />
        </div>

        {/* Town Filters */}
        <div className="overflow-x-auto pb-2 -mx-lg px-lg">
          <div className="flex gap-2 min-w-max">
            {towns.map((town) => (
              <Chip
                key={town}
                label={town}
                selected={selectedTown === town}
                onClick={() => setSelectedTown(town)}
              />
            ))}
          </div>
        </div>

        {/* Meal Type Filters */}
        <div className="flex gap-2 flex-wrap">
          {mealTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              selected={selectedMealType === type}
              onClick={() => setSelectedMealType(type)}
            />
          ))}
        </div>

        {/* Family & Special Filters */}
        <div className="flex gap-2 flex-wrap">
          <Chip
            label="Family-friendly"
            selected={toddlerFriendlyOnly}
            onClick={() => setToddlerFriendlyOnly(!toddlerFriendlyOnly)}
            icon={<Icons.Baby size={14} />}
          />
          <Chip
            label="Open Thanksgiving"
            selected={thanksgivingOnly}
            onClick={() => setThanksgivingOnly(!thanksgivingOnly)}
            icon={<Icons.Star size={14} />}
          />
        </div>

        {/* Results Count */}
        <div className="text-body text-pale-ice">
          {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} found
        </div>

        {/* Restaurants List */}
        <div className="space-y-md">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onAddToDay={handleAddToDay}
              onViewMenu={handleViewMenu}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-xl text-pale-ice">
            <p className="text-h3 mb-2">No restaurants found</p>
            <p className="text-body">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Restaurant Selection Modal */}
      {selectedRestaurant && (
        <RestaurantSelectionModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onConfirm={handleConfirmAddToTimeline}
        />
      )}
    </Layout>
  );
};
