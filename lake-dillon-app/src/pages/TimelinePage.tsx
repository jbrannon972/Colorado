import React, { useState } from 'react';
import { Layout } from '../components/layout';
import { TimelineDay } from '../components/features/TimelineDay';
import { MealPlanningModal } from '../components/features/MealPlanningModal';
import { Chip } from '../components/ui';
import { initialTimeline } from '../data/timeline';
import type { TimeSlotType, Restaurant } from '../types';

export const TimelinePage: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Default to Saturday (first full activity day)
  const [mealPlanningModal, setMealPlanningModal] = useState<{
    isOpen: boolean;
    date: string;
    slot: TimeSlotType;
  } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleDayChange = (newIndex: number) => {
    if (newIndex === selectedDayIndex) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDayIndex(newIndex);
      setIsTransitioning(false);
    }, 150); // Half the transition duration for snappier feel
  };

  const handleAddActivity = (date: string, slot: TimeSlotType) => {
    // Navigate to activities page with pre-selected date/slot
    window.location.href = `/activities?date=${date}&slot=${slot}`;
  };

  const handleAddMeal = (date: string, slot: TimeSlotType) => {
    setMealPlanningModal({ isOpen: true, date, slot });
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    alert(`Added ${restaurant.name} to your meal plan! (Firebase integration coming soon)`);
    setMealPlanningModal(null);
  };

  const handleAddCustomMeal = (mealName: string, notes: string) => {
    const notesSummary = notes ? ` (${notes.substring(0, 50)}...)` : '';
    alert(`Added custom meal "${mealName}"${notesSummary} to your plan! (Firebase integration coming soon)`);
    setMealPlanningModal(null);
  };

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

        {/* Day Selector */}
        <div className="overflow-x-auto pb-2 -mx-lg px-lg">
          <div className="flex gap-2 min-w-max">
            {initialTimeline.map((day, index) => (
              <Chip
                key={day.date}
                label={`${day.dayName.substring(0, 3)} ${new Date(day.date + 'T12:00:00').getDate()}`}
                selected={selectedDayIndex === index}
                onClick={() => handleDayChange(index)}
              />
            ))}
          </div>
        </div>

        {/* Selected Day Timeline */}
        <div
          className={`transition-smooth ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          style={{ transition: 'opacity 150ms ease' }}
        >
          <TimelineDay
            day={initialTimeline[selectedDayIndex]}
            onAddActivity={handleAddActivity}
            onAddMeal={handleAddMeal}
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
