import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  token: "",
  listLuongSanPham: [],
  luongSanPhamSelectedRow: null,
};

export const luongSanPhamSlice = createSlice({
  name: "luong_san_pham",
  initialState,
  reducers: {
    selectedLuongSanPham: (state, action) => {
      state.luongSanPhamSelectedRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterLuongSanPham.fulfilled, (state, action) => {
      state.listLuongSanPham = action.payload;
    });
  },
});

// FILTER LUONG SAN PHAM
export const filterLuongSanPham = createAsyncThunk(
  "luong_san_pham/filterLuongSanPham",
  async (value) => {
    try {
      let { PageNo, PageSize, MaSoNhanVien, SoSanPhamLam, MucSanPham } = value;
      const res = await getRequestParams("luong-san-pham/filter", {
        PageNo,
        PageSize,
        MaSoNhanVien,
        SoSanPhamLam,
        MucSanPham,
      });
      console.log("res", res.data);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST - CREATE LUONG SAN PHAM
export const createLuongSanPham = createAsyncThunk(
  "luong_san_pham/createLuongSanPham",
  async (newLuongSanPham, { rejectWithValue }) => {
    try {
      const res = await postRequest("luong-san-pham", newLuongSanPham);
      console.log("res", res);
      if (res.data.status === 400) {
        return rejectWithValue(res.data.detail);
      }
      return res.data;
    } catch (error) {
      console.log(error.detail);
    }
  }
);

// DELETE LUONG CONG NHAT
export const deleteLuongSanPham = createAsyncThunk(
  "luong_san_pham/deleteLuongSanPham",
  async (id) => {
    try {
      const res = await deleteRequest(`luong-san-pham/${id}`);
      console.log("response:", res);
      return id;
    } catch (error) {
      console.log({ error });
    }
  }
);

// PUT - UPDATE LUONG CONG NHAT
export const updateLuongSanPham = createAsyncThunk(
  "luong_san_pham/updateLuongSanPham",
  async ({ updatedLuongSanPham }) => {
    try {
      const res = await putRequest("luong-san-pham", updatedLuongSanPham);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default luongSanPhamSlice;
export const { selectedLuongSanPham } = luongSanPhamSlice.actions;
