import React, { useState, useMemo } from 'react';
import { Button, Icons, Input } from '../ui';
import { useTimeline } from '../../hooks/useTimeline';
import { activities } from '../../data/activities';
import { restaurants } from '../../data/restaurants';
import type { Photo, TimeSlotType } from '../../types';

interface PhotoTaggingModalProps {
  photo: Photo;
  onSave: () => void;
  onCancel: () => void;
}

export const PhotoTaggingModal: React.FC<PhotoTaggingModalProps> = ({
  photo,
  onSave,
  onCancel,
}) => {
  const { timeline, addPhotoToActivity, addPhotoToMeal } = useTimeline();

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlotType | ''>('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [itemType, setItemType] = useState<'activity' | 'meal' | 'custom'>('custom');
  const [customLocation, setCustomLocation] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  // Get available items for selected date/timeslot
  const availableItems = useMemo(() => {
    if (!selectedDate || !selectedTimeSlot) return { activities: [], meals: [] };

    const day = timeline.find((d) => d.date === selectedDate);
    if (!day) return { activities: [], meals: [] };

    const slot = day.timeSlots[selectedTimeSlot];
    if (!slot) return { activities: [], meals: [] };

    return {
      activities: slot.activities.map((a) => ({
        id: a.id,
        name: activities.find((act) => act.id === a.activityId)?.name || 'Unknown Activity',
      })),
      meals: slot.meals.map((m) => ({
        id: m.id,
        name: m.customMeal
          ? m.customMeal.whatWereEating || 'Custom Meal'
          : restaurants.find((r) => r.id === m.restaurantId)?.name || 'Unknown Restaurant',
      })),
    };
  }, [selectedDate, selectedTimeSlot, timeline]);

  const handleSave = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert('Please select a date and time slot');
      return;
    }

    // Build photo object with metadata
    const photoWithMetadata: Photo = {
      ...photo,
      description: description.trim() || undefined,
      tags: tags.trim() ? tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
    };

    // Add location metadata based on selection
    if (itemType === 'activity' && selectedItem) {
      const activity = availableItems.activities.find((a) => a.id === selectedItem);
      if (activity) {
        photoWithMetadata.location = {
          activityId: selectedItem,
          activityName: activity.name,
        };
        await addPhotoToActivity(selectedDate, selectedTimeSlot, selectedItem, photoWithMetadata);
      }
    } else if (itemType === 'meal' && selectedItem) {
      const meal = availableItems.meals.find((m) => m.id === selectedItem);
      if (meal) {
        photoWithMetadata.location = {
          restaurantName: meal.name,
        };
        await addPhotoToMeal(selectedDate, selectedTimeSlot, selectedItem, photoWithMetadata);
      }
    } else if (itemType === 'custom' && customLocation.trim()) {
      photoWithMetadata.location = {
        customLocation: customLocation.trim(),
      };
      // Add to first available item in the slot, or create a general photo entry
      if (availableItems.activities.length > 0) {
        await addPhotoToActivity(
          selectedDate,
          selectedTimeSlot,
          availableItems.activities[0].id,
          photoWithMetadata
        );
      } else if (availableItems.meals.length > 0) {
        await addPhotoToMeal(
          selectedDate,
          selectedTimeSlot,
          availableItems.meals[0].id,
          photoWithMetadata
        );
      } else {
        alert('Please add an activity or meal to this time slot first, or select an existing one.');
        return;
      }
    } else {
      alert('Please select a location or enter a custom location');
      return;
    }

    onSave();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-md">
      <div
        className="absolute inset-0 bg-deep-navy bg-opacity-90 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-gradient-to-b from-icy-blue to-deep-navy rounded-subtle border border-pale-ice border-opacity-10 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-deep-navy bg-opacity-95 backdrop-blur-sm p-md border-b border-pale-ice border-opacity-10 flex items-center justify-between z-10">
          <h3 className="text-h3 text-frost-white">Tag Your Photo</h3>
          <button onClick={onCancel} className="text-pale-ice hover:text-frost-white">
            <Icons.X size={24} />
          </button>
        </div>

        {/* Photo Preview */}
        <div className="p-md">
          <img src={photo.url} alt="Uploaded" className="w-full rounded-subtle" />
        </div>

        {/* Tagging Form */}
        <div className="p-md space-y-md">
          {/* Date Selection */}
          <div>
            <label className="text-label text-pale-ice mb-2 block">DATE *</label>
            <select
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTimeSlot('');
                setSelectedItem('');
              }}
              className="w-full bg-deep-navy bg-opacity-50 border border-pale-ice border-opacity-20 rounded-subtle px-3 py-2 text-frost-white focus:outline-none focus:border-accent-blue"
            >
              <option value="">Select a date...</option>
              {timeline.map((day) => (
                <option key={day.date} value={day.date}>
                  {day.dayName} - {new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* Time Slot Selection */}
          {selectedDate && (
            <div>
              <label className="text-label text-pale-ice mb-2 block">TIME SLOT *</label>
              <div className="grid grid-cols-3 gap-2">
                {(['morning', 'afternoon', 'evening'] as TimeSlotType[]).map((slot) => (
                  <button
                    key={slot}
                    onClick={() => {
                      setSelectedTimeSlot(slot);
                      setSelectedItem('');
                    }}
                    className={`px-4 py-2 rounded-subtle transition-all ${
                      selectedTimeSlot === slot
                        ? 'bg-accent-blue text-frost-white'
                        : 'bg-deep-navy bg-opacity-50 text-pale-ice hover:bg-opacity-80'
                    }`}
                  >
                    {slot.charAt(0).toUpperCase() + slot.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location Selection */}
          {selectedDate && selectedTimeSlot && (
            <div>
              <label className="text-label text-pale-ice mb-2 block">LOCATION *</label>

              {/* Activity Options */}
              {availableItems.activities.length > 0 && (
                <div className="mb-3">
                  <p className="text-body-compact text-pale-ice mb-2">Activities:</p>
                  <div className="space-y-2">
                    {availableItems.activities.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => {
                          setSelectedItem(activity.id);
                          setItemType('activity');
                          setCustomLocation('');
                        }}
                        className={`w-full px-4 py-2 rounded-subtle text-left transition-all ${
                          selectedItem === activity.id && itemType === 'activity'
                            ? 'bg-accent-blue text-frost-white'
                            : 'bg-deep-navy bg-opacity-50 text-frost-white hover:bg-opacity-80'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icons.Target size={14} />
                          {activity.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Meal Options */}
              {availableItems.meals.length > 0 && (
                <div className="mb-3">
                  <p className="text-body-compact text-pale-ice mb-2">Meals:</p>
                  <div className="space-y-2">
                    {availableItems.meals.map((meal) => (
                      <button
                        key={meal.id}
                        onClick={() => {
                          setSelectedItem(meal.id);
                          setItemType('meal');
                          setCustomLocation('');
                        }}
                        className={`w-full px-4 py-2 rounded-subtle text-left transition-all ${
                          selectedItem === meal.id && itemType === 'meal'
                            ? 'bg-accent-blue text-frost-white'
                            : 'bg-deep-navy bg-opacity-50 text-frost-white hover:bg-opacity-80'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icons.Utensils size={14} />
                          {meal.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Location */}
              <div>
                <p className="text-body-compact text-pale-ice mb-2">Or enter custom location:</p>
                <Input
                  type="text"
                  placeholder="e.g., Hotel room, scenic viewpoint..."
                  value={customLocation}
                  onChange={(e) => {
                    setCustomLocation(e.target.value);
                    setItemType('custom');
                    setSelectedItem('');
                  }}
                  className={customLocation.trim() ? 'border-accent-blue' : ''}
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="text-label text-pale-ice mb-2 block">DESCRIPTION (Optional)</label>
            <Input
              type="text"
              placeholder="What's happening in this photo?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-label text-pale-ice mb-2 block">TAGS (Optional)</label>
            <Input
              type="text"
              placeholder="family, sunset, mountain, etc."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-deep-navy bg-opacity-95 backdrop-blur-sm p-md border-t border-pale-ice border-opacity-10 flex gap-2">
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} className="flex-1">
            Save Photo
          </Button>
        </div>
      </div>
    </div>
  );
};
