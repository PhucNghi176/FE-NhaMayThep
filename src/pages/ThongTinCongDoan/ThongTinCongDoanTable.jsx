import { Pagination, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterThongTinCongDoan,
  selectedThongTinCongDoan,
} from "../../redux/slices/thongTinCongDoanSlice/thongTinCongDoanSlice";
import dayjs from "dayjs";
import UpdateThongTinCongDoan from "./UpdateThongTinCongDoan";

const renderUpdateThongTinCongDoan = (record) => (
  <UpdateThongTinCongDoan record={record} />
);

function ThongTinCongDoanTable({ dataSource }) {
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
      hidden: true,
    },
    {
      title: "Nhân viên ID",
      dataIndex: "nhanVienID",
      key: "nhanVienID",
      hidden: true,
    },
    {
      title: "Nhân Viên",
      dataIndex: "nhanVien",
      key: "nhanVien",
    },
    {
      title: "Thư Ký Công Đoàn",
      dataIndex: "thuKiCongDoan",
      key: "thuKiCongDoan",
      render: (record) => {
        if (record === true) {
          return "Có";
        } else {
          return "Không";
        }
      },
    },
    {
      title: "Ngày Gia Nhập",
      dataIndex: "ngayGiaNhap",
      key: "ngayGiaNhap",
      render: (text, record) => {
        const entryDate = dayjs(text);
        const creationDate = dayjs(record.ngayGiaNhap);
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
      title: "Chỉnh Sửa",
      width: 80,
      render: (record) => {
        return renderUpdateThongTinCongDoan(record);
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
      dispatch(selectedThongTinCongDoan(selectedRows));
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
    dispatch(filterThongTinCongDoan(data))
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
            x: 1000,
            // y: 4000,
          }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          /*  dataSource={dataSource} */
          dataSource={dataSource.data?.map((thongTinCongDoan, index) => ({
            index: index + 1,
            stt: index + 1,
            id: thongTinCongDoan.id,
            nhanVienID: thongTinCongDoan.nhanVienID,
            nhanVien: thongTinCongDoan.nhanVien,
            thuKiCongDoan: thongTinCongDoan.thuKiCongDoan,
            ngayGiaNhap: thongTinCongDoan.ngayGiaNhap,
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

export default ThongTinCongDoanTable;
