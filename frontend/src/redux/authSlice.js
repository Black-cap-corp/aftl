import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  initialState: "",
  name: "auth",
  reducers: {
    setAuth: (state, action) => {
      return action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;
