import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const naviagte = useNavigate();
  const isAuthenticated = localStorage.getItem('auth_token');
  if (!isAuthenticated) {
    naviagte('/');
  }
  return <>{children}</>;
};

export default ProtectedRoute;
