import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  token: "",
  listKhenThuong: [],
  khenThuongSelectedRow: null,
};

export const KhenThuongSlice = createSlice({
  name: "khen_thuong",
  initialState,
  reducers: {
    selectedKhenThuong: (state, action) => {
      state.khenThuongSelectedRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListKhenThuong.fulfilled, (state, action) => {
        state.listKhenThuong = action.payload;
      })
      .addCase(filterKhenThuong.fulfilled, (state, action) => {
        state.listKhenThuong = action.payload;
      })
      .addCase(createKhenThuong.fulfilled, (state, action) => {
        state.listKhenThuong.push(action.payload);
      })
      .addCase(updateKhenThuong.fulfilled, (state, action) => {
        const updatedKhenThuong = action.payload;
        const index = state.listKhenThuong.findIndex(
          (khenThuong) => khenThuong.id === updatedKhenThuong.id
        );
        if (index !== -1) {
          state.listKhenThuong[index] = updatedKhenThuong;
        }
      });
  },
});

// GET KHEN THUONG
export const getListKhenThuong = createAsyncThunk(
  "khen_thuong/getListKhenThuong",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams("khen-thuong/phan-trang", {
        PageNumber,
        PageSize,
      });
      console.log("res", res);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// FILTER KHEN THUONG
export const filterKhenThuong = createAsyncThunk(
  "khen_thuong/filterKhenThuong",
  async (value) => {
    try {
      let {
        PageNumber,
        PageSize,
        MaSoNhanVien,
        ChinhSachNhanSuID,
        TenDotKhenThuong,
        NgayKhenThuong,
        TongThuong,
      } = value;
      const res = await getRequestParams("khen-thuong/filter-khen-thuong", {
        PageNumber,
        PageSize,
        MaSoNhanVien,
        ChinhSachNhanSuID,
        TenDotKhenThuong,
        NgayKhenThuong,
        TongThuong,
      });
      console.log("res", res.data);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST - CREATE KHEN THUONG
export const createKhenThuong = createAsyncThunk(
  "khen_thuong/createKhenThuong",
  async (newKhenThuong, { rejectWithValue }) => {
    try {
      const res = await postRequest("khenThuong", newKhenThuong);
      console.log("res", res);
      if (res.data.status === 400) {
        return rejectWithValue(res.data.detail);
      }
    } catch (error) {
      console.log(error.detail);
    }
  }
);

// DELETE KHEN THUONG
export const deleteKhenThuong = createAsyncThunk(
  "khen_thuong/deleteKhenThuong",
  async (Id) => {
    try {
      const res = await deleteRequest(`khenThuong/${Id}`);
      console.log("response:", res);
      return Id;
    } catch (error) {
      console.log({ error });
    }
  }
);

// UPDATE KHEN THUONG
export const updateKhenThuong = createAsyncThunk(
  "khen_thuong/updateKhenThuong",
  async ({ updatedKhenThuong }) => {
    try {
      const res = await putRequest("khenThuong", updatedKhenThuong);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default KhenThuongSlice;
export const { selectedKhenThuong } = KhenThuongSlice.actions;
