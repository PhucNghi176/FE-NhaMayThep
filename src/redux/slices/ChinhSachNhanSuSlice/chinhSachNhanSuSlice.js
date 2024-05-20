import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  listChinhSach: [],
  //   selectedTTDT: null,
};

export const chinhSachNhanSuSlice = createSlice({
  name: "chinhSachNhanSu",
  initialState,
  //   reducers:{
  //     setSelectedTTDT:(state,action) =>{
  //       state.selectedTTDT = action.payload;
  //     }
  //   },
  extraReducers: (builder) => {
    builder.addCase(fetchChinhSachNhanSu.fulfilled, (state, action) => {
      state.listChinhSach = action.payload;
    });
  },
});

export const fetchChinhSachNhanSu = createAsyncThunk(
  "chinhSachNhanSu/fetchChinhSachNhanSu",
  async () => {
    try {
      const res = await getRequest("chinh-sach-nhan-su");
      console.log("RES", res.data);
      return res.data;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const deleteChinhSachNhanSu = createAsyncThunk(
  "chinhSachNhanSu/deleteChinhSachNhanSu",
  async (Id) => {
    try {
      const res = await deleteRequest(`chinh-sach-nhan-su/${Id}`);
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const createChinhSachNhanSu = createAsyncThunk(
  "chinhSachNhanSu/createChinhSachNhanSu",
  async (value) => {
    try {
      let { name, mucDo, ngayHieuLuc, noiDung } = value;
      const res = await postRequest(`chinh-sach-nhan-su`, {
        name,
        mucDo,
        ngayHieuLuc,
        noiDung,
      });
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const updateChinhSachNhanSu = createAsyncThunk(
  "chinhSachNhanSu/updateChinhSachNhanSu",
  async (value) => {
    try {
      let { id, name, mucDo, ngayHieuLuc, noiDung } = value;
      const res = await putRequest(`chinh-sach-nhan-su`, {
        id,
        name,
        mucDo,
        ngayHieuLuc,
        noiDung,
      });
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default chinhSachNhanSuSlice;
