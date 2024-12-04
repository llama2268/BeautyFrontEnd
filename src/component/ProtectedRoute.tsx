import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  user: boolean;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  return user ? children : <Navigate to="/account" />;
};

export default ProtectedRoute;