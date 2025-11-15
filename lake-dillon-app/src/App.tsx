import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TimelinePage } from './pages/TimelinePage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { DiningPage } from './pages/DiningPage';
import { PackingPage } from './pages/PackingPage';
import { FamilyPage } from './pages/FamilyPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TimelinePage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/dining" element={<DiningPage />} />
        <Route path="/packing" element={<PackingPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
