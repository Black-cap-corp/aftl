import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/AppConstant";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAsyncStocks = createAsyncThunk(
  "get/getAsyncStocks",
  async () => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.get(`${BASE_URL}/stocks`, {
      headers: {
        authorization: jwt,
      },
    });
    return { res: res.data };
  }
);

export const updateAsyncStock = createAsyncThunk(
  "update/updateAsyncStock",
  async (stock) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/stocks/update`, stock, {
      headers: {
        authorization: jwt,
      },
    });

    return {
      res: {
        status: res.data.status,
        stock: stock,
      },
    };
  }
);

export const deleteAsyncStock = createAsyncThunk(
  "delete/deleteAsyncStock",
  async (id) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/stocks/delete`,
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

export const addAsyncStock = createAsyncThunk(
  "add/addAsyncStock",
  async (stock) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/stocks/add`,
      { stock },
      {
        headers: {
          authorization: jwt,
        },
      }
    );
    return { res: res.data };
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState: [],
  reducer: {
    addStock: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncStocks.fulfilled, (state, action) => {
        return action.payload.res;
      })
      .addCase(updateAsyncStock.fulfilled, (state, action) => {
        const { res } = action.payload;
        if (res.status === "success") {
          state = state.filter((x) => x.id !== res.stock.id);
          return [...state, res.stock];
        }
      })
      .addCase(deleteAsyncStock.fulfilled, (state, action) => {
        const { res } = action.payload;
        if (res.status === "success") {
          return state.filter((stock) => stock.id != res.id);
        }
      })
      .addCase(addAsyncStock.fulfilled, (state, action) => {
        console.log(action.payload);
        state.push(action.payload.res);
        return state;
      });
  },
});

export default stockSlice.reducer;
export const { addStock } = stockSlice.actions;
