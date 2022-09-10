import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/AppConstant";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAsyncAppusers = createAsyncThunk(
  "appuser/getAsync",
  async () => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.get(`${BASE_URL}/appuser`, {
      headers: {
        authorization: jwt,
      },
    });
    return { res: res.data };
  }
);

export const updateAsyncAppuser = createAsyncThunk(
  "appuser/updateAsync",
  async (user) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/appuser/update`, user, {
      headers: {
        authorization: jwt,
      },
    });

    return {
      res: {
        status: res.data.status,
        user,
      },
    };
  }
);

export const deleteAsyncAppuser = createAsyncThunk(
  "appuser/deleteAsync",
  async (id) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/appuser/delete`,
      { id },
      {
        headers: {
          authorization: jwt,
        },
      }
    );
    return {
      res: {
        status: res.data.status,
        id,
      },
    };
  }
);

export const addAsyncAppuser = createAsyncThunk(
  "appuser/addAsync",
  async (user) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/appuser/add`, user, {
      headers: {
        authorization: jwt,
      },
    });
    return { res: res.data };
  }
);

const appuserSlice = createSlice({
  name: "appusers",
  initialState: [],
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncAppusers.fulfilled, (state, action) => {
        return action.payload.res;
      })
      .addCase(updateAsyncAppuser.fulfilled, (state, action) => {
        const { res } = action.payload;
        if (res.status === "success") {
          state = state.filter((x) => x.id !== res.user.id);
          return [...state, res.user];
        }
      })
      .addCase(deleteAsyncAppuser.fulfilled, (state, action) => {
        const { res } = action.payload;
        if (res.status === "success") {
          return state.filter((user) => user.id != res.id);
        }
      })
      .addCase(addAsyncAppuser.fulfilled, (state, action) => {
        console.log(action.payload.res);
        state.push(action.payload.res);
        return state;
      });
  },
});

export default appuserSlice.reducer;
