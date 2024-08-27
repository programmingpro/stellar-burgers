import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { UserOrderTypes } from './enums';

export const getOrders = createAsyncThunk(
  UserOrderTypes.userOrders,
  getOrdersApi
);

type TUserOrders = {
  orders: TOrder[];
};

export const initialUserOrderState: TUserOrders = {
  orders: []
};

const userOrdersSlice = createSlice({
  name: 'orders',
  initialState: initialUserOrderState,
  reducers: {},
  selectors: {
    getOrdersState: (state) => state,
    getUserOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {})
      .addCase(getOrders.rejected, (state, action) => {})
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const { getOrdersState, getUserOrders } = userOrdersSlice.selectors;

export const userOrdersReducer = userOrdersSlice.reducer;
