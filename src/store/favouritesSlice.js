import { createSlice } from "@reduxjs/toolkit";
import {
  addFavouriteToFirebase,
  auth,
  clearFavouritesFromFirebase,
  removeFavouriteFromFirebase,
} from "../auth/firebase";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    getFavouriteCountries(state, action) {
      state.favourites = action.payload;
    },
    addFavouriteCountries(state, action) {
      if (state.favourites.some((value) => value === action.payload))
        alert(action.payload);
      state.favourites = [...state.favourites, action.payload];

      const user = auth.currentUser;
      if (user) {
        addFavouriteToFirebase(user.uid, action.payload);
      }
    },
    removeFavouriteCountries(state, action) {
      const favList = [...state.favourites];
      favList.splice(
        favList.findIndex((e) => e === action.payload),
        1
      );
      state.favourites = [...favList];

      const user = auth.currentUser;
      if (user) {
        removeFavouriteFromFirebase(user.uid, action.payload);
      }
    },
    clearFavouriteCountries(state) {
      state.favourites = [];
      const user = auth.currentUser;
      if (user) {
        clearFavouritesFromFirebase(user.uid);
      }
    },
  },
});

export const {
  getFavouriteCountries,
  addFavouriteCountries,
  clearFavouriteCountries,
  removeFavouriteCountries,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
