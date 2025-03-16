import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    items: [], // Array to store favorite recipes
  },
  reducers: {
    addFavorite: (state, action) => {
      const recipe = action.payload;
      if (!state.items.some((item) => item._id === recipe._id)) {
        state.items.push(recipe);
      }
    },
    removeFavorite: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;