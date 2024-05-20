import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCaLamRow,
  getDangKyCaLam,
  getTrangThai,
} from "../../redux/selector";
import { Button, Spin, Table, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  checkInCaLam,
  checkOutCaLam,
  fetchCaLam,
  setSelectedRowCaLam,
} from "../../redux/slices/DangKyCaLamSlice/DangKyCaLamSlice";
import { fetchTrangThai } from "../../redux/slices/TrangThaiCaLamSlice/trangThaiCaLamSlice";

const DangKyCaLamTable = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const danhSachDangKyCaLam = useSelector(getDangKyCaLam);
  const listTrangThai = useSelector(getTrangThai);
  const selectedRow = useSelector(getCaLamRow);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(fetchCaLam());
    dispatch(fetchTrangThai());
  }, []);

  const listCaLam = danhSachDangKyCaLam?.map((item) => ({
    id: item.id,
    maSoNhanVien: item.maSoNhanVien,
    ngayDangKi: item.ngayDangKi,
    caDangKi: item.caDangKi,
    thoiGianCaLamBatDau: item.thoiGianCaLamBatDau,
    thoiGianCaLamKetThuc: item.thoiGianCaLamKetThuc,
    thoiGianChamCongBatDau: item.thoiGianChamCongBatDau,
    thoiGianChamCongKetThuc: item.thoiGianChamCongKetThuc,
    heSoNgayCong: item.heSoNgayCong,
    maSoNguoiQuanLy: item.maSoNguoiQuanLy,
    trangThai: item.trangThai,
    ghiChu: item.ghiChu,
  }));

  const renderTrangThai = listTrangThai?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleCheckIn = (id) => {
    dispatch(checkInCaLam(id))
      .then(() => {
        message.success('Check-in thành công!');
        dispatch(fetchCaLam());
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleCheckOut = (id) => {
    dispatch(checkOutCaLam(id))
      .then(() => {
        message.success('Check-out thành công!');
        dispatch(fetchCaLam());
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã số nhân viên",
      dataIndex: "maSoNhanVien",
      key: "maSoNhanVien",
    },
    {
      title: "Ngày đăng kí",
      dataIndex: "ngayDangKi",
      key: "ngayDangKi",
      render: (text, record) => {
        const entryDate = moment(text);
        const creationDate = moment(record.ngayDangKi);
        const formattedDateTime = entryDate.format("DD/MM/YYYY");
        return (
          <div>
            {formattedDateTime}
            <span> - {creationDate.format("HH:mm:ss")}</span>
          </div>
        );
      },
    },
    {
      title: "Ca đăng kí",
      dataIndex: "caDangKi",
      key: "caDangKi",
    },
    {
      title: "Thời gian ca làm bắt đầu",
      dataIndex: "thoiGianCaLamBatDau",
      key: "thoiGianCaLamBatDau",
      render: (text, record) => {
        const entryDate = moment(text);
        const creationDate = moment(record.thoiGianCaLamBatDau);
        const formattedDateTime = entryDate.format("DD/MM/YYYY");
        return (
          <div>
            {formattedDateTime}
            <span> - {creationDate.format("HH:mm:ss")}</span>
          </div>
        );
      },
    },
    {
      title: "Thời gian ca làm kết thúc",
      dataIndex: "thoiGianCaLamKetThuc",
      key: "thoiGianCaLamKetThuc",
      render: (text, record) => {
        const entryDate = moment(text);
        const creationDate = moment(record.thoiGianCaLamKetThuc);
        const formattedDateTime = entryDate.format("DD/MM/YYYY");
        return (
          <div>
            {formattedDateTime}
            <span> - {creationDate.format("HH:mm:ss")}</span>
          </div>
        );
      },
    },
    {
      title: "Thời gian chấm công bắt đầu",
      dataIndex: "thoiGianChamCongBatDau",
      key: "thoiGianChamCongBatDau",
      render: (text) =>
        text ? moment(text).format("DD/MM/YYYY - HH:mm:ss") : null,
    },
    {
      title: "Thời gian chấm công kết thúc",
      dataIndex: "thoiGianChamCongKetThuc",
      key: "thoiGianChamCongKetThuc",
      render: (text) =>
        text ? moment(text).format("DD/MM/YYYY - HH:mm:ss") : null,
    },
    {
      title: "Hệ số ngày công",
      dataIndex: "heSoNgayCong",
      key: "heSoNgayCong",
    },
    {
      title: "Mã số người quản lý",
      dataIndex: "maSoNguoiQuanLy",
      key: "maSoNguoiQuanLy",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trangThai) => {
        const TT =
          renderTrangThai &&
          renderTrangThai.find((item) => item.value === trangThai);
        return TT ? TT.label : "";
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
    {
      title: 'Chấm công',
      dataIndex: 'actions',
      key: 'actions',
      fixed:'right',
      render: (text, record) => (
        <div>
          <Button size="small" style={buttonStyle} onClick={() => handleCheckIn(record.id)}>CheckIn</Button>
          <Button size="small" style={buttonStyle} onClick={() => handleCheckOut(record.id)}>CheckOut</Button>
        </div>
      ),
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys123: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      dispatch(setSelectedRowCaLam(selectedRows));
    },

    getCheckboxProps: (record) => ({
      id: record.id,
    }),
  };

  const buttonStyle = {
    width: "75px",
    margin: "0 1px",
    borderRadius: "10px",
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
          dataSource={listCaLam}
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
      {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={listHopDong?.length}
        />
      </div> */}
    </div>
  );
};

export default DangKyCaLamTable;
