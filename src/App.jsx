import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell.jsx';
import { CalendarView } from './views/CalendarView.jsx';
import { TeamSliderView } from './views/TeamSliderView.jsx';
import { HeatmapView } from './views/HeatmapView.jsx';

export const navigationItems = [
  { label: 'Calendar', path: '/calendar', hint: 'Plan people and project capacity' },
  { label: 'Team Slider', path: '/team-slider', hint: 'Model team size, cost and efficiency' },
  { label: 'Heatmap', path: '/heatmap', hint: 'Compare options across weighted criteria' },
];

export function App() {
  return (
    <Routes>
      <Route element={<AppShell items={navigationItems} />}>
        <Route index element={<Navigate to="/calendar" replace />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="team-slider" element={<TeamSliderView />} />
        <Route path="heatmap" element={<HeatmapView />} />
      </Route>
      <Route path="*" element={<Navigate to="/calendar" replace />} />
    </Routes>
  );
}
