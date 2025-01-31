import { createSlice } from "@reduxjs/toolkit";
import api from "../../helpers/axiosInstance";

export const myModuleSlice = createSlice({
  name: "myModule",
  initialState: {
    list: [],
  },
  reducers: {
    setMyModules: (state, action) => {
      console.log("SET MODULES PAYLOAD:", action.payload);
      state.list = action.payload;
    },
  },
});

export const { setMyModules } = myModuleSlice.actions;

export const fetchModulesUnlocked = () => {
  return async (dispatch) => {
    try {
      const access_token = localStorage.getItem("access_token");
      
      const { data } = await api({
        method: "GET",
        url: "/mymodules",
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });
      console.log(data, "<<< myModuleSlice");

      dispatch(setMyModules(data));
    } catch (err) {
      console.log(err, "<<< err fetchModulesUnlocked");
    }
  };
};

export default myModuleSlice.reducer;
