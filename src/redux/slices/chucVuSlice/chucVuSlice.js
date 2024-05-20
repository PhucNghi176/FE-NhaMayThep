import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listChucVu: [],
};

export const chucVuSlice = createSlice({
  name: "chucVu",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getListChucVu.fulfilled, (state, action) => {
      state.listChucVu = action.payload;
    });
  },
});

export const getListChucVu = createAsyncThunk(
  "chucVu/getListChucVu",
  async () => {
    try {
      const res = await getRequest("chuc-vu");
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default chucVuSlice;
