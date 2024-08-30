import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import getRoute from '../utils/routes';
import { selectIsAuth } from '../store/slice/authSlice';

const PrivateRoute = ({ element: Component }) => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Component /> : <Navigate to={getRoute('PAGE_LOGIN')} />;
};

export default PrivateRoute;
