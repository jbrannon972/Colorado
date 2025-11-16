import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const useServiceWorker = () => {
  const [showReload, setShowReload] = useState(false);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration: ServiceWorkerRegistration | undefined) {
      console.log('Service Worker registered:', registration);
    },
    onRegisterError(error: Error) {
      console.error('Service Worker registration error:', error);
    },
    onOfflineReady() {
      console.log('App is ready to work offline');
      setOfflineReady(true);
    },
    onNeedRefresh() {
      console.log('New version available');
      setNeedRefresh(true);
      setShowReload(true);
    },
  });

  useEffect(() => {
    if (offlineReady) {
      // Show a subtle notification that app is ready to work offline
      const timeoutId = setTimeout(() => {
        setOfflineReady(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [offlineReady, setOfflineReady]);

  const handleReload = () => {
    updateServiceWorker(true);
  };

  const handleDismiss = () => {
    setShowReload(false);
    setNeedRefresh(false);
  };

  return {
    offlineReady,
    needRefresh,
    showReload,
    handleReload,
    handleDismiss,
  };
};
