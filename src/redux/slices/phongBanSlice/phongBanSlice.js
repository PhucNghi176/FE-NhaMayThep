import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listPhongBan: [],
};

export const phongBanSlice = createSlice({
  name: "phongBan",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getListPhongBan.fulfilled, (state, action) => {
      state.listPhongBan = action.payload;
    });
  },
});

export const getListPhongBan = createAsyncThunk(
  "phongBan/getListPhongBan",
  async () => {
    try {
      const res = await getRequest("phong-ban");
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default phongBanSlice;
