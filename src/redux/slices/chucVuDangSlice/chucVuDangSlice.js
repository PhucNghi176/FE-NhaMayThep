import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listChucVuDang: [],
};

export const chucVuDangSlice = createSlice({
  name: "chucVuDang",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getListChucVuDang.fulfilled, (state, action) => {
      state.listChucVuDang = action.payload;
    });
  },
});

export const getListChucVuDang = createAsyncThunk(
  "chucVuDang/getListChucVuDang",
  async () => {
    try {
      const res = await getRequest("thong-tin-chuc-vu-dang/get-all");
      console.log("resChucVuDang: ", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default chucVuDangSlice;