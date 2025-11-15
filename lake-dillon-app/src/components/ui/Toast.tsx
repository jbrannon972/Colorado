import React, { useEffect } from 'react';
import { Icons } from './Icons';

interface ToastProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose: () => void;
  duration?: number; // milliseconds
}

export const Toast: React.FC<ToastProps> = ({
  message,
  action,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-md safe-bottom"
      style={{ animation: 'slideUp 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
    >
      <div className="w-full max-w-md mb-md">
        <div className="bg-icy-blue border border-pale-ice border-opacity-20 rounded-subtle shadow-2xl backdrop-filter backdrop-blur-xl gpu-accelerated">
          <div className="flex items-center justify-between p-md gap-3">
            <span className="text-body text-frost-white flex-1">{message}</span>
            <div className="flex items-center gap-2">
              {action && (
                <button
                  onClick={action.onClick}
                  className="text-accent-blue text-button font-semibold transition-smooth touch-opacity"
                >
                  {action.label}
                </button>
              )}
              <button
                onClick={onClose}
                className="text-pale-ice hover:text-frost-white transition-smooth touch-opacity"
              >
                <Icons.X size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
