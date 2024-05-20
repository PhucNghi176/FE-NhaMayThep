import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest } from "../../../services/httpMethods";

const initialState = {
    lichSuNghiPhep: [],
    selectedRowNghiPhep: null,
};

export const lichSuNghiPhepSlice = createSlice({
    name: "nghiPhep",
    initialState,
    reducers: {
        selectedNghiPhep: (state, action) => {
            state.selectedRowNghiPhep = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getListNghiPhep.fulfilled, (state, action) => {
                state.lichSuNghiPhep = action.payload;
            })
            .addCase(createLichSuNghiPhep.fulfilled, (state, action) => {
                state.lichSuNghiPhep.push(action.payload);
            })
            .addCase(updateLichSuNghiPhep.fulfilled, (state, action) => {
                const update = action.payload;
                const index = state.lichSuNghiPhep.findIndex(nhanVien => nhanVien.id === update.id);
                if (index !== -1) {
                    state.lichSuNghiPhep[index] = update;
                }
            })
            .addCase(deleteLichSuNghiPhep.fulfilled, (state, action) => {
                const idToDelete = action.payload;
                state.lichSuNghiPhep = state.lichSuNghiPhep.filter(nhanVien => nhanVien.id !== idToDelete)
            })
    },
});

export const getListNghiPhep = createAsyncThunk(
    "nghiPhep/getListNghiPhep",
    async (value) => {
        try {
            let {
                PageNumber,
                PageSize,
                MaSoNhanVien,
                LoaiNghiPhepID,
                NgayBatDau,
                NgayKetThuc,
                NguoiDuyet,
                LyDo,
                TenNguoiDuyet,
                TenNhanVien,
                TenLoaiNghiPhep
            } = value
            const res = await getRequestParams("lich-su-nghi-phep/filter-lich-su-nghi-phep", {
                PageNumber,
                PageSize,
                MaSoNhanVien,
                LoaiNghiPhepID,
                NgayBatDau,
                NgayKetThuc,
                NguoiDuyet,
                LyDo,
                TenNguoiDuyet,
                TenNhanVien,
                TenLoaiNghiPhep
            });
            return res.data;
        } catch (error) {
            console.log({ error });
        }
    }
);

// POST - create
export const createLichSuNghiPhep = createAsyncThunk(
    "nghiPhep/createLichSuNghiPhep",
    async (newLichSuNghiPhep, { rejectWithValue, fulfillWithValue }) => {
        try {
            const res = await postRequest("lich-su-nghi-phep", newLichSuNghiPhep);
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
export const updateLichSuNghiPhep = createAsyncThunk(
    "nghiPhep/updateLichSuNghiPhep",
    async ({ updateLichSuNghiPhep }) => {
        try {
            const res = await putRequest("lich-su-nghi-phep", updateLichSuNghiPhep)
            console.log("resUpdate: ", res);
            if (res.status === 200) {
                return res.data.value;
            }
        } catch (error) {
            console.log({ error });
        }
    }
);

//Delete
export const deleteLichSuNghiPhep = createAsyncThunk(
    "nghiPhep/deleteLichSuNghiPhep",
    async (id) => {
        try {
            const res = await deleteRequest(`lich-su-nghi-phep/${id}`);
            console.log("resDelete: ", res);
            return id;
        } catch (error) {
            console.log({ error })
        }
    }
);

export default lichSuNghiPhepSlice;
export const { selectedNghiPhep } = lichSuNghiPhepSlice.actions;