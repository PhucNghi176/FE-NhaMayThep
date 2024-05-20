import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchKyLuat,
  filterKyLuat,
  setSelectedRows,
} from "../../redux/slices/KyLuatSlice/kyLuatSlice";
import {fetchChinhSachNhanSu} from "../../redux/slices/ChinhSachNhanSuSlice/chinhSachNhanSuSlice";
import { getChinhSachNhanSu, getKyLuat } from "../../redux/selector";
import { Pagination, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const KyLuatTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const danhSachKyLuat = useSelector(getKyLuat);
  const listChinhSach = useSelector(getChinhSachNhanSu);
  console.log("list CS",listChinhSach)

  useEffect(() => {
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(filterKyLuat(data));
    dispatch(fetchChinhSachNhanSu())
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
  
    return formattedAmount.replace("₫", "VND");;
  }

  const listKyLuat = danhSachKyLuat?.data?.map((item) => ({
    id: item.id,
    maSoNhanVien: item.maSoNhanVien,
    chinhSachNhanSuID: item.chinhSachNhanSuID,
    tenDotKyLuat: item.tenDotKyLuat,
    ngayKiLuat: item.ngayKiLuat,
    tongPhat: item.tongPhat,
  }));
  console.log(listKyLuat);

  const chinhSach = listChinhSach?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  console.log("chinh sach",chinhSach)

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
      title: "Chính sách nhân sự",
      dataIndex: "chinhSachNhanSuID",
      key: "chinhSachNhanSuID",
      render: (chinhSachNhanSuID) => {
        const CSNS = chinhSach && chinhSach.find((item) => item.value === chinhSachNhanSuID);
        return CSNS ? CSNS.label : "";
      },
    },
    {
      title: "Tên đợt kỷ luật",
      dataIndex: "tenDotKyLuat",
      key: "tenDotKyLuat",
    },
    {
      title: "Ngày kỷ luật",
      dataIndex: "ngayKiLuat",
      key: "ngayKiLuat",
      render: (text, record) => {
        const entryDate = moment(text);
        const creationDate = moment(record.ngayKiLuat);
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
      title: "Tổng phạt",
      dataIndex: "tongPhat",
      key: "tongPhat",
      render: (text) => formatCurrency(text),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      dispatch(setSelectedRows(selectedRows[0]));
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
    dispatch(filterKyLuat(data))
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
          dataSource={listKyLuat}
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
          total={listKyLuat?.length}
        />
      </div>
    </>
  );
};

export default KyLuatTable;
