import { configureStore } from "@reduxjs/toolkit";
import { nhanVienSlice } from "./slices/nhanVienSlice/nhanVienSlice";
import tinhTrangLamViecSlice from "./slices/tinhTrangLamViecSlice/tinhTrangLamViecSlice";
import chucVuSlice from "./slices/chucVuSlice/chucVuSlice";
import hangLoatSlice from "./slices/nhanVienSlice/getHangLoatSlice";
import baoHiemSlice from "./slices/baoHiemSlice/baoHiemSlice";
import nhanSuSlice from "./slices/NhanSuSlice/nhanSuSlice";
import canCuocCongDanSlice from "./slices/canCuocCongDanSlice/canCuocCongDanSlice";
import dangVienSlice from "./slices/dangVienSlice/dangVienSlice";
import hopDongSlice from "./slices/hopDongSlice/hopDongSlice";
import loaiHopDongSlice from "./slices/loaiHopDongSlice/loaiHopDongSlice";
import chucDanhSlice from "./slices/chucDanhSlice/chucDanhSlice";
import phuCapSlice from "./slices/phuCapSlice/phuCapSlice";
import getHangLoatSlice from "./slices/hopDongSlice/getHangLoatSlice";
import { TTDTSlice } from "./slices/thongTinDaoTaoSlice/thongTinDaoTaoSlice";
import trinhDoHocVanSlice from "./slices/TrinhDoHocVanSlice/trinhDoHocVanSlice";
import donViCongTacSlice from "./slices/donViCongTacSlice/donViCongTacSlice";
import chucVuDangSlice from "./slices/chucVuDangSlice/chucVuDangSlice";
import trinhDoChinhTriSlice from "./slices/trinhDoChinhTriSlice/trinhDoChinhTriSlice";
import capDangVienSlice from "./slices/capDangVienSlice/capDangVienSlice";
import capBacLuongSlice from "./slices/CapBacLuongSlice/CapBacLuongSlice";
import kyLuatSlice from "./slices/KyLuatSlice/kyLuatSlice";
import chinhSachNhanSuSlice from "./slices/ChinhSachNhanSuSlice/chinhSachNhanSuSlice";
import { KhenThuongSlice } from "./slices/khenThuongSlice/khenThuongSlice";
import hangLoatNhanSuSlice from "./slices/NhanSuSlice/getHangLoatNhanSuSlice";
import chiTietBaoHiemSlice from "./slices/chiTietBaoHiemSlice/chiTietBaoHiemSlice";
import thongTinCongDoanSlice from "./slices/thongTinCongDoanSlice/thongTinCongDoanSlice";
import lichSuNghiPhepSlice from "./slices/LichSuNghiPhepSlice/LichSuNghiPhepSlice";
import loaiNghiPhepSlice from "./slices/loaiNghiPhepSlice/loaiNghiPhepSlice";
import lichSuCongTacSlice from "./slices/lichSuCongTacSlice/lichSuCongTacSlice";
import loaiCongTacSlice from "./slices/loaiCongTacSlice/loaiCongTacSlice";
import dangKyCaLamSlice from "./slices/DangKyCaLamSlice/DangKyCaLamSlice";
import trangThaiCaLamSlice from "./slices/TrangThaiCaLamSlice/trangThaiCaLamSlice";
import giamTruGiaCanhSlice from "./slices/giamTruGiaCanhSlice/giamTruGiaCanhSlice";
import thongTinGiamTruSlice from "./slices/thongTinGiamTruSlice/thongTinGiamTruSlice";
import khaiBaoTangLuongSlice from "./slices/khaiBaoTangLuongSlice/khaiBaoTangLuongSlice";
import luongCongNhatSlice from "./slices/luongCongNhatSlice/luongCongNhatSlice";
import luongSanPhamSlice from "./slices/luongSanPhamSlice/luongSanPhamSlice"; 
import mucSanPhamSlice from "./slices/mucSanPhamSlice/mucSanPhamSlice";
import luongThoiGianSlice from "./slices/luongThoiGianSlice/luongThoiGianSlice";

const store = configureStore({
  reducer: {
    nhanVienSlice: nhanVienSlice.reducer,
    tinhTrangLamViec: tinhTrangLamViecSlice.reducer,
    hopDong: hopDongSlice.reducer,
    loaiHopDong: loaiHopDongSlice.reducer,
    chucDanh: chucDanhSlice.reducer,
    chucVu: chucVuSlice.reducer,
    phuCap: phuCapSlice.reducer,
    hangLoatHopDong: getHangLoatSlice.reducer,
    thongTinDaoTao: TTDTSlice.reducer,
    chucVu: chucVuSlice.reducer,
    baoHiem: baoHiemSlice.reducer,
    chiTietBaoHiem: chiTietBaoHiemSlice.reducer,
    hangLoat: hangLoatSlice.reducer,
    nhanSu: nhanSuSlice.reducer,
    hangLoatNhanSu: hangLoatNhanSuSlice.reducer,
    canCuocCongDan: canCuocCongDanSlice.reducer,
    dangVien: dangVienSlice.reducer,
    trinhDoHocVan: trinhDoHocVanSlice.reducer,
    donViCongTac: donViCongTacSlice.reducer,
    chucVuDang: chucVuDangSlice.reducer,
    trinhDoChinhTri: trinhDoChinhTriSlice.reducer,
    capDangVien: capDangVienSlice.reducer,
    capBacLuong: capBacLuongSlice.reducer,
    kyLuat: kyLuatSlice.reducer,
    chinhSachNhanSu: chinhSachNhanSuSlice.reducer,
    khenThuong: KhenThuongSlice.reducer,
    thongTinCongDoan: thongTinCongDoanSlice.reducer,
    nghiPhep: lichSuNghiPhepSlice.reducer,
    loaiNghiPhep: loaiNghiPhepSlice.reducer,
    congTac: lichSuCongTacSlice.reducer,
    loaiCongTac: loaiCongTacSlice.reducer,
    dangKyCaLam: dangKyCaLamSlice.reducer,
    trangThai: trangThaiCaLamSlice.reducer,
    giamTru: giamTruGiaCanhSlice.reducer,
    thongTinGiamTru: thongTinGiamTruSlice.reducer,
    tangLuong: khaiBaoTangLuongSlice.reducer,
    luongCongNhat: luongCongNhatSlice.reducer,
    luongSanPham: luongSanPhamSlice.reducer,
    mucSanPham: mucSanPhamSlice.reducer,
    luongThoiGian: luongThoiGianSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
