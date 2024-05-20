import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  deleteRequest,
  getRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  danhSachHopDong: [],
  selectedHopDong: null,
};

export const hopDongSlice = createSlice({
  name: "hopDong",
  initialState,
  reducers: {
    setSelectedHopDong: (state, action) => {
      state.selectedHopDong = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterHopDong.fulfilled, (state, action) => {
      state.danhSachHopDong = action.payload;
    });
  },
});

export const fetchHopDong = createAsyncThunk(
  "hopDong/fetchHopDong",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams("hop-dong/phan-trang", {
        PageNumber,
        PageSize,
      });
      console.log("resQWER", res.data);
      return res.data;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const filterHopDong = createAsyncThunk(
  "hopDong/filterHopDong",
  async (value) => {
    try {
      let {
        PageNumber,
        PageSize,
        LoaiHopDongID,
        NgayKy,
        BoPhanLamViec,
        ChucVuID,
        ChucDanhID,
        PhuCapID,
      } = value;
      const res = await getRequestParams("hop-dong/filter-hop-dong", {
        PageNumber,
        PageSize,
        LoaiHopDongID,
        NgayKy,
        BoPhanLamViec,
        ChucVuID,
        ChucDanhID,
        PhuCapID,
      });
      console.log("res-filter", res.data);
      return res.data;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const fetchHopDongByID = createAsyncThunk(
  "hopDong/fetchHopDongByID",
  async (id) => {
    try {
      const res = await getRequest(`hop-dong/${id}`);
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const deleteHopDong = createAsyncThunk(
  "hopDong/deleteHopDong",
  async (id) => {
    try {
      const res = await deleteRequest(`hop-dong/${id}`);
      console.log("res", res);
      message.success("Xoá thành công", 1.5);
    } catch (error) {
      console.log("Có lỗi xảy ra");
      message.error("Có lỗi xảy ra", 1.5);
    }
  }
);

export const createHopDong = createAsyncThunk(
  "hopDong/createHopDong",
  async (value) => {
    try {
      let {
        maSoNhanVien,
        loaiHopDongId,
        ngayKyHopDong,
        ngayKetThucHopDong,
        thoiHanHopDong,
        diaDiemLamViec,
        boPhanLamViec,
        chucDanhId,
        chucVuId,
        luongCoBan,
        heSoLuongId,
        phuCapId,
        ghiChu,
      } = value;
      const res = await postRequest(`hop-dong`, {
        maSoNhanVien,
        loaiHopDongId,
        ngayKyHopDong,
        ngayKetThucHopDong,
        thoiHanHopDong,
        diaDiemLamViec,
        boPhanLamViec,
        chucDanhId,
        chucVuId,
        luongCoBan,
        heSoLuongId,
        phuCapId,
        ghiChu,
      });
      console.log("res", res);
      // message.success("Thêm mới thành công!")
    } catch (error) {
      console.log("Có lỗi xảy ra");
      message.error("Có lỗi xảy ra");
    }
  }
);

export const updateHopDong = createAsyncThunk(
  "hopDong/updateHopDong",
  async (value) => {
    try {
      let {
        id,
        loaiHopDongId,
        ngayKyHopDong,
        ngayKetThucHopDong,
        thoiHanHopDong,
        diaDiemLamViec,
        boPhanLamViec,
        chucDanhId,
        chucVuId,
        luongCoBan,
        heSoLuongId,
        phuCapId,
        ghiChu,
      } = value;
      const res = await putRequest(`hop-dong`, {
        id,
        loaiHopDongId,
        ngayKyHopDong,
        ngayKetThucHopDong,
        thoiHanHopDong,
        diaDiemLamViec,
        boPhanLamViec,
        chucDanhId,
        chucVuId,
        luongCoBan,
        heSoLuongId,
        phuCapId,
        ghiChu,
      });
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

// export const importHopDong = createAsyncThunk(
//   "hopDong/importHopDong",
//   async ({ file }) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await postRequestMultipartFormData('/upload', formData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export default hopDongSlice;
export const { setSelectedHopDong } = hopDongSlice.actions;
