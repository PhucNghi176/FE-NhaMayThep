import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterHopDong,
  setSelectedHopDong,
} from "../../redux/slices/hopDongSlice/hopDongSlice";
import { getCapBacLuong, getHopDong } from "../../redux/selector";
import { Pagination, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { fetchCapBacLuong } from "../../redux/slices/CapBacLuongSlice/CapBacLuongSlice";

const HopDongTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const danhSachHopDong = useSelector(getHopDong);
  const capBacLuong = useSelector(getCapBacLuong)

  useEffect(() => {
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(filterHopDong(data));
    dispatch(fetchCapBacLuong())
  }, []);

  function formatCurrency(amount) {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
      return "Invalid amount";
    }

    const formattedAmount = numericAmount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    return formattedAmount.replace("₫", "VND");
  }

  function formatMonths(months) {
    const numericMonths = parseFloat(months);
  
    if (isNaN(numericMonths)) {
      return "Invalid input";
    }
  
    return `${numericMonths} tháng`;
  }
  

  const listHopDong = danhSachHopDong?.data?.map((item) => ({
    loaiHopDong: item.loaiHopDong,
    tenNhanVien: item.tenNhanVien,
    chucDanh: item.chucDanh,
    chucVu: item.chucVu,
    phuCap: item.phuCap,
    id: item.id,
    nhanVienID: item.nhanVienID,
    loaiHopDongId: item.loaiHopDongId,
    ngayKy: item.ngayKy,
    ngayKetThuc: item.ngayKetThuc,
    thoiHanHopDong: item.thoiHanHopDong,
    diaDiemLamViec: item.diaDiemLamViec,
    boPhanLamViec: item.boPhanLamViec,
    chucDanhId: item.chucDanhID,
    chucVuId: item.chucVuID,
    luongCoBan: item.luongCoBan,
    heSoLuongId: item.heSoLuongID,
    phuCapID: item.phuCapID,
    ghiChu: item.ghiChu,
  }));
  console.log("999", listHopDong);

  const listLuong = capBacLuong?.value?.map((item) => ({
    label: item.name,
    value: item.id
  }));


  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Loại Hợp Đồng",
      dataIndex: "loaiHopDong",
      key: "loaiHopDong",
    },
    {
      title: "Tên Nhân Viên",
      dataIndex: "tenNhanVien",
      key: "tenNhanVien",
    },
    {
      title: "Địa điểm làm việc",
      dataIndex: "diaDiemLamViec",
      key: "diaDiemLamViec",
    },
    {
      title: "Ngày Ký",
      dataIndex: "ngayKy",
      key: "ngayKy",
      render: (text, record) => {
        const entryDate = moment(text);
        const creationDate = moment(record.ngayKy);
        const formattedDateTime = entryDate.format('DD/MM/YYYY');
        return (
            <div>
                {formattedDateTime}
                <span> - {creationDate.format('HH:mm:ss')}</span>
            </div>
        );
    },
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "ngayKetThuc",
      key: "ngayKetThuc",
      render: (text, record) => {
        const entryDate = moment(text);
        const creationDate = moment(record.ngayKetThuc);
        const formattedDateTime = entryDate.format('DD/MM/YYYY');
        return (
            <div>
                {formattedDateTime}
                <span> - {creationDate.format('HH:mm:ss')}</span>
            </div>
        );
    },
    },
    {
      title: "Thời Hạn Hợp Đồng",
      dataIndex: "thoiHanHopDong",
      key: "thoiHanHopDong",
      render: (text, record) => formatMonths(record.thoiHanHopDong),
    },
    {
      title: "Bộ Phận Làm Việc",
      dataIndex: "boPhanLamViec",
      key: "boPhanLamViec",
    },
    {
      title: "Chức Danh",
      dataIndex: "chucDanh",
      key: "chucDanh",
    },
    {
      title: "Chức Vụ",
      dataIndex: "chucVu",
      key: "chucVu",
    },
    {
      title: "Lương Cơ Bản",
      dataIndex: "luongCoBan",
      key: "luongCoBan",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Hệ Số Lương",
      dataIndex: "heSoLuongId",
      key: "heSoLuongId",
      render: (heSoLuongId) => {
        const heSoLuong =listLuong &&listLuong.find((item) => item.value === heSoLuongId);
        return heSoLuong ? heSoLuong.label : "";
      },
    },
    {
      title: "Phụ Cấp",
      dataIndex: "phuCap",
      key: "phuCap",
    },
    {
      title: "Ghi Chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys123: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      dispatch(setSelectedHopDong(selectedRows));
    },

    getCheckboxProps: (record) => ({
      id: record.id,
    }),
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    const PageNumber = page;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    dispatch(filterHopDong(data))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        }
        tip="Loading..."
      >
        <Table
          rowKey="id"
          tableLayout="auto"
          bordered
          size="small"
          columns={columns}
          dataSource={listHopDong}
          scroll={{
            x: 2000,
          }}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          pagination={false}
        />
      </Spin>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={listHopDong?.length}
        />
      </div>
    </div>
  );
};

export default HopDongTable;
