// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

// Create the store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       thunk: true, // Enable thunk middleware
  //     }),
});

// Export the store and types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
