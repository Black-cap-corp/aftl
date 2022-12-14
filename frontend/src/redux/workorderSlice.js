import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/AppConstant";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAsyncWorkorder = createAsyncThunk(
  "workorder/getAsync",
  async (filter) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/workorder`,
      { filter },
      {
        headers: {
          authorization: jwt,
        },
      }
    );
    return { res: res.data };
  }
);

export const updateAsyncWorkorder = createAsyncThunk(
  "workorder/updateAsync",
  async (workorder) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/workorder/update`, workorder, {
      headers: {
        authorization: jwt,
      },
    });

    return {
      res: {
        status: res.data.status,
        workorder: workorder,
      },
    };
  }
);

export const deleteAsyncWorkorder = createAsyncThunk(
  "workorder/deleteAsync",
  async (id) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(
      `${BASE_URL}/workorder/delete`,
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

export const addAsyncWorkorder = createAsyncThunk(
  "workorder/addAsync",
  async (workorder) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/workorder/add`, workorder, {
      headers: {
        authorization: jwt,
      },
    });
    return { res: res.data?._doc };
  }
);

const workorderSlice = createSlice({
  name: "workorders",
  initialState: [],
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncWorkorder.fulfilled, (state, action) => {
        return action.payload.res;
      })
      .addCase(updateAsyncWorkorder.fulfilled, (state, action) => {
        const { res } = action.payload;
        if (res.status === "success") {
          console.log(res.workorder);
          state = state.filter((x) => x.id !== res.workorder.id);
          return [...state, res.workorder];
        }
      })
      .addCase(deleteAsyncWorkorder.fulfilled, (state, action) => {
        const { res } = action.payload;
        if (res.status === "success") {
          return state.filter((workorder) => workorder.id != res.id);
        }
      })
      .addCase(addAsyncWorkorder.fulfilled, (state, action) => {
        console.log(action.payload.res);
        state = [
          ...state,
          { ...action.payload?.res, id: action.payload?.res?._id },
        ];

        return state;
      });
  },
});

export default workorderSlice.reducer;
