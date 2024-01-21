import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/AppConstant";

export const getAsyncReturns = createAsyncThunk(
  "get/getAsyncReturns",
  async (date) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/returnIndents/getReturnsByDate`,
      { date },
      {
        headers: {
          authorization: jwt,
        },
      }
    );
    return { res: res.data };
  }
);

export const getAsyncReturnswithDivision = createAsyncThunk(
  "get/getAsyncReturnswithDivision",
  async (payload) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/returnIndents/getReturnsByDateAndDivision`,
      payload,
      {
        headers: {
          authorization: jwt,
        },
      }
    );
    return { res: res.data };
  }
);

export const setSelectedReturnIndent = createAsyncThunk(
  "get/setSelectedReturnIndent",
  async (id) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/returnIndents/getReturnIndentDetails`,
      { id },
      {
        headers: {
          authorization: jwt,
        },
      }
    );
    return { res: res.data };
  }
);

export const updateSelectedReturnIndent = createAsyncThunk(
  "get/updateSelectedReturnIndent",
  async (request) => {
    const jwt = sessionStorage.getItem("auth_token");
    const url = "returnIndents/operator-update";
    const res = await axios.post(
      `${BASE_URL}/${url}`,
      { request },
      {
        headers: {
          authorization: jwt,
        },
      }
    );
    return { res: res.data };
  }
);

const issueSlice = createSlice({
  initialState: { indents: [], selIndent: null },
  name: "returns",
  reducers: {
    clearSelectedIndent: (state) => {
      return { ...state, selIndent: null };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAsyncReturns.fulfilled, (state, action) => {
        return { ...state, indents: action.payload.res };
      })
      .addCase(getAsyncReturnswithDivision.fulfilled, (state, action) => {
        return { ...state, indents: action.payload.res };
      })
      .addCase(setSelectedReturnIndent.fulfilled, (state, action) => {
        return { ...state, selIndent: action.payload.res };
      })
      .addCase(updateSelectedReturnIndent.fulfilled, (state, action) => {
        // return Object.assign({}, state, { selIndent: action.payload.res });
        return JSON.parse(
          JSON.stringify({ ...state, selIndent: action.payload.res })
        );
      });
  },
});

export default issueSlice.reducer;
export const { clearSelectedIndent } = issueSlice.actions;
