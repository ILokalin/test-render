import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice/appSlice.js';
import authReducer from './slice/authSlice.js';
import channelsApi from '../api/channelsApi.js';
import messagesApi from '../api/messagesApi.js';
import authApi from '../api/authApi.js';

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    channelsApi.middleware,
    messagesApi.middleware,
    authApi.middleware,
  ),
});

export default store;
