import { configureStore } from "@reduxjs/toolkit";

const appSlice = configureStore({
  name: "app",
  initialState: { pageSelected: "" },
  reducer: {
    setPageSelected: (state, action) => {
      state = { ...state, pageSelected: action.payload };
    },
  },
});

export default appSlice.reducer;
export const { setPageSelected } = appSlice.actions;
