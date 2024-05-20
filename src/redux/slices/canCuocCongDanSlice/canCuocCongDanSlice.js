import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, deleteRequest, putRequest } from "../../../services/httpMethods";

const initialState = {
  listCanCuocCongDan: [],
  selectedRowCCCD: null,
};

export const canCuocCongDanSlice = createSlice({
  name: "canCuocCongDan",
  initialState,
  reducers: {
    selectedCCCD: (state, action) => {
      state.selectedRowCCCD = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getListCanCuocCongDan.fulfilled, (state, action) => {
        state.listCanCuocCongDan = action.payload;
      })
      .addCase(createCCCD.fulfilled, (state, action) => {
        state.listCanCuocCongDan.push(action.payload);
      })
      .addCase(updateCCCD.fulfilled, (state, action) => {
        const updateCCCD = action.payload;
        const index = state.listCanCuocCongDan.findIndex(nhanVien => nhanVien.CanCuocCongDan === updateCCCD.CanCuocCongDan);
        if (index !== -1) {
          state.listCanCuocCongDan[index] = updateCCCD;
        }
      })
      .addCase(deleteCCCD.fulfilled, (state, action) => {
        const cccdToDelete = action.payload;
        state.listCanCuocCongDan = state.listCanCuocCongDan.filter(nhanVien => nhanVien.CanCuocCongDan !== cccdToDelete)
      });
  },
});

// GET CCCD by ID Nhân viên
export const getListCanCuocCongDan = createAsyncThunk(
  "canCuocCongDan/getListCanCuocCongDan",
  async (value) => {
    try {
     const  NhanVienID = value;
      const res = await getRequestParams("can-cuoc-cong-dan/get-by-nhan-vien-id", {
       NhanVienID
      });
      // console.log("res", res);
      return res.data.value;
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST - create
function convertStringToBoolean(str) {
  return str === "true" ? true : str === "false" ? false : undefined;
};

export const createCCCD = createAsyncThunk(
  "canCuocCongDan/createCCCD",
  async (newCCCD, { rejectWithValue }) => {
    try {
      newCCCD.gioiTinh = convertStringToBoolean(newCCCD.gioiTinh);
      const res = await postRequest("can-cuoc-cong-dan", newCCCD);
      console.log("res", res);
      if (res.data.status === 400) {
        return rejectWithValue(res.data.detail)
      }
      return res.data;
    } catch (error) {
      console.log(error.detail);
    }
  }
);

// PUT - Update
export const updateCCCD = createAsyncThunk(
  "canCuocCongDan/updateCCCD",
  async ({ updatedCCCD }) => {
    try {
      console.log("updateCCCD: ", updatedCCCD)
      const res = await putRequest("can-cuoc-cong-dan", updatedCCCD)
      console.log("resUpdate: ", res);
      if (res.status === 200) {
        return res.data.value;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// Delete
export const deleteCCCD = createAsyncThunk(
  "canCuocCongDan/deleteCCCD",
  async (CanCuocCongDan) => {
    try {
      const res = await deleteRequest(`can-cuoc-cong-dan?CanCuocCongDan=${CanCuocCongDan}`);
      console.log("responseDeleteCCCD: ", res);
      return CanCuocCongDan;
    } catch (error) {
      console.log({ error })
    }
  }
);

export default canCuocCongDanSlice;
export const { selectedCCCD } = canCuocCongDanSlice.actions;