import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest } from "../../../services/httpMethods";

const initialState = {
    lichSuCongTac: [],
    selectedRowCongTac: null,
};

export const lichSuCongTacSlice = createSlice({
    name: "congTac",
    initialState,
    reducers: {
        selectedCongTac: (state, action) => {
            state.selectedRowCongTac = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getListCongTac.fulfilled, (state, action) => {
                state.lichSuCongTac = action.payload;
            })
            .addCase(createLichSuCongTac.fulfilled, (state, action) => {
                state.lichSuCongTac.push(action.payload);
            })
            .addCase(updateLichSuCongTac.fulfilled, (state, action) => {
                const update = action.payload;
                const index = state.lichSuCongTac.findIndex(nhanVien => nhanVien.id === update.id);
                if (index !== -1) {
                    state.lichSuCongTac[index] = update;
                }
            })
            .addCase(deleteLichSuCongTac.fulfilled, (state, action) => {
                const idToDelete = action.payload;
                state.lichSuCongTac = state.lichSuCongTac.filter(nhanVien => nhanVien.id !== idToDelete)
            })
    },
});

export const getListCongTac = createAsyncThunk(
    "congTac/getListCongTac",
    async (value) => {
        try {
            let {
                PageNumber,
                PageSize,
                MaSoNhanVien,
                HoVaTen,
                LoaiCongTacID,
                NgayBatDau,
                NgayKetThuc,
                NoiCongTac
            } = value
            const res = await getRequestParams("lich-su-cong-tac/filter-lich-su-cong-tac", {
                PageNumber,
                PageSize,
                MaSoNhanVien,
                HoVaTen,
                LoaiCongTacID,
                NgayBatDau,
                NgayKetThuc,
                NoiCongTac
            });
            return res.data;
        } catch (error) {
            console.log({ error });
        }
    }
);

// POST - create
export const createLichSuCongTac = createAsyncThunk(
    "congTac/createLichSuCongTac",
    async (newLichSuCongTac, { rejectWithValue, fulfillWithValue }) => {
        try {
            const res = await postRequest("lich-su-cong-tac-nhan-vien", newLichSuCongTac);
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
export const updateLichSuCongTac = createAsyncThunk(
    "congTac/updateLichSuCongTac",
    async ({ updateLichSuCongTac }) => {
        try {
            const res = await putRequest("lich-su-cong-tac-nhan-vien", updateLichSuCongTac)
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
export const deleteLichSuCongTac = createAsyncThunk(
    "congTac/deleteLichSuCongTac",
    async (id) => {
        try {
            const res = await deleteRequest(`lich-su-cong-tac-nhan-vien/${id}`);
            console.log("resDelete: ", res);
            return id;
        } catch (error) {
            console.log({ error })
        }
    }
);

export default lichSuCongTacSlice;
export const { selectedCongTac } = lichSuCongTacSlice.actions;