import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listDonViCongTac: [],
};

export const donViCongTacSlice = createSlice({
  name: "donViCongTac",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getListDonViCongTac.fulfilled, (state, action) => {
      state.listDonViCongTac = action.payload;
    });
  },
});

export const getListDonViCongTac = createAsyncThunk(
  "donViCongTac/getListDonViCongTac",
  async () => {
    try {
      const res = await getRequest("don-vi-cong-tac/getAll");
      console.log("resDonViCongTac: ", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default donViCongTacSlice;