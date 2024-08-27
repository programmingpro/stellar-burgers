import { Outlet, useLocation } from 'react-router-dom';
import store, { useSelector } from '../../services/store';
import { Navigate } from 'react-router';
import {
  getUser,
  isAuthCheckedSelector
} from '../../services/slices/userSlice';
import React from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch {
    // ignore write errors
  }
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const isLoggedIn = loadState().isAuthenticated;
  const location = useLocation();
  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && isLoggedIn) {
    return <Navigate to='/' />;
  }
  return children ? children : <Outlet />;
};
