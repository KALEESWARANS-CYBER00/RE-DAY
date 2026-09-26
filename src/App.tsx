import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

// Route Guards
import { PrivateRoute } from './components/routes/PrivateRoute';
import { AdminRoute } from './components/routes/AdminRoute';

// Layouts
import { AppLayout } from './components/layout/AppLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// User Pages
import { DashboardPage } from './pages/user/DashboardPage';
import { PlannerPage } from './pages/user/PlannerPage';
import { FocusPage } from './pages/user/FocusPage';
import { ReviewPage } from './pages/user/ReviewPage';
import { LessonsPage } from './pages/user/LessonsPage';
import { ProfilePage } from './pages/user/ProfilePage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';
import { AdminSubscriptionsPage } from './pages/admin/AdminSubscriptionsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            {/* 1. Public Welcome / Landing Page */}
            <Route path="/" element={<WelcomePage />} />

            {/* 2. Authentication */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* 3. User Portal (Protected Shell via PrivateRoute) */}
            <Route
              element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/focus" element={<FocusPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* 4. Admin Portal (Admin Protected Shell via AdminRoute) */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="content" element={<AdminContentPage />} />
              <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
