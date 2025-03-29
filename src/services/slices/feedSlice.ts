import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface feedState {
  isLoading: boolean;
  error: string | null;
  orders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
}

export const initialState: feedState = {
  isLoading: false,
  orders: [],
  error: null,
  feed: {
    total: 0,
    totalToday: 0
  }
};

export const getFeed = createAsyncThunk('feed/getFeed', async () =>
  getFeedsApi()
);
export const getProfileOrders = createAsyncThunk(
  'feed/getProfileFeed',
  async () => getOrdersApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    ordersState: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export default feedSlice.reducer;
export const { ordersState } = feedSlice.selectors;
