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
  listKyLuat: [],
  selectedRows: null,
};

export const kyLuatSlice = createSlice({
  name: "kyLuat",
  initialState,
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchKyLuat.fulfilled, (state, action) => {
      state.listKyLuat = action.payload;
    })
    .addCase(filterKyLuat.fulfilled, (state, action) => {
      state.listKyLuat = action.payload;
    })
  },
});

export const filterKyLuat = createAsyncThunk(
  "kyLuat/filterKyLuat",
  async (value) => {
    try {
      let {
        PageNumber,
        PageSize,
        MaSoNhanVien,
        ChinhSachNhanSuID,
        TenDotKyLuat,
        NgayKiLuat,
        TongPhat
      } = value;
      const res = await getRequestParams(
        "ky-luat/filter-ky-luat",
        {
          PageNumber,
          PageSize,
          MaSoNhanVien,
          ChinhSachNhanSuID,
          TenDotKyLuat,
          NgayKiLuat,
          TongPhat
        }
      );
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchKyLuat = createAsyncThunk(
  "kyLuat/fetchKyLuat",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams("ky-luat/phan-trang", {
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

export const fetchKyLuatByID = createAsyncThunk(
  "kyLuat/fetchKyLuatByID",
  async (id) => {
    try {
      const res = await getRequest(`KyLuat/${id}`);
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const deleteKyLuat = createAsyncThunk(
  "kyLuat/deleteKyLuat",
  async (Id) => {
    try {
      const res = await deleteRequest(`KyLuat/${Id}`);
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const createKyLuat = createAsyncThunk(
  "kyLuat/createKyLuat",
  async (value) => {
    try {
      let { maSoNhanVien, chinhSachNhanSuID, tenDotKyLuat, tongPhat } = value;
      const res = await postRequest(`KyLuat`, {
        maSoNhanVien,
        chinhSachNhanSuID,
        tenDotKyLuat,
        tongPhat,
      });
      console.log("res", res);
      // message.success("Thêm mới thành công!")
    } catch (error) {
      console.log("Có lỗi xảy ra");
      message.error("Có lỗi xảy ra");
    }
  }
);

export const updateKyLuat = createAsyncThunk(
  "kyLuat/updateKyLuat",
  async (value) => {
    try {
      let { id, maNhanVien, chinhSachNhanSuID, tenDotKyLuat, tongPhat } = value;
      const res = await putRequest(`KyLuat`, {
        id,
        maNhanVien,
        chinhSachNhanSuID,
        tenDotKyLuat,
        tongPhat,
      });
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default kyLuatSlice;
export const { setSelectedRows } = kyLuatSlice.actions;
