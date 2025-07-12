import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { loadState, saveState } from "../utils/localStorage.js";

const persistedUserState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: persistedUserState || undefined,
  },
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState().user);
});

export default store;
