import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurger = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurger = {
  ingredients: [],
  bun: null
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            state.bun = action.payload;
            break;
          case 'main':
          case 'sauce':
            state.ingredients.push(action.payload);
        }
        return state;
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; direction: string }>
    ) => {
      const { direction, id } = action.payload;

      const index = state.ingredients.findIndex(function (idx) {
        return idx.id === id;
      });

      const ingredients = state.ingredients;
      const ingredientMove = ingredients[index];

      if (direction === 'up') {
        [ingredients[index], ingredients[index - 1]] = [
          ingredients[index - 1],
          ingredientMove
        ];
      } else {
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredientMove
        ];
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(function (ingredient) {
        return ingredient.id !== action.payload;
      });
    },
    resetConstructor: (state: TBurger) => (state = initialState)
  },
  selectors: {
    getConstructorState: (state) => state,
    getBurgerPrice: (state) => {
      if (!state.bun) return 0;
      const bunPrice = state.bun.price * 2;
      const ingredientPrice = state.ingredients?.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      );
      return bunPrice + ingredientPrice;
    }
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  moveIngredient,
  resetConstructor,
  addIngredient,
  deleteIngredient
} = constructorSlice.actions;
export const { getConstructorState, getBurgerPrice } =
  constructorSlice.selectors;
