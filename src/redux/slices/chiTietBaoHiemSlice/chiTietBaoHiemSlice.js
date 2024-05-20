import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  token: "",
  listChiTietBaoHiem: [],
  chiTietBaoHiemSelectedRow: null,
};

export const chiTietBaoHiemSlice = createSlice({
  name: "chi_tiet_bao_hiem",
  initialState,
  reducers: {
    selectedChiTietBaoHiem: (state, action) => {
      state.chiTietBaoHiemSelectedRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListChiTietBaoHiem.fulfilled, (state, action) => {
        state.listChiTietBaoHiem = action.payload;
      })
      .addCase(filterChiTietBaoHiem.fulfilled, (state, action) => {
        state.listChiTietBaoHiem = action.payload;
      })
      .addCase(createChiTietBaoHiem.fulfilled, (state, action) => {
        state.listChiTietBaoHiem.push(action.payload);
      })
      .addCase(updateChiTietBaoHiem.fulfilled, (state, action) => {
        const updatedChiTietBaoHiem = action.payload;
        const index = state.listChiTietBaoHiem.findIndex(
          (chiTietBaoHiem) => chiTietBaoHiem.id === updatedChiTietBaoHiem.id
        );
        if (index !== -1) {
          state.listChiTietBaoHiem[index] = updatedChiTietBaoHiem;
        }
      });
  },
});

// GET CHI TIET BAO HIEM
export const getListChiTietBaoHiem = createAsyncThunk(
  "chi_tiet_bao_hiem/getListChiTietBaoHiem",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams(
        "chi-tiet-bao-hiem/get-all/phan-trang",
        {
          PageNumber,
          PageSize,
        }
      );
      console.log("res", res.data.value);
      return res.data.value;
    } catch (error) {
      console.log({ error });
    }
  }
);

// FILTER CHI TIET BAO HIEM
export const filterChiTietBaoHiem = createAsyncThunk(
  "chi_tiet_bao_hiem/filterChiTietBaoHiem",
  async (value) => {
    try {
      let {
        PageNumber,
        PageSize,
        Id,
        MaBaoHiem,
        TenBaohiem,
        MaNhanVien,
        TenNhanVien,
        NgayHieuLuc,
        NgayKetThuc,
      } = value;
      const res = await getRequestParams(
        "chi-tiet-bao-hiem/filter-chi-tiet-bao-hiem",
        {
          PageNumber,
          PageSize,
          Id,
          MaBaoHiem,
          TenBaohiem,
          MaNhanVien,
          TenNhanVien,
          NgayHieuLuc,
          NgayKetThuc,
        }
      );
      console.log("res", res.data.value);
      return res.data.value;
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST - CREATE CHI TIET BAO HIEM
export const createChiTietBaoHiem = createAsyncThunk(
  "chi_tiet_bao_hiem/createChiTietBaoHiem",
  async (newChiTietBaoHiem, { rejectWithValue }) => {
    try {
      const res = await postRequest(
        "chi-tiet-bao-hiem/create",
        newChiTietBaoHiem
      );
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

// DELETE CHI TIET BAO HIEM
export const deleteChiTietBaoHiem = createAsyncThunk(
  "chi_tiet_bao_hiem/deleteChiTietBaoHiem",
  async (id) => {
    try {
      const res = await deleteRequest(`chi-tiet-bao-hiemn/delete/${id}`);
      console.log("response:", res);
      return id;
    } catch (error) {
      console.log({ error });
    }
  }
);

// PUT - UPDATE CHI TIET BAO HIEM
export const updateChiTietBaoHiem = createAsyncThunk(
  "chi_tiet_bao_hiem/updateChiTietBaoHiem",
  async ({ updatedChiTietBaoHiem }) => {
    try {
      const res = await putRequest(
        "chi-tiet-bao-hiem/update",
        updatedChiTietBaoHiem
      );
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default chiTietBaoHiemSlice;
export const { selectedChiTietBaoHiem } = chiTietBaoHiemSlice.actions;
