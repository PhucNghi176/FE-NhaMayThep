import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../../services/httpMethods";

const initialState = {
  listLoaiQuaTrinh: [],
};

export const loaiQuaTrinhSlice = createSlice({
  name: "loaiQuaTrinh",
  initialState,
  extraReducers: (builder) => {},
});

export const getListLoaiQuaTrinh = createAsyncThunk(
  "loaiQuaTrinh/getListLoaiQuaTrinh",
  async () => {
    try {
      const res = await getRequest("thong-tin-qua-trinh-nhan-su");
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default loaiQuaTrinhSlice;
