import React, { useState } from 'react';
import { Layout } from '../components/layout';
import { TimelineDay } from '../components/features/TimelineDay';
import { MealPlanningModal } from '../components/features/MealPlanningModal';
import { DatePicker, Icons } from '../components/ui';
import { useTimeline } from '../hooks/useTimeline';
import type { TimeSlotType, Restaurant, MealType } from '../types';

export const TimelinePage: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Default to Saturday (first full activity day)
  const [mealPlanningModal, setMealPlanningModal] = useState<{
    isOpen: boolean;
    date: string;
    slot: TimeSlotType;
  } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    timeline,
    loading,
    addMealToTimeline,
    removeActivity,
    removeMeal,
    addPhotoToActivity,
    addPhotoToMeal,
    removePhotoFromActivity,
    removePhotoFromMeal,
  } = useTimeline();

  const handleDayChange = (newIndex: number) => {
    if (newIndex === selectedDayIndex) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDayIndex(newIndex);
      setIsTransitioning(false);
    }, 150); // Half the transition duration for snappier feel
  };

  const handleAddActivity = () => {
    // Navigate to activities page
    window.location.href = '/activities';
  };

  const handleAddMeal = (date: string, slot: TimeSlotType) => {
    setMealPlanningModal({ isOpen: true, date, slot });
  };

  const handleSelectRestaurant = async (restaurant: Restaurant) => {
    if (!mealPlanningModal) return;

    // Determine meal type based on time slot
    const mealType: MealType =
      mealPlanningModal.slot === 'morning' ? 'breakfast' :
      mealPlanningModal.slot === 'afternoon' ? 'lunch' : 'dinner';

    const success = await addMealToTimeline(
      mealPlanningModal.date,
      mealPlanningModal.slot,
      {
        type: mealType,
        restaurantId: restaurant.id,
        participants: [], // Can be set later
      }
    );

    if (success) {
      alert(`✅ Added ${restaurant.name} to your meal plan!`);
      setMealPlanningModal(null);
    } else {
      alert('Failed to add meal. Please try again.');
    }
  };

  const handleAddCustomMeal = async (mealName: string, notes: string) => {
    if (!mealPlanningModal) return;

    // Determine meal type based on time slot
    const mealType: MealType =
      mealPlanningModal.slot === 'morning' ? 'breakfast' :
      mealPlanningModal.slot === 'afternoon' ? 'lunch' : 'dinner';

    const success = await addMealToTimeline(
      mealPlanningModal.date,
      mealPlanningModal.slot,
      {
        type: mealType,
        customMeal: {
          whatWereEating: mealName,
          notes,
        },
        participants: [],
      }
    );

    if (success) {
      alert(`✅ Added custom meal "${mealName}" to your plan!`);
      setMealPlanningModal(null);
    } else {
      alert('Failed to add meal. Please try again.');
    }
  };

  if (loading) {
    return (
      <Layout title="Timeline">
        <div className="flex items-center justify-center py-xl">
          <div className="text-center">
            <Icons.Clock size={48} className="text-accent-blue mx-auto mb-4 animate-pulse" />
            <p className="text-body text-pale-ice">Loading your timeline...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Timeline">
      <div className="space-y-lg">
        {/* Trip Title */}
        <div>
          <h1 className="text-h1 text-frost-white">Lake Dillon Thanksgiving 2025</h1>
          <p className="text-body text-pale-ice mt-2">
            November 20-28, 2025 • 8-day trip
          </p>
        </div>

        {/* Date Selector */}
        <DatePicker
          dates={timeline.map((day) => ({ date: day.date, dayName: day.dayName }))}
          selectedIndex={selectedDayIndex}
          onSelectDate={handleDayChange}
        />

        {/* Selected Day Timeline */}
        <div
          className={`transition-smooth ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          style={{ transition: 'opacity 150ms ease' }}
        >
          <TimelineDay
            day={timeline[selectedDayIndex]}
            onAddActivity={handleAddActivity}
            onAddMeal={handleAddMeal}
            onRemoveActivity={removeActivity}
            onRemoveMeal={removeMeal}
            onAddPhotoToActivity={addPhotoToActivity}
            onAddPhotoToMeal={addPhotoToMeal}
            onRemovePhotoFromActivity={removePhotoFromActivity}
            onRemovePhotoFromMeal={removePhotoFromMeal}
          />
        </div>

        {/* Meal Planning Modal */}
        {mealPlanningModal?.isOpen && (
          <MealPlanningModal
            date={mealPlanningModal.date}
            slot={mealPlanningModal.slot}
            onClose={() => setMealPlanningModal(null)}
            onSelectRestaurant={handleSelectRestaurant}
            onAddCustomMeal={handleAddCustomMeal}
          />
        )}
      </div>
    </Layout>
  );
};
