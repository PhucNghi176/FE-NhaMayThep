import React from "react";
import { getRequest } from "../../../services/httpMethods";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCapBacLuong: [],
};

export const capBacLuongSlice = createSlice({
  name: "capBacLuong",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCapBacLuong.fulfilled, (state, action) => {
      state.listCapBacLuong = action.payload;
    });
  },
});

export const fetchCapBacLuong = createAsyncThunk(
  "capBacLuong/fetchCapBacLuong",
  async () => {
    try {
      const res = await getRequest("cap-bac-luong/get-all");
      console.log("res", res);
      return res.data;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default capBacLuongSlice;
