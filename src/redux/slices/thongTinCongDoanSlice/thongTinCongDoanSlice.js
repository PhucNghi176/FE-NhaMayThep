import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  token: "",
  listThongTinCongDoan: [],
  thongTincongDoanSelectedRow: null,
};

export const thongTinCongDoanSlice = createSlice({
  name: "thong_tin_cong_doan",
  initialState,
  reducers: {
    selectedThongTinCongDoan: (state, action) => {
      state.thongTincongDoanSelectedRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListThongTinCongDoan.fulfilled, (state, action) => {
        state.listThongTinCongDoan = action.payload;
      })
      .addCase(filterThongTinCongDoan.fulfilled, (state, action) => {
        state.listThongTinCongDoan = action.payload;
      })
      .addCase(createThongTinCongDoan.fulfilled, (state, action) => {
        state.listThongTinCongDoan.push(action.payload);
      })
      .addCase(updateThongTinCongDoan.fulfilled, (state, action) => {
        const updatedThongTinCongDoan = action.payload;
        const index = state.listThongTinCongDoan.findIndex(
          (thongTinCongDoan) =>
            thongTinCongDoan.id === updatedThongTinCongDoan.id
        );
        if (index !== -1) {
          state.listThongTinCongDoan[index] = updatedThongTinCongDoan;
        }
      });
  },
});

// GET THONG TIN CONG DOAN
export const getListThongTinCongDoan = createAsyncThunk(
  "thong_tin_cong_doan/getListThongTinCongDoan",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams(
        "thong-tin-cong-doan/get-all/phan-trang",
        {
          PageNumber,
          PageSize,
        }
      );
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log({ error });
    }
  }
);

// FILTER THONG TIN CONG DOAN
export const filterThongTinCongDoan = createAsyncThunk(
  "thong_tin_cong_doan/filterThongTinCongDoan",
  async (value) => {
    try {
      let { PageNumber, PageSize, Id, NhanVienId, TenNhanVien, NgayGiaNhap } =
        value;
      const res = await getRequestParams(
        "thong-tin-cong-doan/filter-thong-tin-cong-doan",
        { PageNumber, PageSize, Id, NhanVienId, TenNhanVien, NgayGiaNhap }
      );
      console.log("res", res.data.value);
      return res.data.value;
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST - CREATE THONG TIN CONG DOAN
function convertStringToBoolean(str) {
  return str === "true" ? true : str === "false" ? false : undefined;
}

export const createThongTinCongDoan = createAsyncThunk(
  "thong_tin_cong_doan/createThongTinCongDoan",
  async (newThongTinCongDoan, { rejectWithValue }) => {
    try {
      newThongTinCongDoan.thuKyCongDoan = convertStringToBoolean(
        newThongTinCongDoan.thuKyCongDoan
      );
      const res = await postRequest(
        "thong-tin-cong-doan/create",
        newThongTinCongDoan
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

// DELETE THONG TIN CONG DOAN
export const deleteThongTinCongDoan = createAsyncThunk(
  "thong_tin_cong_doan/deleteThongTinCongDoan",
  async (id) => {
    try {
      const res = await deleteRequest(`thong-tin-cong-doan/delete/${id}`);
      console.log("response:", res);
      return id;
    } catch (error) {
      console.log({ error });
    }
  }
);

// PUT - UPDATE THONG TIN CONG DOAN
export const updateThongTinCongDoan = createAsyncThunk(
  "thong_tin_cong_doan/updateThongTinCongDoan",
  async ({ updatedThongTinCongDoan }) => {
    try {
      const res = await putRequest(
        "thong-tin-cong-doan/update",
        updatedThongTinCongDoan
      );
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default thongTinCongDoanSlice;
export const { selectedThongTinCongDoan } = thongTinCongDoanSlice.actions;
