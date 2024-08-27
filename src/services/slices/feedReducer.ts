import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
export const getAllFeeds = createAsyncThunk('orders/getAll', getFeedsApi);

export interface TFeed {
  total: number;
  totalToday: number;
  isLoading: boolean;
  orders: Array<TOrder>;
  error: string | undefined;
}

const initialState: TFeed = {
  isLoading: true,
  error: undefined,
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedReducer = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      });
  },
  selectors: {
    getTotalFeeds: (state) => state.total,
    getOrdersFeeds: (state) => state.orders,
    getTotalTodayFeeds: (state) => state.totalToday
  }
});

export const { getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds } =
  feedReducer.selectors;
export const feedsReducer = feedReducer.reducer;
