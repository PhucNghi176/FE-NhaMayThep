import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listMucSanPham: [],
};

export const mucSanPhamSlice = createSlice({
  name: "mucSanPham",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getListMucSanPham.fulfilled, (state, action) => {
      state.listMucSanPham = action.payload;
    });
  },
});

export const getListMucSanPham = createAsyncThunk(
  "mucSanPham/getListMucSanPham",
  async () => {
    try {
      const res = await getRequest("muc-san-pham");
      console.log("res", res.data);
      return res.data;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default mucSanPhamSlice;
