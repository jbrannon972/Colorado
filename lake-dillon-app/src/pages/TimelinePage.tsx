import React, { useState } from 'react';
import { Layout } from '../components/layout';
import { TimelineDay } from '../components/features/TimelineDay';
import { Chip } from '../components/ui';
import { initialTimeline } from '../data/timeline';
import type { TimeSlotType } from '../types';

export const TimelinePage: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Default to Saturday (first full activity day)

  const handleAddActivity = (date: string, slot: TimeSlotType) => {
    // Navigate to activities page with pre-selected date/slot
    window.location.href = `/activities?date=${date}&slot=${slot}`;
  };

  const handleAddMeal = (date: string, slot: TimeSlotType) => {
    // Navigate to dining page with pre-selected date/slot
    window.location.href = `/dining?date=${date}&slot=${slot}`;
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
                onClick={() => setSelectedDayIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Selected Day Timeline */}
        <TimelineDay
          day={initialTimeline[selectedDayIndex]}
          onAddActivity={handleAddActivity}
          onAddMeal={handleAddMeal}
        />
      </div>
    </Layout>
  );
};
