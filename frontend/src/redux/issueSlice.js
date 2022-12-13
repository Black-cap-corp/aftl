import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/AppConstant";

export const getAsyncIssues = createAsyncThunk(
  "get/getAsyncIssue",
  async (date) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/indent/getIndentsByDate`,
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

export const setSelectedIndent = createAsyncThunk(
  "get/setSelectedIndent",
  async (id) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/indent/getIndentDetails`,
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

export const updateSelectedIndent = createAsyncThunk(
  "get/updateSelectedIndent",
  async (request) => {
    const jwt = sessionStorage.getItem("auth_token");
    const url =
      request.type == "approver"
        ? "indent/approver-update"
        : "indent/operator-update";
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
  name: "issues",

  extraReducers: (builder) => {
    builder
      .addCase(getAsyncIssues.fulfilled, (state, action) => {
        return { ...state, indents: action.payload.res };
      })
      .addCase(setSelectedIndent.fulfilled, (state, action) => {
        return { ...state, selIndent: action.payload.res };
      })
      .addCase(updateSelectedIndent.fulfilled, (state, action) => {
        console.log("state");
        // return Object.assign({}, state, { selIndent: action.payload.res });
        return JSON.parse(
          JSON.stringify({ ...state, selIndent: action.payload.res })
        );
      });
  },
});

export default issueSlice.reducer;
