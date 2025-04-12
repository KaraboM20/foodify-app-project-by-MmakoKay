import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    items: [],
  },
  

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;