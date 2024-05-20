import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listTinhTrangLamViec: [],
};

export const tinhTrangLamViecSlice = createSlice({
  name: "tinhTrangLamViec",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchListTinhTrang.fulfilled, (state, action) => {
      state.listTinhTrangLamViec = action.payload;
    });
  },
});

export const fetchListTinhTrang = createAsyncThunk(
  "tinhTrangLamViec/fetchListTinhTrang",
  async () => {
    try {
      const res = await getRequest("hop-dong");
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default tinhTrangLamViecSlice;
