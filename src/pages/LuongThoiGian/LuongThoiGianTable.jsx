import { Pagination, Spin, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectedLuongThoiGian } from "../../redux/slices/luongThoiGianSlice/luongThoiGianSlice";
import UpdateLuongThoiGian from "./UpdateLuongThoiGian";

const renderUpdateLuongThoiGianButton = (record) => (
  <UpdateLuongThoiGian record={record} />
);

const LuongThoiGianTable = ({ dataSource }) => {
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
      title: "Mã Lương Thời Gian",
      dataIndex: "maLuongThoiGian",
      key: "maLuongThoiGian",
    },
    {
      title: "Lương Năm",
      dataIndex: "luongNam",
      key: "luongNam",
    },
    {
      title: "Lương Tháng",
      dataIndex: "luongThang",
      key: "luongThang",
    },
    {
      title: "Lương Tuần",
      dataIndex: "luongTuan",
      key: "luongTuan",
    },
    {
      title: "Lương Ngày",
      dataIndex: "luongNgay",
      key: "luongNgay",
    },
    {
      title: "Lương Giờ",
      dataIndex: "luongGio",
      key: "luongGio",
    },
    {
      title: "Ngày Áp Dụng",
      dataIndex: "ngayApDung",
      key: "ngayApDung",
      render: (text, record) => {
        const entryDate = dayjs(text);
        const startDate = dayjs(record.ngayApDung);
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
      title: "Chỉnh Sửa",
      width: 80,
      render: (record) => {
        return renderUpdateLuongThoiGianButton(record);
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
      dispatch(selectedLuongThoiGian(selectedRows));
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  // Phân trang
  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    const PageNo = page;
    const PageSize = 10;
    const data = { PageNo, PageSize };
    dispatch(filterLuongThoiGian(data))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
    console.log("pageChange: ", page);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dataSource]);

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
          dataSource={dataSource.data?.map((luongThoiGian, index) => ({
            index: index + 1,
            stt: index + 1,
            id: luongThoiGian.id,
            maSoNhanVien: luongThoiGian.maSoNhanVien,
            maLuongThoiGian: luongThoiGian.maLuongThoiGian,
            luongNam: luongThoiGian.luongNam,
            luongThang: luongThoiGian.luongThang,
            luongTuan: luongThoiGian.luongTuan,
            luongNgay: luongThoiGian.luongNgay,
            luongGio: luongThoiGian.luongGio,
            ngayApDung: luongThoiGian.ngayApDung,
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

export default LuongThoiGianTable;
