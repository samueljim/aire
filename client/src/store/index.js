import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./questions";
export default configureStore({
  reducer: {
    questions: questionsSlice.reducer,
  },
});
