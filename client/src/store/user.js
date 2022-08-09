import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
  name: "users",
  initialState: {
    name: window.localStorage.getItem("user") ?? "",
  },
  reducers: {
    get: (state) => {
      state.name -= 1;
    },
    set: (state, action) => {
      window.localStorage.setItem("user", action.payload);
      state.name = action.payload;
    },
  },
});

export const { get, set } = questionsSlice.actions;

export default questionsSlice.reducer;
