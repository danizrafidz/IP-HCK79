import { configureStore } from "@reduxjs/toolkit";
import myMovieReducer from "./features/myModules/myModuleSlice";

export const store = configureStore({
  reducer: {
    counter: myMovieReducer,
  },
});
