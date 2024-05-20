import React from 'react'
import {
    getRequest,
  } from "../../../services/httpMethods";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

  const initialState = {
    listTrangThai: [],
  };

  export const trangThaiCaLamSlice = createSlice({
    name: "trangThai",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchTrangThai.fulfilled, (state, action) => {
        state.listTrangThai = action.payload;
      });
    },
  });

  export const fetchTrangThai = createAsyncThunk(
    "trangThai/fetchTrangThai",
    async () => {
      try {
        const res = await getRequest("trang-thai-dang-ki-ca-lam-viec");
        console.log("res", res.data.value);
        return res.data.value;
      } catch (error) {
        console.log("Có lỗi xảy ra");
      }
    }
  );

export default trangThaiCaLamSlice