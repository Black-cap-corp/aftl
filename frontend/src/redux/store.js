import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import appReducer from "./userSlice";
import stockReducer from "./stockSlice";
import projectReducer from "./projectSlice";
import firmReducer from "./firmSlice";
import workorderReducer from "./workorderSlice";
import webUserReducer from "./webuserSlice";
import appUserSlice from "./appUserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    app: appReducer,
    stocks: stockReducer,
    projects: projectReducer,
    firms: firmReducer,
    workorders: workorderReducer,
    webusers: webUserReducer,
    appusers: appUserSlice,
  },
});
