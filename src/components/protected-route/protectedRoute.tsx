import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router';
import { Login } from '@pages';
import {
  getUser,
  isAuthCheckedSelector
} from '../../services/slices/userSlice';
import React from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const isLogined = useSelector(isAuthCheckedSelector);

  if (!isLogined) {
    return <Login />;
  }
  const userData = useSelector(getUser);
  const location = useLocation();
  if (!onlyUnAuth && !userData) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && userData) {
    return <Navigate to='/' />;
  }
  return children ? children : <Outlet />;
};
