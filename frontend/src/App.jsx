import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import PublicationsPage from './pages/PublicationsPage';
import PatentsPage from './pages/PatentsPage';
import AdminPage from './pages/AdminPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

const Layout = () => {
  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main className="main-content" style={{ flex: 1, background: 'var(--bg-dark)', minHeight: 'calc(100vh - 64px)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/patents" element={<PatentsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
