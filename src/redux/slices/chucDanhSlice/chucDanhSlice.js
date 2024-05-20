import React from "react";
import { getRequest } from "../../../services/httpMethods";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  listChucDanh: [],
};

export const chucDanhSlice = createSlice({
  name: "chucDanh",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChucDanh.fulfilled, (state, action) => {
      state.listChucDanh = action.payload;
    });
  },
});

export const fetchChucDanh = createAsyncThunk(
  "chucDanh/fetchChucDanh",
  async () => {
    try {
      const res = await getRequest("chuc-danh");
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default chucDanhSlice;
