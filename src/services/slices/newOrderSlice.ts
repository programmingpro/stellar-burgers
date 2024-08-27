import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { UserOrderTypes } from './enums';

export const placeNewOrder = createAsyncThunk(
  UserOrderTypes.createOrder,
  orderBurgerApi
);

export interface TNewUserOrderState {
  error: string | undefined;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: TNewUserOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeNewOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(placeNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(placeNewOrder.pending, (state) => {
        state.orderRequest = true;
      });
  },
  selectors: {
    getOrderModalData: (state) => state.orderModalData,
    getOrderRequest: (state) => state.orderRequest
  }
});

export const { resetOrder } = newOrderSlice.actions;
export const newOrderReducer = newOrderSlice.reducer;
export const { getOrderRequest, getOrderModalData } = newOrderSlice.selectors;
