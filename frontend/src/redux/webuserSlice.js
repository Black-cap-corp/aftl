import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/AppConstant";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAsyncUsers = createAsyncThunk("user/getAsync", async () => {
  const jwt = sessionStorage.getItem("auth_token");
  const res = await axios.get(`${BASE_URL}/user`, {
    headers: {
      authorization: jwt,
    },
  });
  return { res: res.data };
});

export const updateAsyncUser = createAsyncThunk(
  "user/updateAsync",
  async (user) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/user/update`, user, {
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

export const deleteAsyncUser = createAsyncThunk(
  "user/deleteAsync",
  async (id) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/user/delete`,
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

export const addAsyncUser = createAsyncThunk(
  "user/addAsyncUser",
  async (user) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/user/add`, user, {
      headers: {
        authorization: jwt,
      },
    });
    return { res: res.data };
  }
);

const userSlice = createSlice({
  name: "webusers",
  initialState: [],
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncUsers.fulfilled, (state, action) => {
        return action.payload.res;
      })
      .addCase(updateAsyncUser.fulfilled, (state, action) => {
        const { res } = action.payload;
        if (res.status === "success") {
          state = state.filter((x) => x.id !== res.user.id);
          return [...state, res.user];
        }
      })
      .addCase(deleteAsyncUser.fulfilled, (state, action) => {
        const { res } = action.payload;
        if (res.status === "success") {
          return state.filter((user) => user.id != res.id);
        }
      })
      .addCase(addAsyncUser.fulfilled, (state, action) => {
        state.push(action.payload.res);
        return state;
      });
  },
});

export default userSlice.reducer;
