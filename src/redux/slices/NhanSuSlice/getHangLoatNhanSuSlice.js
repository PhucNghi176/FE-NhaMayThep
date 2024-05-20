import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listHangLoatNhanSu: [],
};

export const hangLoatNhanSuSlice = createSlice({
  name: "hangLoatNhanSu",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getListHangLoatNhanSu.fulfilled, (state, action) => {
      state.listHangLoatNhanSu = action.payload;
    });
  },
});

export const getListHangLoatNhanSu = createAsyncThunk(
  "hangLoatNhanSu/getListHangLoatNhanSu",
  async () => {
    try {
      const res = await getRequest("hang-loat/qua-trinh-nhan-su");
      return res.data;
    } catch (error) {
      console.log("Có lỗi xảy ra: ", error);
    }
  }
);

export default hangLoatNhanSuSlice;
