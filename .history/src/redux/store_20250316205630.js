import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favouritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  
});