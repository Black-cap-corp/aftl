import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/AppConstant";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAsyncFirms = createAsyncThunk("firms/getAsync", async () => {
  const jwt = sessionStorage.getItem("auth_token");
  const res = await axios.get(`${BASE_URL}/firm`, {
    headers: {
      authorization: jwt,
    },
  });
  return { res: res.data };
});

export const updateAsyncFirm = createAsyncThunk(
  "firm/updateAsync",
  async (firm) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/firm/update`, firm, {
      headers: {
        authorization: jwt,
      },
    });

    return {
      res: {
        status: res.data.status,
        firm: firm,
      },
    };
  }
);

export const deleteAsyncFirm = createAsyncThunk(
  "firm/deleteAsync",
  async (firm) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/firm/delete`, firm, {
      headers: {
        authorization: jwt,
      },
    });
    return {
      res: {
        status: res.data.status,
        firm,
      },
    };
  }
);

export const addAsyncFirm = createAsyncThunk("firm/addAsync", async (firm) => {
  const jwt = sessionStorage.getItem("auth_token");
  const res = await axios.post(`${BASE_URL}/firm/add`, firm, {
    headers: {
      authorization: jwt,
    },
  });
  return { res: res.data };
});

const firmSlice = createSlice({
  name: "firms",
  initialState: [],
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncFirms.fulfilled, (state, action) => {
        return action.payload.res;
      })
      .addCase(updateAsyncFirm.fulfilled, (state, action) => {
        const { res } = action.payload;
        if (res.status === "success") {
          state = state.filter((x) => x.id !== res.firm.id);
          return [...state, res.firm];
        }
      })
      .addCase(deleteAsyncFirm.fulfilled, (state, action) => {
        const { res } = action.payload;
        if (res.status === "success") {
          return state.filter((firm) => firm.id != res.firm.id);
        }
      })
      .addCase(addAsyncFirm.fulfilled, (state, action) => {
        state = [...state, action.payload.res];

        return state;
      });
  },
});

export default firmSlice.reducer;
