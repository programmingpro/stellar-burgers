import { deleteCookie, setCookie } from '../../utils/cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '@api';
import { TUser } from '@utils-types';
import { UserActionTypes } from './enums';
import { Navigate } from 'react-router';
import React from 'react';
import store from '../store';
import { saveState } from '../../components/protected-route/protectedRoute';

export const signIn = createAsyncThunk(UserActionTypes.SignIn, loginUserApi);

export const fetchUserData = createAsyncThunk(
  UserActionTypes.FetchUserData,
  getUserApi
);

export const modifyUser = createAsyncThunk(
  UserActionTypes.ModifyUser,
  updateUserApi
);

export const signUp = createAsyncThunk(UserActionTypes.SignUp, registerUserApi);

export const signOut = createAsyncThunk(UserActionTypes.SignOut, logoutApi);

const initialUserState: TUserState = {
  isAuthenticated: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export interface TUserState {
  isAuthenticated: boolean;
  user: TUser;
  error: string | undefined;
}
export const userSlice = createSlice({
  initialState: initialUserState,
  name: 'user',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = '';
        saveState(state);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(signUp.pending, (state) => {
        state.error = '';
      });
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user = action.payload.user;
        state.error = '';
        saveState(state);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message!;
        saveState(state);
      })
      .addCase(signIn.pending, (state) => {
        state.isAuthenticated = false;
        state.error = '';
        saveState(state);
      });
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        saveState(state);
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message!;
        saveState(state);
      });
    builder
      .addCase(modifyUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        saveState(state);
      })
      .addCase(modifyUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message!;
        saveState(state);
      })
      .addCase(modifyUser.pending, (state) => {
        state.error = '';
      });
    builder.addCase(signOut.fulfilled, (state) => {
      deleteCookie('accessToken');
      state.isAuthenticated = false;
      state.user = { email: '', name: '' };
      saveState(state);
    });
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
    getName: (state) => state.user.name,
    getError: (state) => state.error
  }
});

export const { isAuthCheckedSelector, getUser, getName, getError } =
  userSlice.selectors;
export const userReducer = userSlice.reducer;
