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
  listGiamTru: [],
  listDaXoaGiamTru: [],
  selectedRowGiamTru: null,
  selectedRowDeletedGiamTru: null,
};

export const giamTruGiaCanhSlice = createSlice({
  name: "giamTru",
  initialState,
  reducers: {
    setSelectedRowGiamTru: (state, action) => {
      state.selectedRowGiamTru = action.payload;
    },
    setSelectedRowDeletedGiamTru: (state, action) => {
      state.selectedRowDeletedGiamTru = action.payload;
    },
    setListDaXoaGiamTru: (state, action) => {
      state.listDaXoaGiamTru = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiamTru.fulfilled, (state, action) => {
        state.listGiamTru = action.payload;
      })
      .addCase(filterGiamTru.fulfilled, (state, action) => {
        state.listGiamTru = action.payload;
      })
      .addCase(fetchDeletedGiamTru.fulfilled, (state, action) => {
        state.listDaXoaGiamTru = action.payload;
      });
  },
});

export const filterGiamTru = createAsyncThunk(
  "giamTru/filterGiamTru",
  async (value) => {
    try {
      let {
        PageNumber,
        PageSize,
        NhanVienID,
        TenNhanVien,
        MaGiamTruID,
        TenGiamTru,
        CanCuocCongDan,
        NgayXacNhanPhuThuoc,
        NgayTao,
      } = value;
      const res = await getRequestParams(
        "thong-tin-giam-tru-gia-canh/filter-thong-tin-giam-tru-gia-canh",
        {
          PageNumber,
          PageSize,
          NhanVienID,
          TenNhanVien,
          MaGiamTruID,
          TenGiamTru,
          CanCuocCongDan,
          NgayXacNhanPhuThuoc,
          NgayTao,
        }
      );
      return res.data.value;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchGiamTru = createAsyncThunk(
  "giamTru/fetchGiamTru",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams(
        "thong-tin-giam-tru-gia-canh/get-all/phan-trang",
        {
          PageNumber,
          PageSize,
        }
      );
      console.log("resQWER", res.data.value);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const fetchGiamTruByID = createAsyncThunk(
  "giamTru/fetchGiamTruByID",
  async (id) => {
    try {
      const res = await getRequest(`thong-tin-giam-tru-gia-canh/${id}`);
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const deleteGiamTru = createAsyncThunk(
  "giamTru/deleteGiamTru",
  async (Id) => {
    try {
      const res = await deleteRequest(
        `thong-tin-giam-tru-gia-canh/delete/${Id}`
      );
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const createGiamTru = createAsyncThunk(
  "giamTru/createGiamTru",
  async (value) => {
    try {
      let {
        nhanVienID,
        maGiamTruID,
        diaChiLienLac,
        quanHeVoiNhanVien,
        canCuocCongDan,
        ngayXacNhanPhuThuoc,
      } = value;
      const res = await postRequest(`thong-tin-giam-tru-gia-canh/create`, {
        nhanVienID,
        maGiamTruID,
        diaChiLienLac,
        quanHeVoiNhanVien,
        canCuocCongDan,
        ngayXacNhanPhuThuoc,
      });
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
      message.error("Có lỗi xảy ra");
    }
  }
);

export const updateGiamTru = createAsyncThunk(
  "giamTru/updateGiamTru",
  async (value) => {
    try {
      let {
        id,
        maGiamTruID,
        diaChiLienLac,
        quanHeVoiNhanVien,
        canCuocCongDan,
        ngayXacNhanPhuThuoc,
      } = value;
      const res = await putRequest(`thong-tin-giam-tru-gia-canh/update`, {
        id,
        maGiamTruID,
        diaChiLienLac,
        quanHeVoiNhanVien,
        canCuocCongDan,
        ngayXacNhanPhuThuoc,
      });
      console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const fetchDeletedGiamTru = createAsyncThunk(
  "giamTru/fetchDeletedGiamTru",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams(
        "thong-tin-giam-tru-gia-canh/get-all-deleted/phan-trang",
        {
          PageNumber,
          PageSize,
        }
      );
      console.log("resQWER", res.data.value);
      return res.data.value;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export const restoreGiamTru = createAsyncThunk(
  "giamTru/restoreGiamTru",
  async (value) => {
    let { id } = value;
    try {
      const res = await postRequest(`thong-tin-giam-tru-gia-canh/restore`, {
        id,
      });
      console.log("res", res);
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

export default giamTruGiaCanhSlice;
export const {
  setSelectedRowGiamTru,
  setListDaXoaGiamTru,
  setSelectedRowDeletedGiamTru,
} = giamTruGiaCanhSlice.actions;
