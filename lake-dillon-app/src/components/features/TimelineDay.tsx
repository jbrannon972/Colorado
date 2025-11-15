import React from 'react';
import type { DayTimeline, TimeSlotType } from '../../types';
import { Card, Button, Icons } from '../ui';

interface TimelineDayProps {
  day: DayTimeline;
  onAddActivity?: (date: string, slot: TimeSlotType) => void;
  onAddMeal?: (date: string, slot: TimeSlotType) => void;
}

export const TimelineDay: React.FC<TimelineDayProps> = ({
  day,
  onAddActivity,
  onAddMeal,
}) => {
  const renderTimeSlot = (slotType: TimeSlotType, slotName: string) => {
    const slot = day.timeSlots[slotType];
    const isLocked = !slot.isEmpty && (day.tripPhase === 'ARRIVAL_DAY' || day.tripPhase === 'DEPARTURE_DAY');

    return (
      <Card key={slotType} className="space-y-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-h2 text-frost-white uppercase">{slotName}</h3>
          <span className="text-body-compact text-pale-ice">{slot.startTime}</span>
        </div>

        {isLocked && (
          <div className="text-body-compact text-info-slate">
            {day.tripPhase === 'ARRIVAL_DAY' && slotType === 'morning' && (
              <p>Drive continues - Night driving leg</p>
            )}
            {day.tripPhase === 'ARRIVAL_DAY' && slotType === 'afternoon' && (
              <p>Arrival & Check-in at Spinnaker (1:00 PM)</p>
            )}
            {day.tripPhase === 'DEPARTURE_DAY' && (
              <p>Packing & Departure - Drive home to Houston</p>
            )}
          </div>
        )}

        {!isLocked && slot.isEmpty && (
          <div className="space-y-sm">
            <p className="text-body-compact text-pale-ice opacity-70">
              No activities planned
            </p>
            {onAddActivity && onAddMeal && (
              <div className="flex gap-2">
                <Button
                  variant="compact"
                  onClick={() => onAddActivity(day.date, slotType)}
                  className="flex-1"
                >
                  <Icons.Plus size={14} />
                  Add Activity
                </Button>
                <Button
                  variant="compact"
                  onClick={() => onAddMeal(day.date, slotType)}
                  className="flex-1"
                >
                  <Icons.Plus size={14} />
                  Add Meal
                </Button>
              </div>
            )}
          </div>
        )}

        {!isLocked && !slot.isEmpty && (
          <div className="space-y-2">
            {slot.activities.length > 0 && (
              <div className="space-y-1">
                {slot.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="text-body text-frost-white bg-deep-navy bg-opacity-50 p-2 rounded-subtle"
                  >
                    Activity: {activity.activityId}
                  </div>
                ))}
              </div>
            )}
            {slot.meals.length > 0 && (
              <div className="space-y-1">
                {slot.meals.map((meal) => (
                  <div
                    key={meal.id}
                    className="text-body text-frost-white bg-deep-navy bg-opacity-50 p-2 rounded-subtle"
                  >
                    Meal: {meal.type}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-lg">
      {/* Day Header */}
      <div className="space-y-xs">
        <h2 className="text-h1 text-frost-white">
          {day.dayName.toUpperCase()}, {new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </h2>
        {day.notes && (
          <p className="text-body text-pale-ice">{day.notes}</p>
        )}
        {day.isThanksgivingDay && (
          <div className="bg-accent-blue bg-opacity-10 border border-accent-blue border-opacity-30 rounded-subtle p-md">
            <div className="flex items-center gap-2 text-accent-blue">
              <Icons.Star size={20} className="fill-accent-blue" />
              <span className="text-h3">Thanksgiving Day</span>
            </div>
          </div>
        )}
      </div>

      {/* Time Slots */}
      <div className="space-y-md">
        {renderTimeSlot('morning', 'Morning')}
        {renderTimeSlot('afternoon', 'Afternoon')}
        {renderTimeSlot('evening', 'Evening')}
      </div>

      {/* Thanksgiving Special Section */}
      {day.isThanksgivingDay && day.thanksgivingMeal && (
        <Card className="space-y-sm bg-icy-blue border-accent-blue border-opacity-40">
          <h3 className="text-h2 text-accent-blue">Thanksgiving Dinner</h3>
          <div className="text-body text-pale-ice">
            <p>Time: {day.thanksgivingMeal.time}</p>
            <p>Location: {day.thanksgivingMeal.location === 'tbd' ? 'To be decided' : day.thanksgivingMeal.location}</p>
            {day.thanksgivingMeal.location === 'tbd' && (
              <div className="flex gap-2 mt-md">
                <Button variant="secondary">
                  <Icons.Utensils size={16} />
                  Browse Restaurants
                </Button>
                <Button variant="secondary">
                  <Icons.Home size={16} />
                  Cook at Cabin
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
