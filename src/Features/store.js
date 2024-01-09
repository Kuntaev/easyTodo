import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./TodoSlice/TodoReducer";
import CountReducer from "./CountSlice/CountReducer";

const store = configureStore({
  reducer: {
    todos: TodoReducer,
    count: CountReducer,
  },
});

export default store;
