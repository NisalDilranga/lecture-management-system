import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('lecturerAuth') === 'true';

  // Check if authenticated - all lecturer types access the admin dashboard
  // but they'll see different options based on their status
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ openLoginModal: true, from: location }} replace />
  );
};

export default ProtectedRoute;
