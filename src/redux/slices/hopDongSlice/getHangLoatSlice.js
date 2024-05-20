
import {
    getRequest,
  } from "../../../services/httpMethods";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

  const initialState = {
    listHangLoatHopDong: [],
  };

  export const getHangLoatSlice = createSlice({
    name: "hangLoatHopDong",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchHangLoatHopDong.fulfilled, (state, action) => {
        state.listHangLoatHopDong= action.payload;
      });
    },
  });

  export const fetchHangLoatHopDong = createAsyncThunk(
    "hangLoatHopDong/fetchHangLoatHopDong",
    async () => {
      try {
        const res = await getRequest("hang-loat/hop-dong");
        console.log("res123", res.data);
        return res.data;
      } catch (error) {
        console.log("Có lỗi xảy ra");
      }
    }
  );

export default getHangLoatSlice