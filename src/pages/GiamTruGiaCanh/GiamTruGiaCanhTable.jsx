import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGiamTru, getTTGiamTru } from "../../redux/selector";
import { fetchGiamTru, filterGiamTru, setSelectedRowGiamTru } from "../../redux/slices/giamTruGiaCanhSlice/giamTruGiaCanhSlice";
import { Pagination, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { fetchTTGiamTru } from "../../redux/slices/thongTinGiamTruSlice/thongTinGiamTruSlice";

const GiamTruGiaCanhTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const danhSachGiamTru = useSelector(getGiamTru);
  const danhSachTTGiamTru = useSelector(getTTGiamTru);

  useEffect(() => {
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(filterGiamTru(data))
    dispatch(fetchTTGiamTru(data))
  }, []);

  const listGiamTru = danhSachGiamTru?.data?.map((item) => ({
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
  console.log("sss",listGiamTru);

  const listTTGiamTru = danhSachTTGiamTru?.data?.map((item)=>({
    label: item.name,
    value: item.id,
  }))
  console.log("qqq",listTTGiamTru)

  const columns = [
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
        const maGiamTru = listTTGiamTru && listTTGiamTru.find((item) => item.value === maGiamTruID);
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
        const formattedDateTime = entryDate.format('DD/MM/YYYY');
        return (
            <div>
                {formattedDateTime}
                <span> - {creationDate.format('HH:mm:ss')}</span>
            </div>
        );
    },
    },
  ];
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      dispatch(setSelectedRowGiamTru(selectedRows[0]));
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
    dispatch(filterGiamTru(data))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
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
          columns={columns}
          dataSource={listGiamTru}
          scroll={{
            x: 1000,
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
          total={listGiamTru?.length}
        />
      </div>
    </>
  );
};

export default GiamTruGiaCanhTable;
