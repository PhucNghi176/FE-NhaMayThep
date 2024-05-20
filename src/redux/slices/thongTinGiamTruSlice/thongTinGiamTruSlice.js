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
  listTTGiamTru: [],
  selectedRowTTGiamTru: null,
};

export const thongTinGiamTruSlice = createSlice({
  name: "thongTinGiamTru",
  initialState,
  reducers: {
    setSelectedRowTTGiamTru: (state, action) => {
      state.selectedRowTTGiamTru = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTTGiamTru.fulfilled, (state, action) => {
      state.listTTGiamTru = action.payload;
    })
  },
});

export const fetchTTGiamTru = createAsyncThunk(
  "thongTinGiamTru/fetchTTGiamTru",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams("thong-tin-giam-tru/phan-trang", {
        PageNumber,
        PageSize,
      });
      console.log("resQWER", res.data.value);
      return res.data;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const fetchTTGiamTruByID = createAsyncThunk(
  "thongTinGiamTru/fetchTTGiamTruByID",
  async (id) => {
    try {
      const res = await getRequest(`Thong-Tin-Giam-Tru/${id}`);
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const deleteTTGiamTru = createAsyncThunk(
  "thongTinGiamTru/deleteTTGiamTru",
  async (Id) => {
    try {
      const res = await deleteRequest(`Thong-Tin-Giam-Tru/${Id}`);
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const createGiamTru = createAsyncThunk(
  "thongTinGiamTru/createTTGiamTru",
  async (value) => {
    try {
      let { name,soTienGiamTru } = value;
      const res = await postRequest(`Thong-Tin-Giam-Tru`, {
        name,soTienGiamTru
      });
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
      message.error("Có lỗi xảy ra");
    }
  }
);

export const updateTTGiamTru = createAsyncThunk(
  "thongTinGiamTru/updateTTGiamTru",
  async (value) => {
    try {
      let { id, name,soTienGiamTru } = value;
      const res = await putRequest(`Thong-Tin-Giam-Tru`, {
        id, name,soTienGiamTru
      });
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default thongTinGiamTruSlice;
export const { setSelectedRowTTGiamTru } = thongTinGiamTruSlice.actions;
