import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  listDangKyCaLam: [],
  selectedRowCaLam: null,
};

export const dangKyCaLamSlice = createSlice({
  name: "dangKyCaLam",
  initialState,
  reducers: {
    setSelectedRowCaLam: (state, action) => {
      state.selectedRowCaLam = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCaLam.fulfilled, (state, action) => {
      state.listDangKyCaLam = action.payload;
    });
  },
});

export const fetchCaLam = createAsyncThunk(
  "dangKyCaLam/fetchCaLam",
  async () => {
    try {
      const res = await getRequest("dang-ki-ca-lam");
      console.log("resQWER", res.data.value);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const fetchCaLamByID = createAsyncThunk(
  "dangKyCaLam/fetchCaLamByID",
  async (id) => {
    try {
      const res = await getRequest(`dang-ki-ca-lam/${id}`);
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const deleteCaLam = createAsyncThunk(
  "dangKyCaLam/deleteCaLam",
  async (id) => {
    try {
      const res = await deleteRequest(`dang-ki-ca-lam/${id}`);
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const createCaLam = createAsyncThunk(
  "dangKyCaLam/createCaLam",
  async (value) => {
    try {
      let {
        maSoNhanVien,
        ngayDangKi,
        caDangKi,
        thoiGianCaLamBatDau,
        thoiGianCaLamKetThuc,
        thoiGianChamCongBatDau,
        thoiGianChamCongKetThuc,
        heSoNgayCong,
        maSoNguoiQuanLy,
        trangThai,
        ghiChu,
      } = value;
      const res = await postRequest(`dang-ki-ca-lam`, {
        maSoNhanVien,
        ngayDangKi,
        caDangKi,
        thoiGianCaLamBatDau,
        thoiGianCaLamKetThuc,
        thoiGianChamCongBatDau,
        thoiGianChamCongKetThuc,
        heSoNgayCong,
        maSoNguoiQuanLy,
        trangThai,
        ghiChu,
      });
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const updateCaLam = createAsyncThunk(
  "dangKyCaLam/updateCaLam",
  async (value) => {
    try {
      let {
        id,
        maSoNhanVien,
        ngayDangKi,
        caDangKi,
        thoiGianCaLamBatDau,
        thoiGianCaLamKetThuc,
        thoiGianChamCongBatDau,
        thoiGianChamCongKetThuc,
        heSoNgayCong,
        maSoNguoiQuanLy,
        trangThai,
        ghiChu,
      } = value;
      const res = await putRequest(`dang-ki-ca-lam`, {
        id,
        maSoNhanVien,
        ngayDangKi,
        caDangKi,
        thoiGianCaLamBatDau,
        thoiGianCaLamKetThuc,
        thoiGianChamCongBatDau,
        thoiGianChamCongKetThuc,
        heSoNgayCong,
        maSoNguoiQuanLy,
        trangThai,
        ghiChu,
      });
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const checkInCaLam = createAsyncThunk(
  "dangKyCaLam/checkInCaLam",
  async (id) => {
    try {
      const res = await postRequest(`CheckIn/${id}`);
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const checkOutCaLam = createAsyncThunk(
  "dangKyCaLam/checkOutCaLam",
  async (id) => {
    try {
      const res = await postRequest(`CheckOut/${id}`);
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);


export default dangKyCaLamSlice;
export const { setSelectedRowCaLam } = dangKyCaLamSlice.actions;
