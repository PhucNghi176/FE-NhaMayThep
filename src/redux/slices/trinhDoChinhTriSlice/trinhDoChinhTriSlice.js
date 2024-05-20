import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listTrinhDoChinhTri: [],
};

export const trinhDoChinhTriSlice = createSlice({
  name: "trinhDoChinhTri",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getListTrinhDoChinhTri.fulfilled, (state, action) => {
      state.listTrinhDoChinhTri = action.payload;
    });
  },
});

export const getListTrinhDoChinhTri = createAsyncThunk(
  "trinhDoChinhTri/getListTrinhDoChinhTri",
  async () => {
    try {
      const res = await getRequest("thong-tin-trinh-do-chinh-tri/get-all");
      console.log("resTrinhDoChinhTri: ", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default trinhDoChinhTriSlice;