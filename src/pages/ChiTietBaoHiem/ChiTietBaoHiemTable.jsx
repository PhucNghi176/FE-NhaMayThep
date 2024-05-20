import { Pagination, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterChiTietBaoHiem,
  selectedChiTietBaoHiem,
} from "../../redux/slices/chiTietBaoHiemSlice/chiTietBaoHiemSlice";
import { getListChiTietBaoHiemSelector } from "../../redux/selector";
import UpdateChiTietBaoHiem from "./UpdateChiTietBaoHiem";
import dayjs from "dayjs";

const renderUpdateChiTietBaoHiemButton = (record) => (
  <UpdateChiTietBaoHiem record={record} />
);

function ChiTietBaoHiemTable({ dataSource }) {
  console.log("Datasource: ", dataSource);
  const chiTietBaoHiemList = useSelector(getListChiTietBaoHiemSelector);
  console.log(chiTietBaoHiemList);
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
      hidden: true,
    },
    {
      title: "Mã Số Nhân Viên",
      dataIndex: "maSoNhanVien",
      key: "maSoNhanVien",
      hidden: true,
    },
    {
      title: "Nhân Viên",
      dataIndex: "nhanVien",
      key: "nhanVien",
    },
    {
      title: "Loại Bảo Hiểm",
      dataIndex: "loaiBaoHiem",
      key: "loaiBaoHiem",
      hidden: true,
    },
    {
      title: "Bảo Hiểm",
      dataIndex: "baoHiem",
      key: "baoHiem",
    },
    {
      title: "Phần Trăm Bảo Hiểm",
      dataIndex: "phanTramBaoHiem",
      key: "phanTramBaoHiem",
    },
    {
      title: "Ngày Hiệu Lực",
      dataIndex: "ngayHieuLuc",
      key: "ngayHieuLuc",
      render: (text, record) => {
        const entryDate = dayjs(text);
        const creationDate = dayjs(record.ngayHieuLuc);
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
      title: "Ngày Kết Thúc",
      dataIndex: "ngayKetThuc",
      key: "ngayKetThuc",
      render: (text, record) => {
        const entryDate = dayjs(text);
        const creationDate = dayjs(record.ngayKetThuc);
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
      title: "Nội Cấp",
      dataIndex: "noiCap",
      key: "noiCap",
    },
    {
      title: "Chỉnh Sửa",
      width: 80,
      render: (record) => {
        return renderUpdateChiTietBaoHiemButton(record);
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
      dispatch(selectedChiTietBaoHiem(selectedRows));
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
    const PageNumber = page;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    dispatch(filterChiTietBaoHiem(data))
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
          dataSource={dataSource?.data?.map((chiTietBaoHiem, index) => ({
            index: index + 1,
            stt: index + 1,
            id: chiTietBaoHiem.id,
            maSoNhanVien: chiTietBaoHiem.maSoNhanVien,
            nhanVien: chiTietBaoHiem.nhanVien,
            loaiBaoHiem: chiTietBaoHiem.loaiBaoHiem,
            baoHiem: chiTietBaoHiem.baoHiem,
            phanTramBaoHiem: chiTietBaoHiem.phanTramBaoHiem,
            ngayHieuLuc: chiTietBaoHiem.ngayHieuLuc,
            ngayKetThuc: chiTietBaoHiem.ngayKetThuc,
            noiCap: chiTietBaoHiem.noiCap,
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
}

export default ChiTietBaoHiemTable;
