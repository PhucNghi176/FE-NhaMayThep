import { Pagination, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterLuongCongNhat,
  selectedLuongCongNhat,
} from "../../redux/slices/luongCongNhatSlice/luongCongNhatSlice";
import UpdateLuongCongNhat from "./UpdateLuongCongNhat";

const renderUpdateLuongCongNhatButton = (record) => (
  <UpdateLuongCongNhat record={record} />
);

const LuongCongNhatTable = ({ dataSource }) => {
  console.log("Datasource: ", dataSource);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const centered = {
    /* marginTop: "100px",
    borderRadius: "20px", */
    /* display: "flex",
    alignItems: "center",
    justifyContent: "center", */
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã Số Nhân Viên",
      dataIndex: "maSoNhanVien",
      key: "maSoNhanVien",
    },
    {
      title: "Số Giờ Làm",
      dataIndex: "soGioLam",
      key: "soGioLam",
    },
    {
      title: "Lương 1 Giờ",
      dataIndex: "luong1Gio",
      key: "luong1Gio",
    },
    {
      title: "Tổng Lương",
      dataIndex: "tongLuong",
      key: "tongLuong",
    },
    {
      title: "Chỉnh Sửa",
      width: 80,
      render: (record) => {
        return renderUpdateLuongCongNhatButton(record);
      },
    },
  ].filter((item) => !item.hidden);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      dispatch(selectedLuongCongNhat(selectedRows));
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dataSource]);

  // Phân trang
  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    const PageNo = page;
    const PageSize = 10;
    const data = { PageNo, PageSize };
    dispatch(filterLuongCongNhat(data))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
    console.log("pageChange: ", page);
  };

  return (
    <>
      <Spin spinning={loading} tip="Loading...">
        <Table
          tableLayout="auto"
          bordered
          size="small"
          scroll={{
            x: 2200,
            // y: 4000,
          }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource.data?.map((luongCongNhat, index) => ({
            index: index + 1,
            stt: index + 1,
            id: luongCongNhat.id,
            maSoNhanVien: luongCongNhat.maSoNhanVien,
            soGioLam: luongCongNhat.soGioLam,
            luong1Gio: luongCongNhat.luong1Gio,
            tongLuong: luongCongNhat.tongLuong,
          }))}
          rowKey="id"
          pagination={false}
        />
      </Spin>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          current={currentPage}
          total={dataSource?.pageCount * 10}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default LuongCongNhatTable;
