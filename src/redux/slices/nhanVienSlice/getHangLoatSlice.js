import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listHangLoat: [],
};

export const hangLoatSlice = createSlice({
  name: "hangLoat",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getListHangLoat.fulfilled, (state, action) => {
      state.listHangLoat = action.payload;
    });
  },
});

export const getListHangLoat = createAsyncThunk(
  "hangLoat/getListHangLoat",
  async () => {
    try {
      const res = await getRequest("hang-loat/nhan-vien");
      return res.data;
    } catch (error) {
      console.log("Có lỗi xảy ra: ", error);
    }
  }
);

export default hangLoatSlice;
