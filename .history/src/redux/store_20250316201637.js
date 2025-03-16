import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});