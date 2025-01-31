import { configureStore } from "@reduxjs/toolkit";
import myModuleReducer from "./features/myModules/myModuleSlice";

export const store = configureStore({
  reducer: {
    myModules: myModuleReducer,
  },
});
