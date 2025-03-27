import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface Order {
  isLoading: boolean;
  error: string | null;
  order: TOrder | null;
}

export const initialState: Order = {
  isLoading: false,
  error: null,
  order: null
};

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrder',
  (number: number) => getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export default orderSlice.reducer;
