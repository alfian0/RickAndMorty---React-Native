// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/authReducer";

// Create the store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Export the store and types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
