import { Pagination, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterNhanSu,
  selectedNhanSu,
} from "../../redux/slices/NhanSuSlice/nhanSuSlice";
import dayjs from "dayjs";
import UpdateNhanSu from "./UpdateNhanSu";

const renderUpdateNhanSu = (record) => <UpdateNhanSu record={record} />;

function NhanSuTable({ dataSource }) {
  console.log("Datasource: ", dataSource);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
      title: "Ngày Tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      render: (text, record) => {
        const entryDate = dayjs(text);
        const creationDate = dayjs(record.ngayTao);
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
      title: "Mã Số Nhân Viên",
      dataIndex: "maSoNhanVien",
      key: "maSoNhanVien",
      hidden: true,
    },
    {
      title: "Nhân Viên",
      dataIndex: "hoVaTen",
      key: "hoVaTen",
    },
    {
      title: "Loại Quá Trình ID",
      dataIndex: "loaiQuaTrinhID",
      key: "loaiQuaTrinhID",
      hidden: true,
    },
    {
      title: "Loại Quá Trình",
      dataIndex: "loaiQuaTrinh",
      key: "loaiQuaTrinh",
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "ngayBatDau",
      key: "ngayBatDau",
      render: (text, record) => {
        const entryDate = dayjs(text);
        const startDate = dayjs(record.ngayBatDau);
        const formattedDateTime = entryDate.format("DD/MM/YYYY");
        return (
          <div>
            {formattedDateTime}
            <span> - {startDate.format("HH:mm:ss")}</span>
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
        const finishDate = dayjs(record.ngayKetThuc);
        const formattedDateTime = entryDate.format("DD/MM/YYYY");
        return (
          <div>
            {formattedDateTime}
            <span> - {finishDate.format("HH:mm:ss")}</span>
          </div>
        );
      },
    },
    {
      title: "Phòng Ban ID",
      dataIndex: "phongBanID",
      key: "phongBanID",
      hidden: true,
    },
    {
      title: "Phòng Ban",
      dataIndex: "phongBan",
      key: "phongBan",
    },
    {
      title: "Chức Vụ ID",
      dataIndex: "chucVuID",
      key: "chucVuID",
      hidden: true,
    },
    { title: "Chức Vụ", dataIndex: "chucVu", key: "chucVu" },
    {
      title: "Chức Danh ID",
      dataIndex: "chucDanhID",
      key: "chucDanhID",
      hidden: true,
    },
    {
      title: "Chức Danh",
      dataIndex: "chucDanh",
      key: "chucDanh",
    },
    {
      title: "Ghi Chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
    {
      title: "Chỉnh Sửa",
      width: 80,
      render: (record) => {
        return renderUpdateNhanSu(record);
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
      dispatch(selectedNhanSu(selectedRows));
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

  // Phân Trang
  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    const PageNumber = page;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    dispatch(filterNhanSu(data))
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
          /*  dataSource={dataSource} */
          dataSource={dataSource.data?.map((nhanSu, index) => ({
            index: index + 1,
            stt: index + 1,
            id: nhanSu.id,
            ngayTao: nhanSu.ngayTao,
            maSoNhanVien: nhanSu.maSoNhanVien,
            hoVaTen: nhanSu.hoVaTen,
            loaiQuaTrinhID: nhanSu.loaiQuaTrinhID,
            loaiQuaTrinh: nhanSu.loaiQuaTrinh,
            ngayBatDau: nhanSu.ngayBatDau,
            ngayKetThuc: nhanSu.ngayKetThuc,
            phongBanID: nhanSu.phongBanID,
            phongBan: nhanSu.phongBan,
            chucVuID: nhanSu.chucVuID,
            chucVu: nhanSu.chucVu,
            chucDanhID: nhanSu.chucDanhID,
            chucDanh: nhanSu.chucDanh,
            ghiChu: nhanSu.ghiChu,
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

export default NhanSuTable;
