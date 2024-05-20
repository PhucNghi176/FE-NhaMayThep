export const tokenSelector = (state) => state.nhanVienSlice.token;

export const getListTinhTrangLamViec = (state) =>
  state.tinhTrangLamViec.listTinhTrangLamViec;

export const getHopDong = (state) => state.hopDong.danhSachHopDong;

export const getLoaiHopDong = (state) => state.loaiHopDong.listLoaiHopDong;

export const getChucDanh = (state) => state.chucDanh.listChucDanh;

export const getChucVu = (state) => state.chucVu.listChucVu;

export const getPhuCap = (state) => state.phuCap.listPhuCap;

export const getHangLoat = (state) => state.hangLoatHopDong.listHangLoatHopDong;

export const getSelectedHopDong = (state) => state.hopDong.selectedHopDong;

export const getTTDT = (state) => state.thongTinDaoTao.TTDT;

export const getListNhanVienSelector = (state) =>
  state.nhanVienSlice.listNhanVien;

export const getSelectedRowNV = (state) => state.nhanVienSlice.selectedRow;

export const getSelectedItem = (state) => state.nhanVienSlice.selectItem;

export const getSelectedTTDT = (state) => state.thongTinDaoTao.selectedTTDT;

export const getTrinhDoHocVan = (state) => state.trinhDoHocVan.trinhDo;

export const getCapBacLuong = (state) => state.capBacLuong.listCapBacLuong;

export const getKyLuat = (state) => state.kyLuat.listKyLuat;

export const getSelectedKyLuat = (state) => state.kyLuat.selectedRows;

export const getChinhSachNhanSu = (state) =>
  state.chinhSachNhanSu.listChinhSach;

export const getChucVuSelector = (state) => state.chucVu.listChucVu;

export const getHangLoatSelector = (state) => state.hangLoat.listHangLoat;

export const getBaoHiemRow = (state) => state.baoHiem.baoHiemSelectedRow;

export const getListBaoHiemSelector = (state) => state.baoHiem.listBaoHiem;

export const getListChiTietBaoHiemSelector = (state) =>
  state.chiTietBaoHiem.listChiTietBaoHiem;

export const getChiTietBaoHiemRow = (state) =>
  state.chiTietBaoHiem.chiTietBaoHiemSelectedRow;

export const getListNhanSuSelector = (state) => state.nhanSu.listNhanSu;

export const getNhanSuRow = (state) => state.nhanSu.nhanSuSelectedRow;

export const getHangLoatNhanSuSelector = (state) =>
  state.hangLoatNhanSu.listHangLoatNhanSu;

export const getCanCuocCongDanSelector = (state) =>
  state.canCuocCongDan.listCanCuocCongDan;

export const getSelectedRowCCCD = (state) =>
  state.canCuocCongDan.selectedRowCCCD;

export const getnhanVienIDSelector = (state) => state.nhanVienSlice.nhanVienID;

export const getListDangVienSelector = (state) => state.dangVien.listDangVien;

export const getSelectedRowDV = (state) => state.dangVien.selectedRowDV;

export const getListDonViCongTacSelector = (state) =>
  state.donViCongTac.listDonViCongTac;

export const getListChucVuDangSelector = (state) =>
  state.chucVuDang.listChucVuDang;

export const getListTrinhDoChinhTriSelector = (state) =>
  state.trinhDoChinhTri.listTrinhDoChinhTri;

export const getListCapDangVienSelector = (state) =>
  state.capDangVien.listCapDangVien;

export const getListKhenThuongSelector = (state) =>
  state.khenThuong.listKhenThuong;

export const getKhenThuongRow = (state) =>
  state.khenThuong.khenThuongSelectedRow;

export const getListThongTinCongDoanSelector = (state) =>
  state.thongTinCongDoan.listThongTinCongDoan;

export const getThongTinCongDoanRow = (state) =>
  state.thongTinCongDoan.thongTincongDoanSelectedRow;

export const lichSuNghiPhepSelector = (state) => state.nghiPhep.lichSuNghiPhep;

export const getNghiPhepRow = (state) => state.nghiPhep.selectedRowNghiPhep;

  export const loaiNghiPhepSelector = (state) => state.loaiNghiPhep.listLoaiNghiPhep;

export const lichSuCongTacSelector = (state) => state.congTac.lichSuCongTac;

export const getCongTacRow = (state) => state.congTac.selectedRowCongTac;

export const loaiCongTacSelector = (state) => state.loaiCongTac.listLoaiCongTac;

export const getDangKyCaLam = (state) => state.dangKyCaLam.listDangKyCaLam;

export const getCaLamRow = (state) => state.dangKyCaLam.selectedRowCaLam;

export const getTrangThai = (state) => state.trangThai.listTrangThai;

export const getListLuongCongNhatSelector = (state) =>
  state.luongCongNhat.listLuongCongNhat;

export const getLuongCongNhatRow = (state) =>
  state.luongCongNhat.luongCongNhatSelectedRow;

export const getListLuongSanPhamSelector = (state) =>
  state.luongSanPham.listLuongSanPham;

export const getLuongSanPhamRow = (state) =>
  state.luongSanPham.luongSanPhamSelectedRow;

export const getMucSanPham = (state) => state.mucSanPham.listMucSanPham;

export const getListLuongThoiGianSelector = (state) =>
  state.luongThoiGian.listLuongThoiGian;

export const getLuongThoiGianRow = (state) =>
  state.luongThoiGian.luongThoiGianSelectedRow;

export const getGiamTruRow = (state) => state.giamTru.selectedRowGiamTru;
export const getDeletedGiamTruRow = (state) => state.giamTru.selectedRowDeletedGiamTru;
export const getDeletedGiamTru = (state) => state.giamTru.listDaXoaGiamTru;
export const getGiamTru = (state) => state.giamTru.listGiamTru;
export const getTTGiamTru = (state) => state.thongTinGiamTru.listTTGiamTru;


export const tangLuongSelector = (state) => state.tangLuong.khaiBaoTangLuong;

export const getTangLuongRow = (state) => state.tangLuong.selectedRowTangLuong;  