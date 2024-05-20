import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listLoaiNghiPhep: [],
};

export const loaiNghiPhepSlice = createSlice({
  name: "loaiNghiPhep",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getListLoaiNghiPhep.fulfilled, (state, action) => {
      state.listLoaiNghiPhep = action.payload;
    });
  },
});

export const getListLoaiNghiPhep = createAsyncThunk(
  "loaiNghiPhep/getListLoaiNghiPhep",
  async () => {
    try {
      const res = await getRequest("loai-nghi-phep");
    //   console.log("resLoaiNghiPhep: ", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default loaiNghiPhepSlice;