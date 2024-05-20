import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  token: "",
  listLuongThoiGian: [],
  luongThoiGianSelectedRow: null,
};

export const luongThoiGianSlice = createSlice({
  name: "luong_thoi_gian",
  initialState,
  reducers: {
    selectedLuongThoiGian: (state, action) => {
      state.luongThoiGianSelectedRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterLuongThoiGian.fulfilled, (state, action) => {
      state.listLuongThoiGian = action.payload;
    });
  },
});

// FILTER LUONG THOI GIAN
export const filterLuongThoiGian = createAsyncThunk(
  "luong_thoi_gian/filterLuongThoiGian",
  async (value) => {
    try {
      let {
        PageNo,
        PageSize,
        MaSoNhanVien,
        HoVaTen,
        LuongNam,
        LuongThang,
        LuongTuan,
        LuongNgay,
        LuongGio,
        NgayApDung,
      } = value;
      const res = await getRequestParams("luong-thoi-gian/filter", {
        PageNo,
        PageSize,
        MaSoNhanVien,
        HoVaTen,
        LuongNam,
        LuongThang,
        LuongTuan,
        LuongNgay,
        LuongGio,
        NgayApDung,
      });
      console.log("res", res.data);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST - CREATE LUONG THOI GIAN
export const createLuongThoiGian = createAsyncThunk(
  "luong_thoi_gian/createLuongThoiGian",
  async (newLuongThoiGian, { rejectWithValue }) => {
    try {
      const res = await postRequest("luong-thoi-gian", newLuongThoiGian);
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

// DELETE LUONG THOI GIAN
export const deleteLuongThoiGian = createAsyncThunk(
  "luong_thoi_gian/deleteLuongThoiGian",
  async (id) => {
    try {
      const res = await deleteRequest(`luong-thoi-gian/${id}`);
      console.log("response:", res);
      return id;
    } catch (error) {
      console.log({ error });
    }
  }
);

// PUT - UPDATE LUONG THOI GIAN
export const updateLuongThoiGian = createAsyncThunk(
  "luong_thoi_gian/updateLuongThoiGian",
  async ({ updatedLuongThoiGian }) => {
    try {
      const res = await putRequest("luong-thoi-gian", updatedLuongThoiGian);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default luongThoiGianSlice;
export const { selectedLuongThoiGian } = luongThoiGianSlice.actions;
