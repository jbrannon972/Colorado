import React, { useState } from 'react';
import { Icons, Button } from '../ui';
import { initialTimeline } from '../../data/timeline';
import type { Restaurant, TimeSlotType, MealType } from '../../types';

interface RestaurantSelectionModalProps {
  restaurant: Restaurant;
  onClose: () => void;
  onConfirm: (date: string, slot: TimeSlotType, mealType: MealType) => void;
}

export const RestaurantSelectionModal: React.FC<RestaurantSelectionModalProps> = ({
  restaurant,
  onClose,
  onConfirm,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotType | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);

  // Filter to only full activity days
  const availableDays = initialTimeline.filter(
    (day) => day.tripPhase === 'FULL_ACTIVITY_DAY' || day.tripPhase === 'THANKSGIVING_DAY'
  );

  const mealOptions: { value: MealType; label: string; slot: TimeSlotType }[] = [
    { value: 'breakfast', label: 'Breakfast', slot: 'morning' },
    { value: 'lunch', label: 'Lunch', slot: 'afternoon' },
    { value: 'dinner', label: 'Dinner', slot: 'evening' },
  ];

  const availableMeals = mealOptions.filter((meal) => {
    if (meal.value === 'breakfast') return restaurant.servesBreakfast;
    if (meal.value === 'lunch') return restaurant.servesLunch;
    if (meal.value === 'dinner') return restaurant.servesDinner;
    return false;
  });

  const handleMealSelect = (mealType: MealType, slot: TimeSlotType) => {
    setSelectedMealType(mealType);
    setSelectedSlot(slot);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedSlot && selectedMealType) {
      onConfirm(selectedDate, selectedSlot, selectedMealType);
    }
  };

  return (
    <div className="fixed inset-0 z-[100]" style={{ position: 'fixed' }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-deep-navy bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-md">
        <div
          className="bg-gradient-to-b from-icy-blue to-deep-navy rounded-subtle border border-pale-ice border-opacity-10 shadow-2xl max-w-md w-full"
          style={{ maxHeight: '90vh', overflowY: 'auto' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-md border-b border-pale-ice border-opacity-10">
            <div className="flex-1">
              <h3 className="text-h3 text-frost-white">Add to Meal Plan</h3>
              <p className="text-body-compact text-pale-ice mt-1">{restaurant.name}</p>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 touch-opacity"
            >
              <Icons.X size={20} className="text-frost-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-md space-y-lg">
            {/* Select Meal Type */}
            <div>
              <label className="text-label text-pale-ice mb-2 block">SELECT MEAL</label>
              <div className="space-y-2">
                {availableMeals.map((meal) => (
                  <button
                    key={meal.value}
                    onClick={() => handleMealSelect(meal.value, meal.slot)}
                    className={`w-full p-3 rounded-subtle border transition-smooth text-left ${
                      selectedMealType === meal.value
                        ? 'border-accent-blue bg-accent-blue bg-opacity-10'
                        : 'border-pale-ice border-opacity-10 bg-icy-blue bg-opacity-30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-body text-frost-white font-semibold">{meal.label}</p>
                        <p className="text-body-compact text-pale-ice">
                          {meal.slot.charAt(0).toUpperCase() + meal.slot.slice(1)}
                        </p>
                      </div>
                      {selectedMealType === meal.value && (
                        <Icons.CheckCircle size={20} className="text-accent-blue" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {availableMeals.length === 0 && (
                <p className="text-body-compact text-error-rose">
                  This restaurant doesn't serve any meals we have scheduled.
                </p>
              )}
            </div>

            {/* Select Day */}
            {selectedMealType && (
              <div>
                <label className="text-label text-pale-ice mb-2 block">SELECT DAY</label>
                <div className="space-y-2">
                  {availableDays.map((day) => (
                    <button
                      key={day.date}
                      onClick={() => setSelectedDate(day.date)}
                      className={`w-full p-3 rounded-subtle border transition-smooth text-left ${
                        selectedDate === day.date
                          ? 'border-accent-blue bg-accent-blue bg-opacity-10'
                          : 'border-pale-ice border-opacity-10 bg-icy-blue bg-opacity-30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body text-frost-white font-semibold">{day.dayName}</p>
                          <p className="text-body-compact text-pale-ice">
                            {new Date(day.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        {selectedDate === day.date && (
                          <Icons.CheckCircle size={20} className="text-accent-blue" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Restaurant Info */}
            <div className="p-3 bg-deep-navy bg-opacity-30 rounded-subtle space-y-2">
              <div className="flex items-start gap-2 text-body-compact text-pale-ice">
                <Icons.MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>{restaurant.driveTimeFromSpinnaker} min drive • {restaurant.town}</span>
              </div>
              {restaurant.phone && (
                <div className="flex items-start gap-2 text-body-compact text-pale-ice">
                  <Icons.Phone size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{restaurant.phone}</span>
                </div>
              )}
              {restaurant.totalForFamilyOf5 && (
                <div className="flex items-start gap-2 text-body-compact text-pale-ice">
                  <Icons.DollarSign size={14} className="mt-0.5 flex-shrink-0" />
                  <span>~${restaurant.totalForFamilyOf5} for family of 5</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-md border-t border-pale-ice border-opacity-10 flex gap-2">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedSlot || !selectedMealType}
              className="flex-1"
            >
              Add to Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
