import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import init from './init.js';

const chat = ReactDOM.createRoot(document.getElementById('chat'));
chat.render(
  <BrowserRouter>
    <React.StrictMode>
      {await init()}
    </React.StrictMode>
  </BrowserRouter>,
);
