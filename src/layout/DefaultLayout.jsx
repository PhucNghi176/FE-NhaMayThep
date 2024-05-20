import { Button, Layout, Tooltip } from "antd";
import PropTypes from "prop-types";
import setImage from "../assets/logo-color.png";
const { Header, Sider } = Layout;
import { Content } from "antd/es/layout/layout";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import HeaderMenu from "../components/Header/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import "../styles/Layout.css";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items_for_test = [
  getItem("Thông tin nhân sự", "sub1", <TeamOutlined />, [
    getItem("Dashboard", "dashboard"),
    getItem("Quản lý nhân viên", "QuanLyNhanVien"),
    getItem("Hợp đồng lao động có thời hạn", "QuanLyZalo"),
    getItem("Hợp đồng lao động không thời hạn", "ab"),
    getItem("Quản lý quá trình", "g2", null, [
      getItem("Quá trình đào tạo", "QuaTrinhDaoTao"),
      getItem("Quá trình tham gia Đảng viên", "QuaTrinhThamGiaDangVien"),
      getItem("Quá trình khen thưởng", "KhenThuong"),
      getItem("Quá trình kỷ luật", "KyLuat"),
      getItem("Thuế thu nhập cá nhân", "5"),
    ]),
    getItem("Báo cáo thống kê hoạt động nhân sự", "g3", null, [
      getItem("Nhân sự", "NhanSu"),
      getItem("Hợp đồng lao động", "HopDong"),
      getItem("Hoạt động công đoàn", "HoatDongCongDoan"),
    ]),

    getItem("Xuất dữ liệu", "g4", null, [
      getItem("Các loại đơn", "9"),
      getItem("Các loại hóa đơn", "10"),
    ]),
  ]),

  getItem("Quản lý công tác làm việc", "sub2", <TeamOutlined />, [
    getItem("Nghỉ phép", ""),
    getItem("Loại nghỉ phép", "LoaiNghiPhep"),
    getItem("Tăng ca", "g7", null, [
      getItem("Đăng ký ca làm việc", "DangKyCaLam"),
      getItem("Tăng ca làm thêm", "12"),
    ]),
    getItem("Báo cáo quá trình làm việc", "g8", null, [
      getItem("Báo cáo quá trình công tác", "LichSuCongTac"),
      getItem("Báo cáo lịch sử nghỉ phép", "LichSuNghiPhep"),
      getItem("Báo cáo tổng thời gian làm việc", "15"),
      getItem("Báo cáo thống kê đi trễ - về sớm", "16"),
    ]),
  ]),

  getItem("Tính lương & các khoản giảm trừ", "sub3", <CalculatorOutlined />, [
    getItem("Khai báo hệ số tiền lương và mức lương", "QuanLyDuAn"),
    getItem("Lương theo thời gian", "LuongThoiGian"),
    getItem("Khai báo tăng lương", "KhaiBaoTangLuong"),
    getItem("Lương công nhật", "LuongCongNhat"),
    getItem("Lương sản phẩm", "LuongSanPham"),
    getItem("Báo cáo phân bổ lương sản phẩm", "g14"),
    getItem("Khai báo CT tính các khoản giảm trừ", "g15", null, [
      getItem("BHXH, BHYT, KPCĐ", "17"),
      getItem("Thuế TNCN + Giảm trừ gia cảnh", "GiamTruGiaCanh"),
      getItem("Trừ tạm ứng lương – tiền phạt", "19"),
      getItem("Phiếu lương", "20"),
    ]),
    getItem("Báo cáo tổng lương", "g16", null, [
      getItem("Báo cáo tiền lương tháng/quý/năm", "21"),
      getItem("Báo cáo thuế TNCN", "22"),
      getItem("Chi tiết bảo hiểm", "ChiTietBaoHiem"),
    ]),
  ]),
  //   getItem("Collaborators & Teams", "collaborators", <TeamOutlined />),
  //   getItem("My Task", "task", <SolutionOutlined />),
];

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const refreshTable = false;
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/homepage");
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <Spin
            size="large"
            style={{ fontSize: "77px", marginRight: "17px" }}
          ></Spin>
          <h1 style={{ color: "blue", marginTop: "33px", fontSize: "37px" }}>
            Vui Lòng Đợi Trong Giây Lát...
          </h1>
        </div>
      ) : (
        <>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={!collapsed}
              style={{ minHeight: "100vh", background: "white" }}
              width={270}
            >
              {collapsed && (
                <Tooltip title="To Homepage">
                  <img
                    style={{
                      objectFit: "cover",
                      backgroundRepeat: "no-repeat",
                      margin: "8px auto",
                      backgroundSize: "cover",
                      display: "block",
                      cursor: "pointer",
                    }}
                    src={setImage}
                  />
                </Tooltip>
              )}
              <SidebarMenu items={items_for_test} />
            </Sider>

            <Layout>
              <Header
                style={{
                  padding: "0",
                  background: "white",
                  boxShadow: "0 4px 2px -2px #ccc",
                  height: "50px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "55px",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      height: "50px",
                    }}
                  >
                    <Button
                      type="text"
                      icon={
                        collapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )
                      }
                      onClick={() => setCollapsed(!collapsed)}
                      style={{
                        fontSize: "16px",
                        width: 64,
                        height: 50,
                      }}
                    />
                  </div>
                  <div>
                    <HeaderMenu></HeaderMenu>
                  </div>
                </div>
              </Header>

              <Content style={{ margin: "10px 16px" }}>
                <div
                  style={{
                    padding: "10px 24px 0 24px",
                    minHeight: 360,
                    borderRadius: 30,
                  }}
                >
                  {children && children}
                </div>
              </Content>
            </Layout>
          </Layout>
        </>
      )}
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;
