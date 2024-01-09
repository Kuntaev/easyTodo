import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: 0,
  reducers: {
    plus: (state) => {
      return state + 1;
    },
    minus: (state) => {
      return state <= 0 ? state : state - 1;
    },
    reset: (state) => {
      return (state = 0);
    },
  },
});

export const { plus, minus, reset } = countSlice.actions;

export default countSlice.reducer;
