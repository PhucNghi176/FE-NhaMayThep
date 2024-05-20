import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listLoaiCongTac: [],
};

export const loaiCongTacSlice = createSlice({
  name: "loaiCongTac",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getListLoaiCongTac.fulfilled, (state, action) => {
      state.listLoaiCongTac = action.payload;
    });
  },
});

export const getListLoaiCongTac = createAsyncThunk(
  "loaiCongTac/getListLoaiCongTac",
  async () => {
    try {
      const res = await getRequest("loai-cong-tac");
    //   console.log("resLoaiNghiPhep: ", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default loaiCongTacSlice;