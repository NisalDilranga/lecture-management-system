import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('lecturerAuth') === 'true';

  
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ openLoginModal: true, from: location }} replace />
  );
};

export default ProtectedRoute;
