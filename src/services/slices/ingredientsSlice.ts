import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface ingredientsState {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: string | null;
}

export const initialState: ingredientsState = {
  isLoading: false,
  ingredients: [],
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/get', async () =>
  getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingrediends',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state: ingredientsState) => state.ingredients,

    ingredientsIsLoading: (state: ingredientsState) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const { selectIngredients, ingredientsIsLoading } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
