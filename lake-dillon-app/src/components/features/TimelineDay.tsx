import React, { useState, useEffect } from 'react';
import type { DayTimeline, TimeSlotType } from '../../types';
import type { DragEndEvent } from '@dnd-kit/core';
import { Card, Button, Icons, Toast } from '../ui';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableTimelineItem } from './SortableTimelineItem';

interface TimelineDayProps {
  day: DayTimeline;
  onAddActivity?: (date: string, slot: TimeSlotType) => void;
  onAddMeal?: (date: string, slot: TimeSlotType) => void;
  onReorderActivities?: (date: string, slot: TimeSlotType, newOrder: string[]) => void;
  onRemoveActivity?: (date: string, slot: TimeSlotType, activityId: string) => void;
  onRemoveMeal?: (date: string, slot: TimeSlotType, mealId: string) => void;
  onAddPhotoToActivity?: (date: string, slot: TimeSlotType, activityId: string, photoUrl: string) => void;
  onAddPhotoToMeal?: (date: string, slot: TimeSlotType, mealId: string, photoUrl: string) => void;
  onRemovePhotoFromActivity?: (date: string, slot: TimeSlotType, activityId: string, photoUrl: string) => void;
  onRemovePhotoFromMeal?: (date: string, slot: TimeSlotType, mealId: string, photoUrl: string) => void;
}

interface DeletedItem {
  type: 'activity' | 'meal';
  id: string;
  slotType: TimeSlotType;
  data: any;
}

export const TimelineDay: React.FC<TimelineDayProps> = ({
  day,
  onAddActivity,
  onAddMeal,
  onReorderActivities,
  onRemoveActivity,
  onRemoveMeal,
  onAddPhotoToActivity,
  onAddPhotoToMeal,
  onRemovePhotoFromActivity,
  onRemovePhotoFromMeal,
}) => {
  const [localDay, setLocalDay] = useState(day);
  const [deletedItem, setDeletedItem] = useState<DeletedItem | null>(null);

  // Sync local state when parent day prop changes
  useEffect(() => {
    setLocalDay(day);
  }, [day]);

  const handleDeleteActivity = (slotType: TimeSlotType, activityId: string) => {
    const slot = localDay.timeSlots[slotType];
    const activityIndex = slot.activities.findIndex((a) => a.id === activityId);
    if (activityIndex === -1) return;

    const activity = slot.activities[activityIndex];

    // Store deleted item for undo
    setDeletedItem({
      type: 'activity',
      id: activityId,
      slotType,
      data: activity,
    });

    // Remove from local state
    const newActivities = slot.activities.filter((a) => a.id !== activityId);
    setLocalDay({
      ...localDay,
      timeSlots: {
        ...localDay.timeSlots,
        [slotType]: {
          ...slot,
          activities: newActivities,
        },
      },
    });

    // Call parent handler if provided
    if (onRemoveActivity) {
      onRemoveActivity(day.date, slotType, activityId);
    }
  };

  const handleDeleteMeal = (slotType: TimeSlotType, mealId: string) => {
    const slot = localDay.timeSlots[slotType];
    const mealIndex = slot.meals.findIndex((m) => m.id === mealId);
    if (mealIndex === -1) return;

    const meal = slot.meals[mealIndex];

    // Store deleted item for undo
    setDeletedItem({
      type: 'meal',
      id: mealId,
      slotType,
      data: meal,
    });

    // Remove from local state
    const newMeals = slot.meals.filter((m) => m.id !== mealId);
    setLocalDay({
      ...localDay,
      timeSlots: {
        ...localDay.timeSlots,
        [slotType]: {
          ...slot,
          meals: newMeals,
        },
      },
    });

    // Call parent handler if provided
    if (onRemoveMeal) {
      onRemoveMeal(day.date, slotType, mealId);
    }
  };

  const handleUndo = () => {
    if (!deletedItem) return;

    const slot = localDay.timeSlots[deletedItem.slotType];

    if (deletedItem.type === 'activity') {
      setLocalDay({
        ...localDay,
        timeSlots: {
          ...localDay.timeSlots,
          [deletedItem.slotType]: {
            ...slot,
            activities: [...slot.activities, deletedItem.data],
          },
        },
      });
    } else {
      setLocalDay({
        ...localDay,
        timeSlots: {
          ...localDay.timeSlots,
          [deletedItem.slotType]: {
            ...slot,
            meals: [...slot.meals, deletedItem.data],
          },
        },
      });
    }

    setDeletedItem(null);
  };

  const handleDragEnd = (event: DragEndEvent, slotType: TimeSlotType) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const slot = localDay.timeSlots[slotType];
    const oldIndex = slot.activities.findIndex((a) => a.id === active.id);
    const newIndex = slot.activities.findIndex((a) => a.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newActivities = arrayMove(slot.activities, oldIndex, newIndex);

      setLocalDay({
        ...localDay,
        timeSlots: {
          ...localDay.timeSlots,
          [slotType]: {
            ...slot,
            activities: newActivities,
          },
        },
      });

      if (onReorderActivities) {
        onReorderActivities(day.date, slotType, newActivities.map((a) => a.id));
      }
    }
  };

  const renderTimeSlot = (slotType: TimeSlotType, slotName: string) => {
    const slot = localDay.timeSlots[slotType];
    const isSlotEmpty = slot.activities.length === 0 && slot.meals.length === 0;
    const isLocked = !isSlotEmpty && (localDay.tripPhase === 'ARRIVAL_DAY' || localDay.tripPhase === 'DEPARTURE_DAY');

    return (
      <Card key={slotType} className="space-y-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-h2 text-frost-white uppercase">{slotName}</h3>
          <span className="text-body-compact text-pale-ice">{slot.startTime}</span>
        </div>

        {isLocked && (
          <div className="text-body-compact text-info-slate">
            {localDay.tripPhase === 'ARRIVAL_DAY' && slotType === 'morning' && (
              <p>Drive continues - Night driving leg</p>
            )}
            {localDay.tripPhase === 'ARRIVAL_DAY' && slotType === 'afternoon' && (
              <p>Arrival & Check-in at Spinnaker (1:00 PM)</p>
            )}
            {localDay.tripPhase === 'DEPARTURE_DAY' && (
              <p>Packing & Departure - Drive home to Houston</p>
            )}
          </div>
        )}

        {!isLocked && isSlotEmpty && (
          <div className="space-y-sm">
            <p className="text-body-compact text-pale-ice opacity-70">
              No activities planned
            </p>
            {onAddActivity && onAddMeal && (
              <div className="flex gap-2">
                <Button
                  variant="compact"
                  onClick={() => onAddActivity(localDay.date, slotType)}
                  className="flex-1"
                >
                  <Icons.Plus size={14} />
                  Add Activity
                </Button>
                <Button
                  variant="compact"
                  onClick={() => onAddMeal(localDay.date, slotType)}
                  className="flex-1"
                >
                  <Icons.Plus size={14} />
                  Add Meal
                </Button>
              </div>
            )}
          </div>
        )}

        {!isLocked && !isSlotEmpty && (
          <div className="space-y-2">
            {slot.activities.length > 0 && (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={(event) => handleDragEnd(event, slotType)}
              >
                <SortableContext
                  items={slot.activities.map((a) => a.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-1">
                    {slot.activities.map((activity) => (
                      <SortableTimelineItem
                        key={activity.id}
                        id={activity.id}
                        onDelete={() => handleDeleteActivity(slotType, activity.id)}
                        photos={activity.photos}
                        onPhotoUploaded={
                          onAddPhotoToActivity
                            ? (photoUrl) => onAddPhotoToActivity(day.date, slotType, activity.id, photoUrl)
                            : undefined
                        }
                        onDeletePhoto={
                          onRemovePhotoFromActivity
                            ? (photoUrl) => onRemovePhotoFromActivity(day.date, slotType, activity.id, photoUrl)
                            : undefined
                        }
                      >
                        Activity: {activity.activityId}
                      </SortableTimelineItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
            {slot.meals.length > 0 && (
              <div className="space-y-1">
                {slot.meals.map((meal) => (
                  <SortableTimelineItem
                    key={meal.id}
                    id={meal.id}
                    onDelete={() => handleDeleteMeal(slotType, meal.id)}
                    photos={meal.photos}
                    onPhotoUploaded={
                      onAddPhotoToMeal
                        ? (photoUrl) => onAddPhotoToMeal(day.date, slotType, meal.id, photoUrl)
                        : undefined
                    }
                    onDeletePhoto={
                      onRemovePhotoFromMeal
                        ? (photoUrl) => onRemovePhotoFromMeal(day.date, slotType, meal.id, photoUrl)
                        : undefined
                    }
                  >
                    Meal: {meal.type}
                  </SortableTimelineItem>
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

      {/* Undo Toast */}
      {deletedItem && (
        <Toast
          message={`${deletedItem.type === 'activity' ? 'Activity' : 'Meal'} removed`}
          action={{
            label: 'UNDO',
            onClick: handleUndo,
          }}
          onClose={() => setDeletedItem(null)}
          duration={4000}
        />
      )}
    </div>
  );
};
