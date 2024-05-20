import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  token: "",
  listNhanSu: [],
  nhanSuSelectedRow: null,
};

export const nhanSuSlice = createSlice({
  name: "qua_trinh_nhan_su",
  initialState,
  reducers: {
    selectedNhanSu: (state, action) => {
      state.nhanSuSelectedRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListNhanSu.fulfilled, (state, action) => {
        state.listNhanSu = action.payload;
      })
      .addCase(filterNhanSu.fulfilled, (state, action) => {
        state.listNhanSu = action.payload;
      })
      .addCase(createNhanSu.fulfilled, (state, action) => {
        state.listNhanSu.push(action.payload);
      })
      .addCase(updateNhanSu.fulfilled, (state, action) => {
        const updatedNhanSu = action.payload;
        const index = state.listNhanSu.findIndex(
          (nhanSu) => nhanSu.id === updatedNhanSu.id
        );
        if (index !== -1) {
          state.listNhanSu[index] = updatedNhanSu;
        }
      });
  },
});

// GET NHAN SU
export const getListNhanSu = createAsyncThunk(
  "qua_trinh_nhan_su/getListNhanSu",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams("qua-trinh-nhan-su/phan-trang", {
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

// FILTER NHAN SU
export const filterNhanSu = createAsyncThunk(
  "qua_trinh_nhan_su/filterNhanSu",
  async (value) => {
    try {
      let {
        PageNumber,
        PageSize,
        NgayTao,
        MaSoNhanVien,
        LoaiQuaTrinhID,
        NgayBatDau,
        NgayKetThuc,
        PhongBanID,
        ChucVuID,
        ChucDanhID,
      } = value;
      const res = await getRequestParams(
        "qua-trinh-nhan-su/filter-qua-trinh-nhan-su",
        {
          PageNumber,
          PageSize,
          NgayTao,
          MaSoNhanVien,
          LoaiQuaTrinhID,
          NgayBatDau,
          NgayKetThuc,
          PhongBanID,
          ChucVuID,
          ChucDanhID,
        }
      );
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST - CREATE NHAN SU
export const createNhanSu = createAsyncThunk(
  "qua_trinh_nhan_su/createNhanSu",
  async (newNhanSu, { rejectWithValue }) => {
    try {
      const res = await postRequest("qua-trinh-nhan-su", newNhanSu);
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

// DELETE NHAN SU
export const deleteNhanSu = createAsyncThunk(
  "qua_trinh_nhan_su/deleteNhanSu",
  async (id) => {
    try {
      const res = await deleteRequest(`qua-trinh-nhan-su/${id}`);
      console.log("response:", res);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// UPDATE NHAN SU
export const updateNhanSu = createAsyncThunk(
  "qua_trinh_nhan_su/updateNhanSu",
  async ({ id, updatedNhanSu }) => {
    try {
      const res = await putRequest(`qua-trinh-nhan-su`, updatedNhanSu);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default nhanSuSlice;
export const { selectedNhanSu } = nhanSuSlice.actions;
