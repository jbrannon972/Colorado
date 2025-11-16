import React, { useState } from 'react';
import { Icons, Button } from '../ui';
import { initialTimeline } from '../../data/timeline';
import type { Activity, TimeSlotType } from '../../types';

interface ActivitySelectionModalProps {
  activity: Activity;
  onClose: () => void;
  onConfirm: (date: string, slot: TimeSlotType) => void;
}

export const ActivitySelectionModal: React.FC<ActivitySelectionModalProps> = ({
  activity,
  onClose,
  onConfirm,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotType | null>(null);

  // Filter to only full activity days (exclude arrival/departure)
  const availableDays = initialTimeline.filter(
    (day) => day.tripPhase === 'FULL_ACTIVITY_DAY' || day.tripPhase === 'THANKSGIVING_DAY'
  );

  const timeSlots: { value: TimeSlotType; label: string; time: string }[] = [
    { value: 'morning', label: 'Morning', time: '8:00 AM - 12:00 PM' },
    { value: 'afternoon', label: 'Afternoon', time: '12:00 PM - 5:00 PM' },
    { value: 'evening', label: 'Evening', time: '5:00 PM - 9:00 PM' },
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedSlot) {
      onConfirm(selectedDate, selectedSlot);
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
              <h3 className="text-h3 text-frost-white">Add to Timeline</h3>
              <p className="text-body-compact text-pale-ice mt-1">{activity.name}</p>
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
            {/* Select Day */}
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
                          {new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', {
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

            {/* Select Time Slot */}
            {selectedDate && (
              <div>
                <label className="text-label text-pale-ice mb-2 block">SELECT TIME</label>
                <div className="space-y-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      onClick={() => setSelectedSlot(slot.value)}
                      className={`w-full p-3 rounded-subtle border transition-smooth text-left ${
                        selectedSlot === slot.value
                          ? 'border-accent-blue bg-accent-blue bg-opacity-10'
                          : 'border-pale-ice border-opacity-10 bg-icy-blue bg-opacity-30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-body text-frost-white font-semibold">{slot.label}</p>
                          <p className="text-body-compact text-pale-ice">{slot.time}</p>
                        </div>
                        {selectedSlot === slot.value && (
                          <Icons.CheckCircle size={20} className="text-accent-blue" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Info */}
            <div className="p-3 bg-deep-navy bg-opacity-30 rounded-subtle">
              <div className="flex items-start gap-2 text-body-compact text-pale-ice">
                <Icons.Clock size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  {activity.durationHours.min === activity.durationHours.max
                    ? `${activity.durationHours.min} hour${activity.durationHours.min > 1 ? 's' : ''}`
                    : `${activity.durationHours.min}-${activity.durationHours.max} hours`}
                </span>
              </div>
              <div className="flex items-start gap-2 text-body-compact text-pale-ice mt-2">
                <Icons.MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>{activity.driveTimeMinutes} min drive from Spinnaker</span>
              </div>
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
              disabled={!selectedDate || !selectedSlot}
              className="flex-1"
            >
              Add to Timeline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
