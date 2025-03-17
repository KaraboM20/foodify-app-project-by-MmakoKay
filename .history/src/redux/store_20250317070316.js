import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const recipe = action.payload;
      if (!state.items.some((item) => item._id === recipe._id)) {
        state.items.push(recipe);
        console.log("Added to favorites, new state:", state.items);
      } else {
        console.log("Already in favorites:", recipe.name);
      }
    },
    removeFavorite: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
      console.log("Removed, new state:", state.items);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;