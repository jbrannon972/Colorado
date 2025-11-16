import React from 'react';
import { Button, Icons } from '../ui';
import { useServiceWorker } from '../../hooks/useServiceWorker';

export const PWAUpdatePrompt: React.FC = () => {
  const { offlineReady, showReload, handleReload, handleDismiss } = useServiceWorker();

  if (offlineReady) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slideUp">
        <div className="bg-gradient-to-b from-icy-blue to-deep-navy rounded-subtle border border-accent-blue border-opacity-30 shadow-2xl p-md">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Icons.CheckCircle size={24} className="text-accent-blue" />
            </div>
            <div className="flex-1">
              <p className="text-body text-frost-white">
                App is ready to work offline!
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-pale-ice hover:text-frost-white transition-colors"
            >
              <Icons.X size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showReload) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slideUp">
        <div className="bg-gradient-to-b from-icy-blue to-deep-navy rounded-subtle border border-accent-blue border-opacity-30 shadow-2xl p-md">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-accent-blue bg-opacity-20 rounded-subtle flex items-center justify-center">
              <Icons.Download size={20} className="text-accent-blue" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-h4 text-frost-white mb-1">Update Available</h3>
              <p className="text-body-compact text-pale-ice mb-3">
                A new version of the app is available. Reload to update!
              </p>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  onClick={handleReload}
                  className="flex-1"
                >
                  Reload
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDismiss}
                >
                  Later
                </Button>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-pale-ice hover:text-frost-white transition-colors"
            >
              <Icons.X size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
