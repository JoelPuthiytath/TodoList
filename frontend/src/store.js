import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./components/slices/apiSlice";
import todoReducer from "./components/slices/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
