import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.find(item => item._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;