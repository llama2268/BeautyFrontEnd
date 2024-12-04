import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  user: boolean;
  children: JSX.Element;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const {user, children} = props; 
  return user ? children : <Navigate to="/account" />;
};

export default ProtectedRoute;

//SOURCE: https://dev.to/thevinitgupta/react-router-dom-v6-tutorial-for-everyone-4i0k