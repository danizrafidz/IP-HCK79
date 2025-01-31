import { createSlice } from "@reduxjs/toolkit";
import api from "../../helpers/axiosInstance";

export const myModuleSlice = createSlice({
  name: "myModule",
  initialState: {
    data: [],
  },
  reducers: {
    setMyModules: (state, action) => {
      state.data = action.payload.query;
    },
  },
});

export const { setMyModules } = myModuleSlice.actions;
const access_token = localStorage.getItem("access_token");

export const fetchModulesUnlocked = () => {
  return async (dispatch) => {
    try {
      const { data } = await api({
        method: "GET",
        url: "/mymodules",
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(setMyModules(data));
    } catch (err) {
      console.log(err, "<<< err fetchModulesUnlocked");
    }
  };
};

export default myModuleSlice.reducer;
