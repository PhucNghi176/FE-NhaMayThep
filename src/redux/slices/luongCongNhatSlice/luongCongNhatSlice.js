import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  token: "",
  listLuongCongNhat: [],
  luongCongNhatSelectedRow: null,
};

export const luongCongNhatSlice = createSlice({
  name: "luong_cong_nhat",
  initialState,
  reducers: {
    selectedLuongCongNhat: (state, action) => {
      state.luongCongNhatSelectedRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterLuongCongNhat.fulfilled, (state, action) => {
        state.listLuongCongNhat = action.payload;
      })
      .addCase(createLuongCongNhat.fulfilled, (state, action) => {
        state.listLuongCongNhat.push(action.payload);
      })
      .addCase(updateLuongCongNhat.fulfilled, (state, action) => {
        const updatedLuongCongNhat = action.payload;
        const index = state.listLuongCongNhat.findIndex(
          (luongCongNhat) => luongCongNhat.id === updatedLuongCongNhat.id
        );
        if (index !== -1) {
          state.listLuongCongNhat[index] = updatedLuongCongNhat;
        }
      });
  },
});

// FILTER LUONG CONG NHAT
export const filterLuongCongNhat = createAsyncThunk(
  "luong_cong_nhat/filterLuongCongNhat",
  async (value) => {
    try {
      let { PageNo, PageSize, MaSoNhanVien, Luong1Gio, SoGioLam } = value;
      const res = await getRequestParams("luong-cong-nhat/filter", {
        PageNo,
        PageSize,
        MaSoNhanVien,
        Luong1Gio,
        SoGioLam,
      });
      console.log("res", res.data);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST - CREATE LUONG CONG NHAT
export const createLuongCongNhat = createAsyncThunk(
  "luong_cong_nhat/createLuongCongNhat",
  async (newLuongCongNhat, { rejectWithValue }) => {
    try {
      const res = await postRequest("luong-cong-nhat", newLuongCongNhat);
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
export const deleteLuongCongNhat = createAsyncThunk(
  "luong_cong_nhat/deleteLuongCongNhat",
  async (id) => {
    try {
      const res = await deleteRequest(`luong-cong-nhat/${id}`);
      console.log("response:", res);
      return id;
    } catch (error) {
      console.log({ error });
    }
  }
);

// PUT - UPDATE LUONG CONG NHAT
export const updateLuongCongNhat = createAsyncThunk(
  "luong_cong_nhat/updateLuongCongNhat",
  async ({ updatedLuongCongNhat }) => {
    try {
      const res = await putRequest("luong-cong-nhat", updatedLuongCongNhat);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default luongCongNhatSlice;
export const { selectedLuongCongNhat } = luongCongNhatSlice.actions;
