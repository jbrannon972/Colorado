import React, { useState } from 'react';
import { Icons } from './Icons';

interface DatePickerProps {
  dates: Array<{ date: string; dayName: string }>;
  selectedIndex: number;
  onSelectDate: (index: number) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ dates, selectedIndex, onSelectDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const selectedDate = dates[selectedIndex];
  const dateObj = new Date(selectedDate.date + 'T12:00:00');

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  };

  const handleSelectDate = (index: number) => {
    onSelectDate(index);
    handleClose();
  };

  const formatDate = (dateStr: string, dayName: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    return {
      dayName,
      monthDay: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    };
  };

  return (
    <>
      {/* Date Selector Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full card p-lg flex items-center justify-between transition-spring touch-scale"
      >
        <div className="flex items-center gap-3">
          <div className="bg-accent-blue bg-opacity-15 rounded-subtle p-2">
            <Icons.Calendar size={20} className="text-accent-blue" />
          </div>
          <div className="text-left">
            <p className="text-h3 text-frost-white">{selectedDate.dayName}</p>
            <p className="text-metadata">
              {dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
        <Icons.ChevronDown size={20} className="text-pale-ice" />
      </button>

      {/* Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-deep-navy backdrop-blur-sm transition-menu ${
              isClosing ? 'bg-opacity-0' : 'bg-opacity-70'
            }`}
            onClick={handleClose}
          />

          {/* Sheet */}
          <div
            className="bottom-sheet w-full max-w-2xl gpu-accelerated"
            style={{
              animation: isClosing
                ? 'slideDown 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                : 'slideUp 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {/* Handle */}
            <div className="bottom-sheet-handle" />

            {/* Header */}
            <div className="p-lg border-b border-pale-ice border-opacity-20">
              <div className="flex items-center justify-between">
                <h2 className="text-h1 text-frost-white">Select Date</h2>
                <button
                  onClick={handleClose}
                  className="text-pale-ice hover:text-frost-white transition-colors touch-opacity"
                >
                  <Icons.X size={24} />
                </button>
              </div>
            </div>

            {/* Date List */}
            <div className="overflow-y-auto p-lg space-y-2 max-h-96 smooth-scroll">
              {dates.map((dateItem, index) => {
                const formatted = formatDate(dateItem.date, dateItem.dayName);
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={dateItem.date}
                    onClick={() => handleSelectDate(index)}
                    className={`
                      w-full p-md rounded-subtle flex items-center justify-between
                      transition-smooth touch-opacity
                      ${
                        isSelected
                          ? 'bg-accent-blue bg-opacity-20 border-2 border-accent-blue'
                          : 'bg-icy-blue bg-opacity-20 border border-pale-ice border-opacity-10 hover:bg-opacity-30'
                      }
                    `}
                  >
                    <div className="text-left">
                      <p className={`text-h3 ${isSelected ? 'text-accent-blue' : 'text-frost-white'}`}>
                        {formatted.dayName}
                      </p>
                      <p className="text-body text-pale-ice">{formatted.fullDate}</p>
                    </div>
                    {isSelected && (
                      <div className="bg-accent-blue rounded-full p-1">
                        <Icons.Check size={16} className="text-deep-navy" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
