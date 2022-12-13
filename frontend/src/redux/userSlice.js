import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(sessionStorage.getItem("user"))
const userSlice = createSlice({
  initialState: initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
