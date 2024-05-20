import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";
import { message } from "antd";

const initialState = {
  TTDT: [],
  selectedTTDT: null,
};

export const TTDTSlice = createSlice({
  name: "thongTinDaoTao",
  initialState,
  reducers: {
    setSelectedTTDT: (state, action) => {
      state.selectedTTDT = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTTDT.fulfilled, (state, action) => {
      state.TTDT = action.payload;
    })
    .addCase(filterTTDT.fulfilled, (state, action) => {
      state.TTDT = action.payload;
    })
  },
});

export const filterTTDT = createAsyncThunk(
  "thongTinDaoTao/filterTTDT",
  async (value) => {
    try {
      let {
        PageNumber,
        PageSize,
        TrinhDoVanHoa,
        MaTrinhDoHocVanID,
        NhanVienID,
        TenTruong,
        ChuyenNganh,
        NamTotNghiep,
      } = value;
      const res = await getRequestParams("thong-tin-dao-tao/filter-thong-tin-dao-tao", {
        PageNumber,
        PageSize,
        TrinhDoVanHoa,
        MaTrinhDoHocVanID,
        NhanVienID,
        TenTruong,
        ChuyenNganh,
        NamTotNghiep,
      });
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchTTDT = createAsyncThunk(
  "thongTinDaoTao/fetchTTDT",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams("thong-tin-dao-tao/phan-trang", {
        PageNumber,
        PageSize,
      });
      console.log("", res.data);
      return res.data;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

// export const fetchHopDongByID = createAsyncThunk(
//   "hopDong/fetchHopDongByID",
//   async (id) => {
//     try {
//       const res = await getRequest(`hop-dong/${id}`);
//       console.log("res", res);
//       return res.data.value;
//     } catch (error) {
//       console.log("Có lỗi xảy ra");
//     }
//   }
// );

export const deleteTTDT = createAsyncThunk(
  "thongTinDaoTao/deleteTTDT",
  async (id) => {
    try {
      const res = await deleteRequest(`thong-tin-dao-tao/${id}`);
      console.log("res", res);
      // message.success("Xoá thành công", 1.5);
    } catch (error) {
      console.log("Có lỗi xảy ra");
      // message.error("Có lỗi xảy ra", 1.5);
    }
  }
);

export const createTTDT = createAsyncThunk(
  "thongTinDaoTao/createTTDT",
  async (value) => {
    try {
      let {
        nhanVienId,
        maTrinhDoHocVanId,
        tenTruong,
        chuyenNganh,
        namTotNghiep,
        trinhDoVanHoa,
      } = value;
      const res = await postRequest(`thong-tin-dao-tao`, {
        nhanVienId,
        maTrinhDoHocVanId,
        tenTruong,
        chuyenNganh,
        namTotNghiep,
        trinhDoVanHoa,
      });
      console.log("res", res);
      // message.success("Thêm mới thành công!")
    } catch (error) {
      console.log("Có lỗi xảy ra");
      message.error("Có lỗi xảy ra");
    }
  }
);

export const updateTTDT = createAsyncThunk(
  "thongTinDaoTao/updateTTDT",
  async (value) => {
    try {
      let {
        id,
        tenTruong,
        chuyenNganh,
        namTotNghiep,
        trinhDoVanHoa,
        maTrinhDoHocVanId,
      } = value;
      const res = await putRequest(`thong-tin-dao-tao`, {
        id,
        tenTruong,
        chuyenNganh,
        namTotNghiep,
        trinhDoVanHoa,
        maTrinhDoHocVanId,
      });
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default TTDTSlice;
export const { setSelectedTTDT } = TTDTSlice.actions;
