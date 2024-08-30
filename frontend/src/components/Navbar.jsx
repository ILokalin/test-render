import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logOut } from '../store/slice/authSlice';
import getRoute from '../utils/routes';

const Navbar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logOut());
    setIsLoggedIn(false);
    navigate(getRoute('PAGE_LOGIN'));
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('navBar.title')}</a>
        {isLoggedIn && (
        <button
          onClick={handleLogout}
          type="button"
          className="btn btn-primary"
        >
          {t('navBar.button')}
        </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
