import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
  getRequestParams,
} from "../../../services/httpMethods";
import { handleDangNhap } from "../../../configs/axiosInstance";

const initialState = {
  token: "",
  listNhanVien: [],
  selectedRow: null,
  nhanVienID: null,
  selectItem: false,
};

export const nhanVienSlice = createSlice({
  name: "nhan_vien",
  initialState,
  reducers: {
    selectedNhanVien: (state, action) => {
      state.selectedRow = action.payload;
    },
    selectedItem: (state, action) => {
      state.selectItem = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.token = action.payload;
        handleDangNhap(action.payload);
      })
      .addCase(getListNhanVien.fulfilled, (state, action) => {
        state.listNhanVien = action.payload;
      })
      .addCase(filterNhanVien.fulfilled, (state, action) => {
        state.listNhanVien = action.payload;
      })
      .addCase(createNhanVien.fulfilled, (state, action) => {
        state.listNhanVien.push(action.payload);
        state.nhanVienID = action.payload;
      })
      .addCase(updateNhanVien.fulfilled, (state, action) => {
        const updatedNhanVien = action.payload;
        const index = state.listNhanVien.findIndex(
          (nhanVien) => nhanVien.id === updatedNhanVien.id
        );
        if (index !== -1) {
          state.listNhanVien[index] = updatedNhanVien;
        }
      })
      .addCase(deleteNhanVien.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.listNhanVien = state.listNhanVien.filter(
          (nhanVien) => nhanVien.id !== idToDelete
        );
      });
  },
});

export const authenticateUser = createAsyncThunk(
  "nhan_vien/authenticateUser",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const user = {
        email: email,
        password: password,
      };
      const res = await postRequest("nhan-vien/login", {
        user,
      });

      // Store the value field in sessionStorage
      if (res.status === 200) {
        let value = JSON.stringify(res.data.value);
        value = value.replace(/^"|"$/g, ""); // Remove the double quotes
        sessionStorage.setItem("value", value);
      }

      return {
        data: res.data.value,
        status: res.status,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GET
export const getListNhanVien = createAsyncThunk(
  "nhan_vien/getListNhanVien",
  async (value) => {
    try {
      let { PageNumber, PageSize } = value;
      const res = await getRequestParams("nhan-vien/get-all", {
        PageNumber,
        PageSize
      });
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

//Filter
export const filterNhanVien = createAsyncThunk(
  "nhan_vien/filterNhanVien",
  async (value) => {
    try {
      let {
        PageNumber,
        PageSize,
        Email,
        HoVaTen,
        chucvuID,
        tinhtranglamviecID,
        CanCuocCongDan,
      } = value;
      const res = await getRequestParams("nhan-vien/filter-nhan-vien", {
        PageNumber,
        PageSize,
        Email,
        HoVaTen,
        chucvuID,
        tinhtranglamviecID,
        CanCuocCongDan,
      });
      return res.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST - create
export const createNhanVien = createAsyncThunk(
  "nhan_vien/createNhanVien",
  async (newNhanVien, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await postRequest("nhan-vien", newNhanVien);
      console.log("res", res);
      if (res.data.status === 400) {
        return rejectWithValue(res.data.detail);
      }
      return res.data.value;
      //return fulfillWithValue(res.data.value);
    } catch (error) {
      console.log(error.detail);
    }
  }
);

// PUT - Update
export const updateNhanVien = createAsyncThunk(
  "nhan_vien/updateNhanVien",
  async ({ updatedNhanVien }) => {
    try {
      const res = await putRequest("nhan-vien", updatedNhanVien);
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
export const deleteNhanVien = createAsyncThunk(
  "nhan_vien/deleteNhanVien",
  async (id) => {
    try {
      const res = await deleteRequest(`nhan-vien/${id}`);
      console.log("response: ", res);
      return id;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default nhanVienSlice;
export const { selectedNhanVien, selectedItem } = nhanVienSlice.actions;
