import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "../../../services/httpMethods";

const initialState = {
  listBaoHiem: [],
  baoHiemSelectedRow: null,
};

export const baoHiemSlice = createSlice({
  name: "bao_hiem",
  initialState,
  reducers: {
    selectedBaoHiem: (state, action) => {
      state.baoHiemSelectedRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListBaoHiem.fulfilled, (state, action) => {
        state.listBaoHiem = action.payload;
      })
      .addCase(createBaoHiem.fulfilled, (state, action) => {
        state.listBaoHiem.push(action.payload);
      })
      .addCase(deleteBaoHiem.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.listBaoHiem = state.listBaoHiem.filter(
          (baoHiem) => baoHiem.id !== idToDelete
        );
      })
      .addCase(updateBaoHiem.fulfilled, (state, action) => {
        const updateBaoHiem = action.payload;
        const index = state.listBaoHiem.findIndex(
          (baoHiem) => baoHiem.id === updateBaoHiem.id
        );
        if (index !== -1) {
          state.listBaoHiem[index] = updateBaoHiem;
        }
      });
  },
});

export const getListBaoHiem = createAsyncThunk(
  "bao_hiem/getListBaoHiem",
  async () => {
    try {
      const res = await getRequest("bao-hiem");
      console.log("res", res);
      return res.data;
    } catch (error) {
      console.log("Có lỗi xảy ra");
    }
  }
);

// GET BAO HIEM
/* export const getListBaoHiem = createAsyncThunk(
  "bao_hiem/getListBaoHiem",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams("bao-hiem/phan-trang", {
        PageNumber,
        PageSize,
      });
      console.log("res", res);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
); */

// POST - CREATE BAO HIEM
export const createBaoHiem = createAsyncThunk(
  "bao_hiem/createBaoHiem",
  async (newBaoHiem, { rejectWithValue }) => {
    try {
      const res = await postRequest("bao-hiem", newBaoHiem);
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

// DELETE BAO HIEM
export const deleteBaoHiem = createAsyncThunk(
  "bao_hiem/deleteBaoHiem",
  async (id) => {
    try {
      const res = await deleteRequest(`bao-hiem/${id}`);
      console.log("response:", res);
      return id;
    } catch (error) {
      console.log({ error });
    }
  }
);

// UPDATE BAO HIEM
export const updateBaoHiem = createAsyncThunk(
  "bao_hiem/updateBaoHiem",
  async ({ updatedBaoHiem }) => {
    try {
      const res = await putRequest("bao-hiem", updatedBaoHiem);
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default baoHiemSlice;
export const { selectedBaoHiem } = baoHiemSlice.actions;
