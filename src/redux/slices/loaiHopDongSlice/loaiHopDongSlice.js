import React from 'react'
import {
    getRequest,
  } from "../../../services/httpMethods";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

  const initialState = {
    listLoaiHopDong: [],
  };

  export const loaiHopDongSlice = createSlice({
    name: "loaiHopDong",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchLoaiHopDong.fulfilled, (state, action) => {
        state.listLoaiHopDong = action.payload;
      });
    },
  });

  export const fetchLoaiHopDong = createAsyncThunk(
    "loaiHopDong/fetchLoaiHopDong",
    async () => {
      try {
        const res = await getRequest("loai-hop-dong");
        console.log("res", res);
        return res.data.value;
      } catch (error) {
        console.log("Có lỗi xảy ra");
      }
    }
  );

export default loaiHopDongSlice