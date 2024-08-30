import { createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';

const initialState = {
  username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  isAuth: !!localStorage.getItem('token'),
  authError: null,
  isAuthError: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      Object.assign(state, {
        username: null,
        token: null,
        isAuth: false,
        authError: null,
        isAuthError: false,
      });
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      Object.assign(state, {
        ...initialState,
        authError: null,
        isAuthError: false,
      });
    });
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      const { username, token } = payload;
      Object.assign(state, {
        ...initialState,
        token,
        username,
        isAuth: true,
      });
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    });
    builder.addMatcher(authApi.endpoints.login.matchRejected, (state, { payload }) => {
      Object.assign(state, {
        ...initialState,
        authError: payload.status,
        isAuthError: true,
      });
    });
    builder.addMatcher(authApi.endpoints.createNewUser.matchPending, (state) => {
      Object.assign(state, {
        ...initialState,
        authError: null,
        isAuthError: false,
      });
    });
    builder.addMatcher(authApi.endpoints.createNewUser.matchFulfilled, (state, { payload }) => {
      const { username, token } = payload;
      Object.assign(state, {
        ...initialState,
        token,
        username,
        isAuth: true,
      });
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    });
    builder.addMatcher(authApi.endpoints.createNewUser.matchRejected, (state, { payload }) => {
      Object.assign(state, {
        ...initialState,
        authError: payload.status,
        isAuthError: true,
      });
    });
  },
});

export const { logOut } = authSlice.actions;
export const selectUsername = (state) => state.auth.username;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectAuthError = (state) => state.auth.authError;
export const selectIsAuthError = (state) => state.auth.isAuthError;
export default authSlice.reducer;
