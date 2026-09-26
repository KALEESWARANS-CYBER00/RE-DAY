import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminRouteProps {
  children?: React.ReactNode;
}

/**
 * Route guard that ensures only authenticated users with 'admin' role can access admin routes.
 * Non-authenticated users are redirected to /login.
 * Authenticated non-admin users are redirected to /dashboard.
 */
export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default AdminRoute;
