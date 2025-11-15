import React, { useState } from 'react';
import type { Restaurant, TimeSlotType } from '../../types';
import { Button, Card, Input, Icons, Chip } from '../ui';
import { restaurants } from '../../data/restaurants';
import { RestaurantCard } from './RestaurantCard';

interface MealPlanningModalProps {
  date: string;
  slot: TimeSlotType;
  onClose: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onAddCustomMeal: (mealName: string, notes: string) => void;
}

export const MealPlanningModal: React.FC<MealPlanningModalProps> = ({
  date,
  slot,
  onClose,
  onSelectRestaurant,
  onAddCustomMeal,
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'custom'>('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTown, setSelectedTown] = useState<string>('All');
  const [customMealName, setCustomMealName] = useState('');
  const [customMealNotes, setCustomMealNotes] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 250); // Match animation duration
  };

  const towns = ['All', 'Breckenridge', 'Silverthorne', 'Frisco', 'Keystone', 'Dillon', 'Idaho Springs'];

  // Filter restaurants by meal type based on time slot
  const getMealTypeFilter = () => {
    if (slot === 'morning') return (r: Restaurant) => r.servesBreakfast;
    if (slot === 'afternoon') return (r: Restaurant) => r.servesLunch;
    if (slot === 'evening') return (r: Restaurant) => r.servesDinner;
    return () => true;
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Meal type filter
    if (!getMealTypeFilter()(restaurant)) return false;

    // Search filter
    if (searchTerm && !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }

    // Town filter
    if (selectedTown !== 'All' && restaurant.town !== selectedTown) {
      return false;
    }

    return true;
  });

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    onSelectRestaurant(restaurant);
    handleClose();
  };

  const handleCustomMealSubmit = () => {
    if (!customMealName.trim()) return;
    onAddCustomMeal(customMealName, customMealNotes);
    handleClose();
  };

  const getMealTimeLabel = () => {
    if (slot === 'morning') return 'Breakfast';
    if (slot === 'afternoon') return 'Lunch';
    if (slot === 'evening') return 'Dinner';
    return 'Meal';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-deep-navy backdrop-blur-sm transition-menu ${
          isClosing ? 'bg-opacity-0' : 'bg-opacity-70'
        }`}
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
      <div
        className="bottom-sheet w-full max-w-2xl gpu-accelerated"
        style={{
          animation: isClosing
            ? 'slideDown 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            : 'slideUp 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {/* Handle */}
        <div className="bottom-sheet-handle" />
        {/* Header */}
        <div className="p-lg border-b border-pale-ice border-opacity-20">
          <div className="flex items-center justify-between mb-sm">
            <h2 className="text-h1 text-frost-white">Plan {getMealTimeLabel()}</h2>
            <button
              onClick={handleClose}
              className="text-pale-ice hover:text-frost-white transition-colors touch-opacity"
            >
              <Icons.X size={24} />
            </button>
          </div>
          <p className="text-body text-pale-ice">
            {new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-lg border-b border-pale-ice border-opacity-20">
          <Button
            variant={activeTab === 'browse' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('browse')}
          >
            <Icons.Search size={16} />
            Browse Restaurants
          </Button>
          <Button
            variant={activeTab === 'custom' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('custom')}
          >
            <Icons.Plus size={16} />
            Custom Meal
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-lg">
          {activeTab === 'browse' ? (
            <div className="space-y-md">
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

              {/* Results Count */}
              <div className="text-body text-pale-ice">
                {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} serving {getMealTimeLabel().toLowerCase()}
              </div>

              {/* Restaurants List */}
              <div className="space-y-md">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onAddToDay={handleRestaurantSelect}
                    onViewMenu={(r) => {
                      if (r.website) window.open(r.website, '_blank');
                    }}
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
          ) : (
            <div className="space-y-md">
              <Card className="space-y-md">
                <div>
                  <label className="block text-label text-pale-ice mb-xs">
                    Meal Name
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Cook at cabin, Groceries, Leftovers"
                    value={customMealName}
                    onChange={(e) => setCustomMealName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-label text-pale-ice mb-xs">
                    Notes (Optional)
                  </label>
                  <textarea
                    className="w-full bg-deep-navy text-frost-white rounded-subtle p-sm text-body min-h-[100px] border border-pale-ice border-opacity-20 focus:border-accent-blue focus:outline-none"
                    placeholder="Meal details, ingredients needed, recipes, etc."
                    value={customMealNotes}
                    onChange={(e) => setCustomMealNotes(e.target.value)}
                  />
                </div>
              </Card>

              <div className="bg-info-slate bg-opacity-10 border border-info-slate border-opacity-30 rounded-subtle p-md">
                <p className="text-body-compact text-pale-ice">
                  <strong>Quick ideas:</strong> Cook at cabin, Order takeout, Pack sandwiches,
                  Groceries from City Market, Leftovers, Snacks only
                </p>
              </div>

              <Button
                variant="primary"
                onClick={handleCustomMealSubmit}
                disabled={!customMealName.trim()}
                className="w-full"
              >
                Add Custom Meal
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
