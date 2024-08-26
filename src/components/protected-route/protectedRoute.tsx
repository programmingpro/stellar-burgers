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
  debugger;
  const userData = useSelector(getUser);
  const location = useLocation();
  if (!onlyUnAuth && userData.email == '' && userData.name == '') {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && userData.email != '' && userData.name != '') {
    return <Navigate to='/' />;
  }
  return children ? children : <Outlet />;
};
