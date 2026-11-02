import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AppLayout from './components/layout/AppLayout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import SymptomTracker from './pages/SymptomTracker';
import AIInsights from './pages/AIInsights';
import Community from './pages/Community';
import FindDoctors from './pages/FindDoctors';
import DoctorProfile from './pages/DoctorProfile';
import ResearchHub from './pages/ResearchHub';
import ResearchDetails from './pages/ResearchDetails';
import ResearchCollections from './pages/ResearchCollections';
import HealthReports from './pages/HealthReports';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';

export function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Patient Portal Pages (with sidebar & auth context) */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/symptoms" element={<SymptomTracker />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/community" element={<Community />} />
        <Route path="/doctors" element={<FindDoctors />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/research" element={<ResearchHub />} />
        <Route path="/research/:id" element={<ResearchDetails />} />
        <Route path="/research/collections" element={<ResearchCollections />} />
        <Route path="/reports" element={<HealthReports />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
