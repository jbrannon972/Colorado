import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TimelinePage } from './pages/TimelinePage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { DiningPage } from './pages/DiningPage';
import { PackingPage } from './pages/PackingPage';
import { FamilyPage } from './pages/FamilyPage';
import { GalleryPage } from './pages/GalleryPage';
import { SettingsPage } from './pages/SettingsPage';
import { PWAInstallPrompt } from './components/features/PWAInstallPrompt';
import { PWAUpdatePrompt } from './components/features/PWAUpdatePrompt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TimelinePage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/dining" element={<DiningPage />} />
        <Route path="/packing" element={<PackingPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

      {/* PWA Prompts */}
      <PWAInstallPrompt />
      <PWAUpdatePrompt />
    </BrowserRouter>
  );
}

export default App;
