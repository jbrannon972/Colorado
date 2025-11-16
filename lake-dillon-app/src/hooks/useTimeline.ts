import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { initialTimeline } from '../data/timeline';
import type { DayTimeline, TimeSlotType, ActivityInstance, MealInstance } from '../types';

const TRIP_ID = 'lake-dillon-thanksgiving-2025';

export const useTimeline = () => {
  const [timeline, setTimeline] = useState<DayTimeline[]>(initialTimeline);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load timeline from Firebase
  useEffect(() => {
    const loadTimeline = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'timelines', TRIP_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTimeline(data.days as DayTimeline[]);
        } else {
          // Initialize with default timeline
          await setDoc(docRef, { days: initialTimeline });
          setTimeline(initialTimeline);
        }
      } catch (err) {
        console.error('Error loading timeline:', err);
        setError('Failed to load timeline');
        setTimeline(initialTimeline); // Fallback to initial
      } finally {
        setLoading(false);
      }
    };

    loadTimeline();
  }, []);

  // Save timeline to Firebase
  const saveTimeline = async (updatedTimeline: DayTimeline[]) => {
    try {
      const docRef = doc(db, 'timelines', TRIP_ID);
      await setDoc(docRef, { days: updatedTimeline });
      setTimeline(updatedTimeline);
      return true;
    } catch (err) {
      console.error('Error saving timeline:', err);
      setError('Failed to save timeline');
      return false;
    }
  };

  // Add activity to specific day/slot
  const addActivityToTimeline = async (
    date: string,
    slot: TimeSlotType,
    activityId: string,
    notes?: string
  ) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        const newActivity: ActivityInstance = {
          id: `${activityId}-${Date.now()}`,
          activityId,
          addedAt: Date.now(),
          notes,
        };

        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              activities: [...day.timeSlots[slot].activities, newActivity],
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  // Add meal to specific day/slot
  const addMealToTimeline = async (
    date: string,
    slot: TimeSlotType,
    meal: Partial<MealInstance>
  ) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        const newMeal: MealInstance = {
          id: `meal-${Date.now()}`,
          type: meal.type || 'snack',
          participants: meal.participants || [],
          restaurantId: meal.restaurantId,
          customMeal: meal.customMeal,
          reservationRequired: meal.reservationRequired,
          reservationTime: meal.reservationTime,
          reservationConfirmed: meal.reservationConfirmed,
        };

        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              meals: [...day.timeSlots[slot].meals, newMeal],
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  // Remove activity from timeline
  const removeActivity = async (date: string, slot: TimeSlotType, activityInstanceId: string) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              activities: day.timeSlots[slot].activities.filter(
                (a) => a.id !== activityInstanceId
              ),
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  // Remove meal from timeline
  const removeMeal = async (date: string, slot: TimeSlotType, mealInstanceId: string) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              meals: day.timeSlots[slot].meals.filter((m) => m.id !== mealInstanceId),
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  // Reorder activities within a slot
  const reorderActivities = async (
    date: string,
    slot: TimeSlotType,
    reorderedActivities: ActivityInstance[]
  ) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              activities: reorderedActivities,
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  // Update activity notes or participants
  const updateActivity = async (
    date: string,
    slot: TimeSlotType,
    activityInstanceId: string,
    updates: Partial<ActivityInstance>
  ) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              activities: day.timeSlots[slot].activities.map((a) =>
                a.id === activityInstanceId ? { ...a, ...updates } : a
              ),
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  // Update meal details
  const updateMeal = async (
    date: string,
    slot: TimeSlotType,
    mealInstanceId: string,
    updates: Partial<MealInstance>
  ) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              meals: day.timeSlots[slot].meals.map((m) =>
                m.id === mealInstanceId ? { ...m, ...updates } : m
              ),
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  // Add photo to activity
  const addPhotoToActivity = async (
    date: string,
    slot: TimeSlotType,
    activityInstanceId: string,
    photoUrl: string
  ) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              activities: day.timeSlots[slot].activities.map((a) =>
                a.id === activityInstanceId
                  ? { ...a, photos: [...(a.photos || []), photoUrl] }
                  : a
              ),
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  // Add photo to meal
  const addPhotoToMeal = async (
    date: string,
    slot: TimeSlotType,
    mealInstanceId: string,
    photoUrl: string
  ) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              meals: day.timeSlots[slot].meals.map((m) =>
                m.id === mealInstanceId
                  ? { ...m, photos: [...(m.photos || []), photoUrl] }
                  : m
              ),
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  // Remove photo from activity
  const removePhotoFromActivity = async (
    date: string,
    slot: TimeSlotType,
    activityInstanceId: string,
    photoUrl: string
  ) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              activities: day.timeSlots[slot].activities.map((a) =>
                a.id === activityInstanceId
                  ? { ...a, photos: (a.photos || []).filter((p) => p !== photoUrl) }
                  : a
              ),
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  // Remove photo from meal
  const removePhotoFromMeal = async (
    date: string,
    slot: TimeSlotType,
    mealInstanceId: string,
    photoUrl: string
  ) => {
    const updatedTimeline = timeline.map((day) => {
      if (day.date === date) {
        return {
          ...day,
          timeSlots: {
            ...day.timeSlots,
            [slot]: {
              ...day.timeSlots[slot],
              meals: day.timeSlots[slot].meals.map((m) =>
                m.id === mealInstanceId
                  ? { ...m, photos: (m.photos || []).filter((p) => p !== photoUrl) }
                  : m
              ),
            },
          },
        };
      }
      return day;
    });

    return await saveTimeline(updatedTimeline);
  };

  return {
    timeline,
    loading,
    error,
    addActivityToTimeline,
    addMealToTimeline,
    removeActivity,
    removeMeal,
    reorderActivities,
    updateActivity,
    updateMeal,
    addPhotoToActivity,
    addPhotoToMeal,
    removePhotoFromActivity,
    removePhotoFromMeal,
  };
};
