import {
    getRequest,
  } from "../../../services/httpMethods";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

  const initialState = {
    listPhuCap: [],
  };

  export const phuCapSlice = createSlice({
    name: "phuCap",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchPhuCap.fulfilled, (state, action) => {
        state.listPhuCap = action.payload;
      });
    },
  });

  export const fetchPhuCap = createAsyncThunk(
    "phuCap/fetchPhuCap",
    async () => {
      try {
        const res = await getRequest("thong-tin-phu-cap");
        console.log("res", res);
        return res.data.value;
      } catch (error) {
        console.log("Có lỗi xảy ra");
      }
    }
  );

export default phuCapSlice