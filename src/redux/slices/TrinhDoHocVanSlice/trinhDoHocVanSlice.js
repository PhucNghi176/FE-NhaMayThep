import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";
import { message } from "antd";

const initialState = {
  trinhDo: [],
//   selectedTTDT: null,
};

export const trinhDoHocVanSlice = createSlice({
  name: "trinhDoHocVan",
  initialState,
//   reducers:{
//     setSelectedTTDT:(state,action) =>{
//       state.selectedTTDT = action.payload;
//     }
//   },
  extraReducers: (builder) => {
    builder.addCase(fetchTrinhDoHocVan.fulfilled, (state, action) => {
      state.trinhDo = action.payload;
    });
  },
});

export const fetchTrinhDoHocVan = createAsyncThunk(
  "trinhDoHocVan/fetchTrinhDoHocVan",
  async () => {
    try {
      const res = await getRequest("trinh-do-hoc-van");
      console.log("ttt", res);
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

export const deleteTrinhDoHocVan= createAsyncThunk(
  "trinhDoHocVan/deleteTrinhDoHocVan",
  async (Id) => {
    try {
      const res = await deleteRequest(`trinh-do-hoc-van/${Id}`);
      console.log("res", res);
      // message.success("Xoá thành công", 1.5);
    } catch (error) {
      console.log("Có lỗi xảy ra");
      // message.error("Có lỗi xảy ra", 1.5);
    }
  }
);

export const createTrinhDoHocVan = createAsyncThunk(
  "trinhDoHocVan/createTrinhDoHocVan",
  async (value) => {
    try {
      let {
        tenTrinhDo
      } = value;
      const res = await postRequest(`trinh-do-hoc-van`, {
        tenTrinhDo
      });
      console.log("res", res);
      // message.success("Thêm mới thành công!")
    } catch (error) {
      console.log("Có lỗi xảy ra");
      message.error("Có lỗi xảy ra");
    }
  }
);

export default trinhDoHocVanSlice;
