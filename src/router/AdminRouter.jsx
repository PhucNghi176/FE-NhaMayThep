import { Route, Routes, useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import ProjectManagement from "../pages/Project/ProjectManagement";
import PositionManager from "../pages/Position/PositionManager";
import TechManagement from "../pages/Technology/TechManagement";
import QuanLyNhanVien from "../pages/QuanLyNV/QuanLyNhanVien";
// import GroupList from "../pages/QuaTrinhDaoTao/GroupList";
import InternList from "../pages/InternList/InternList";
import Dashboard from "../pages/Salary & deduction/Dashboard/Dashboard";
import ListZalo from "../pages/QuanLyZalo/ListZalo";
import Insurance from "../pages/BaoHiem/BaoHiem";
import NhanSu from "../pages/NhanSu/NhanSu";
import HopDong from "../pages/HopDong/HopDong";
import ThongTinDaoTao from "../pages/ThongTinDaoTao/ThongTinDaoTao";
import QuanLyDangVien from "../pages/QuaTrinhHoatDongDangVien/QuanLyDangVien";
import KyLuat from "../pages/KyLuat/KyLuat";
import KhenThuong from "../pages/KhenThuong/KhenThuong";
import ChiTietBaoHiem from "../pages/ChiTietBaoHiem/ChiTietBaoHiem";
import ThongTinCongDoan from "../pages/ThongTinCongDoan/ThongTinCongDoan";
import DangKyCaLam from "../pages/DangKyCaLam/DangKyCaLam";
import LichSuNghiPhep from "../pages/LichSuNghiPhep/LichSuNghiPhep";
import LichSuCongTac from "../pages/LichSuCongTac/LichSuCongTac";
import KhaiBaoTangLuong from "../pages/KhaiBaoTangLuong/KhaiBaoTangLuong";
import GiamTruGiaCanh from "../pages/GiamTruGiaCanh/GiamTruGiaCanh";
import LuongCongNhat from "../pages/LuongCongNhat/LuongCongNhat";
import LuongSanPham from "../pages/LuongSanPham/LuongSanPham";
import LuongThoiGian from "../pages/LuongThoiGian/LuongThoiGian";

const adminRoutesData = [
  { path: "QuanLyNhanVien", component: <QuanLyNhanVien /> },
  { path: "QuanLyDuAn", component: <ProjectManagement /> },
  { path: "QuanLyPhongBan", component: <PositionManager /> },
  // { path: "QuanLyCongNghe", component: <TechManagement /> },
  { path: "QuaTrinhDaoTao", component: <ThongTinDaoTao /> },
  { path: "QuaTrinhCongTac", component: <InternList /> },
  { path: "QuanLyZalo", component: <ListZalo /> },
  { path: "dashboard", component: <Dashboard /> },
  /*   { path: "BaoHiem", component: <Insurance /> }, */
  { path: "ChiTietBaoHiem", component: <ChiTietBaoHiem /> },
  { path: "QuaTrinhThamGiaDangVien", component: <QuanLyDangVien /> },
  { path: "HopDong", component: <HopDong /> },
  { path: "NhanSu", component: <NhanSu /> },
  { path: "KyLuat", component: <KyLuat /> },
  { path: "KhenThuong", component: <KhenThuong /> },
  { path: "HoatDongCongDoan", component: <ThongTinCongDoan /> },
  { path: "DangKyCaLam", component: <DangKyCaLam /> },
  { path: "LichSuNghiPhep", component: <LichSuNghiPhep /> },
  { path: "LichSuCongTac", component: <LichSuCongTac /> },
  { path: "KhaiBaoTangLuong", component: <KhaiBaoTangLuong /> },
  { path: "GiamTruGiaCanh", component: <GiamTruGiaCanh /> },
  { path: "LuongCongNhat", component: <LuongCongNhat /> },
  { path: "LuongSanPham", component: <LuongSanPham /> },
  { path: "LuongThoiGian", component: <LuongThoiGian /> },
];

const AdminRouter = () => {
  const nav = useNavigate();
  //   useEffect(() => {
  //     const isAdmin_key = sessionStorage.getItem('isAdmin_key');
  //     if (isAdmin_key === 'false') {
  //       message.error('Tài Khoản của bạn không được phép truy cập vào trang này!');
  //       nav('/staff');
  //     }
  //   }, [nav])

  return (
    <>
      <DefaultLayout>
        <Routes>
          {adminRoutesData.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </DefaultLayout>
    </>
  );
};

export default AdminRouter;
