import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Navbar from './components/Navbar.jsx';
import Login from './page/Login.jsx';
import ChatPage from './page/ChatPage.jsx';
import Signup from './page/Signup.jsx';
import NotFoundPage from './page/NotFoundPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import getRoute from './utils/routes.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path={getRoute('PAGE_CHAT')} element={<PrivateRoute element={ChatPage} />} />
          <Route path={getRoute('PAGE_LOGIN')} element={<Login />} />
          <Route path={getRoute('PAGE_SIGNUP')} element={<Signup />} />
          <Route path={getRoute('PAGE_NOT_FOUND')} element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </ErrorBoundary>
    </Provider>
  </div>
);

export default App;
