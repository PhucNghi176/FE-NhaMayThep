import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest } from "../../../services/httpMethods";

const initialState = {
  listDangVien: [],
  selectedRowDV: null,
};

export const dangVienSlice = createSlice({
  name: "dangVien",
  initialState,
  reducers: {
    selectedDangVien: (state, action) => {
      state.selectedRowDV = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getListDangVien.fulfilled, (state, action) => {
        state.listDangVien = action.payload;
      })
      .addCase(createDangVien.fulfilled, (state, action) => {
        state.listDangVien.push(action.payload);
      })
      .addCase(updateDangVien.fulfilled, (state, action) => {
        const update = action.payload;
        const index = state.listDangVien.findIndex(dangVien => dangVien.id === update.id);
        if (index !== -1) {
          state.listDangVien[index] = update;
        }
      })
      .addCase(deleteDangVien.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.listDangVien = state.listDangVien.filter(dangVien => dangVien.id !== idToDelete)
      })
  },
});

export const getListDangVien = createAsyncThunk(
  "dangVien/getListDangVien",
  async (value) => {
    try {
      let {
        PageNumber,
        PageSize,
        DonViCongTacID,
        ChucVuDangID,
        TrinhDoChinhTriID,
        NgayVaoDang,
        CapDangVienID
      } = value
      const res = await getRequestParams("thong-tin-dang-vien/filter-thong-tin-dang-vien", {
        PageNumber,
        PageSize,
        DonViCongTacID,
        ChucVuDangID,
        TrinhDoChinhTriID,
        NgayVaoDang,
        CapDangVienID
      });
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST - create
export const createDangVien = createAsyncThunk(
  "dangVien/createDangVien",
  async (newDangVien, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await postRequest("thong-tin-dang-vien", newDangVien);
      console.log("resCreateDangVien: ", res);
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
export const updateDangVien = createAsyncThunk(
  "dangVien/updateDangVien",
  async ({ updatedDangVien }) => {
    try {
      const res = await putRequest("thong-tin-dang-vien", updatedDangVien)
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
export const deleteDangVien = createAsyncThunk(
  "dangVien/deleteDangVien",
  async (id) => {
    try {
      const res = await deleteRequest(`thong-tin-dang-vien/${id}`);
      console.log("response: ", res);
      return id;
    } catch (error) {
      console.log({ error })
    }
  }
);

export default dangVienSlice;
export const { selectedDangVien } = dangVienSlice.actions;