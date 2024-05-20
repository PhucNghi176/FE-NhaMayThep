import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listCapDangVien: [],
};

export const capDangVienSlice = createSlice({
  name: "capDangVien",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getListCapDangVien.fulfilled, (state, action) => {
      state.listCapDangVien = action.payload;
    });
  },
});

export const getListCapDangVien = createAsyncThunk(
  "capDangVien/getListCapDangVien",
  async () => {
    try {
      const res = await getRequest("thong-tin-cap-dang-vien/get-all");
      console.log("resCapDangVien: ", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default capDangVienSlice;