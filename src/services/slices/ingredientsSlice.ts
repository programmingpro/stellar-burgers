import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { BurgerActionTypes } from './enums';

export const getIngred = createAsyncThunk(
  BurgerActionTypes.integriends,
  getIngredientsApi
);

type TIngredients = {
  sauces: TIngredient[];
  loading: boolean;
  error: string | null;
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
};

export const initialState: TIngredients = {
  error: null,
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  loading: true
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getIngred.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getIngred.fulfilled, (state, action) => {
        const ingredients = action.payload;
        state.loading = false;
        state.ingredients = ingredients;
        if (ingredients) {
          state.buns = ingredients.filter(function (ingredient) {
            return ingredient.type === 'bun';
          });
          state.sauces = ingredients.filter(function (ingredient) {
            return ingredient.type === 'sauce';
          });
          state.mains = ingredients.filter(function (ingredient) {
            return ingredient.type === 'main';
          });
        }
      })
      .addCase(getIngred.pending, (state) => {
        state.error = null;
        state.loading = true;
      });
  },
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state,
    getIngredientsState: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const {
  getIngredientsState,
  getIngredientsSelector,
  getIngredientsLoading
} = ingredientsSlice.selectors;
