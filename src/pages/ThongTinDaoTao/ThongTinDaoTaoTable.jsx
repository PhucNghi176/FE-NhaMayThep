import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getTTDT, getTrinhDoHocVan } from "../../redux/selector";
import { fetchTTDT, filterTTDT, setSelectedTTDT } from "../../redux/slices/thongTinDaoTaoSlice/thongTinDaoTaoSlice";
import { Pagination, Spin, Table } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { fetchTrinhDoHocVan } from "../../redux/slices/TrinhDoHocVanSlice/trinhDoHocVanSlice";

const ThongTinDaoTaoTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const danhSachTTDT = useSelector(getTTDT);
  const listTrinhDo = useSelector(getTrinhDoHocVan);

  useEffect(() => {
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(filterTTDT(data));
    dispatch(fetchTrinhDoHocVan())
  }, [dispatch]);

  const DATE_FORMAT = "YYYY";

  const listThongTinDaoTao = danhSachTTDT?.data?.map((item) => ({
    id:item.id,
    nhanVienID: item.nhanVienID,
    maTrinhDoHocVanID: item.maTrinhDoHocVanID,
    tenTruong: item.tenTruong,
    chuyenNganh: item.chuyenNganh,
    namTotNghiep: item.namTotNghiep,
    trinhDoVanHoa: item.trinhDoVanHoa,
  }));
  console.log("TTDT", listThongTinDaoTao);

  const trinhDoHocVan = listTrinhDo?.value?.map((item) => ({
    label: item.tenTrinhDo,
    value: item.id,
  }));

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
      title: "Trình độ học vấn",
      dataIndex: "maTrinhDoHocVanID",
      key: "maTrinhDoHocVanID",
      render: (maTrinhDoHocVanID) => {
        const trinhDo = trinhDoHocVan && trinhDoHocVan.find((item) => item.value === maTrinhDoHocVanID);
        return trinhDo ? trinhDo.label : "";
      },
    },
    {
      title: "Tên trường",
      dataIndex: "tenTruong",
      key: "tenTruong",
    },
    {
      title: "Chuyên ngành",
      dataIndex: "chuyenNganh",
      key: "chuyenNganh",
    },
    {
      title: "Năm tốt nghiệp",
      dataIndex: "namTotNghiep",
      key: "namTotNghiep",
      render: (text, record) => {
        const entryDate = moment(text);
        const creationDate = moment(record.namTotNghiep);
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
      title: "Trình độ văn hoá",
      dataIndex: "trinhDoVanHoa",
      key: "trinhDoVanHoa",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      dispatch(setSelectedTTDT(selectedRows[0]))
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
    dispatch(fetchTTDT(data))
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
        dataSource={listThongTinDaoTao}
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
          total={listThongTinDaoTao?.length}
        />
      </div>
    </>
  );
};

export default ThongTinDaoTaoTable;
