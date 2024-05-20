import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeletedGiamTru, getTTGiamTru } from "../../redux/selector";
import { fetchTTGiamTru } from "../../redux/slices/thongTinGiamTruSlice/thongTinGiamTruSlice";
import {
  fetchDeletedGiamTru,
  restoreGiamTru,
} from "../../redux/slices/giamTruGiaCanhSlice/giamTruGiaCanhSlice";
import { Button, Pagination, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const DaXoaGiaCanhTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const danhSachGiamTru = useSelector(getDeletedGiamTru);
  const danhSachTTGiamTru = useSelector(getTTGiamTru);
  const PageNumber = 1;
  const PageSize = 10;
  const data = { PageNumber, PageSize };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(fetchDeletedGiamTru(data));
    dispatch(fetchTTGiamTru(data));
  }, []);

  const listGiamTru1 = danhSachGiamTru?.data?.map((item) => ({
    id: item.id,
    nhanVienID: item.nhanVienID,
    nhanVien: item.nhanVien,
    maGiamTruID: item.maGiamTruID,
    thongTinGiamTru: item.thongTinGiamTru,
    diaChiLienLac: item.diaChiLienLac,
    quanHeVoiNhanVien: item.quanHeVoiNhanVien,
    canCuocCongDan: item.canCuocCongDan,
    ngayXacNhanPhuThuoc: item.ngayXacNhanPhuThuoc,
  }));
  console.log("sss", listGiamTru1);

  const listTTGiamTru = danhSachTTGiamTru?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  console.log("qqq", listTTGiamTru);

  const column = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã nhân viên",
      dataIndex: "nhanVienID",
      key: "nhanVienID",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "nhanVien",
      key: "nhanVien",
    },
    {
      title: "Mã giảm trừ",
      dataIndex: "maGiamTruID",
      key: "maGiamTruID",
      render: (maGiamTruID) => {
        const maGiamTru =
          listTTGiamTru &&
          listTTGiamTru.find((item) => item.value === maGiamTruID);
        return maGiamTru ? maGiamTru.label : "Trống";
      },
    },
    {
      title: "TT. giảm trừ",
      dataIndex: "thongTinGiamTru",
      key: "thongTinGiamTru",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChiLienLac",
      key: "diaChiLienLac",
    },
    {
      title: "Quan hệ với nhân viên",
      dataIndex: "quanHeVoiNhanVien",
      key: "quanHeVoiNhanVien",
    },
    {
      title: "CCCD",
      dataIndex: "canCuocCongDan",
      key: "canCuocCongDan",
    },
    {
      title: "Ngày xác nhận phụ thuộc ",
      dataIndex: "ngayXacNhanPhuThuoc",
      key: "ngayXacNhanPhuThuoc",
      render: (text, record) => {
        const entryDate = moment(text);
        const creationDate = moment(record.ngayXacNhanPhuThuoc);
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
      title: "Phục hồi",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      render: (text, record) => (
        <div>
          <Button
            size="small"
            style={buttonStyle}
            onClick={() => handleRestore(record)}
          >
            Phục hồi
          </Button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    const PageNumber = page;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    dispatch(fetchDeletedGiamTru(data))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const buttonStyle = {
    width: "75px",
    margin: "0 1px",
    borderRadius: "10px",
  };

  const handleRestore = (id) => {
    dispatch(restoreGiamTru(id))
      .then(() => {
        dispatch(fetchDeletedGiamTru(data));
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <>
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
          columns={column}
          dataSource={listGiamTru1}
          scroll={{
            x: 1000,
          }}
          pagination={false}
        />
      </Spin>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={listGiamTru1?.length}
        />
      </div>
    </>
  );
};

export default DaXoaGiaCanhTable;
