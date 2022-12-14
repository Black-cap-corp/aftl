import { configureStore, createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "errors",
  initialState: {
    showError: false,
    showSuccess: false,
    errorMsg: "",
    successMsg: "",
  },
  reducer: {
    setErrorState: (state, action) => {
      return {
        showSuccess: false,
        successMsg: "",
        showError: true,
        errorMsg: action.payload,
      };
    },
    setSuccessState: (state, action) => {
      return {
        showSuccess: true,
        successMsg: action.payload,
        showError: false,
        errorMsg: "",
      };
    },
  },
});

export default errorSlice.reducer;
export const { setErrorState, setSuccessState } = errorSlice.actions;
