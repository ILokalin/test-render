import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import logo404 from '../assets/404.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img src={logo404} alt={t('notFoundPage.alt')} className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.text')}
        {' '}
        <NavLink to="/">{t('notFoundPage.link')}</NavLink>
      </p>
    </div>
  );
};

export default NotFoundPage;
