import { Pagination, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMucSanPham } from "../../redux/selector";
import { getListMucSanPham } from "../../redux/slices/mucSanPhamSlice/mucSanPhamSlice";
import { selectedLuongSanPham } from "../../redux/slices/luongSanPhamSlice/luongSanPhamSlice";
import UpdateLuongSanPham from "./UpdateLuongSanPham";

const renderUpdateLuongSanPhamButton = (record) => (
  <UpdateLuongSanPham record={record} />
);

export const LuongSanPhamTable = ({ dataSource }) => {
  console.log("Datasource: ", dataSource);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const listMucSanPham = useSelector(getMucSanPham);

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
      title: "Số Sản Phẩm Làm",
      dataIndex: "soSanPhamLam",
      key: "soSanPhamLam",
    },
    {
      title: "Mức Sản Phẩm ID",
      dataIndex: "mucSanPhamID",
      key: "mucSanPhamID",
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
        return renderUpdateLuongSanPhamButton(record);
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
      dispatch(selectedLuongSanPham(selectedRows));
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
    dispatch(getListMucSanPham());
  }, [dataSource]);

  const option_list_mucSanPham = listMucSanPham?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  console.log("muc san pham: ", option_list_mucSanPham);

  // Phân trang
  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    const PageNo = page;
    const PageSize = 10;
    const data = { PageNo, PageSize };
    dispatch(filterLuongSanPham(data))
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
          dataSource={dataSource.data?.map((luongSanPham, index) => ({
            index: index + 1,
            stt: index + 1,
            id: luongSanPham.id,
            maSoNhanVien: luongSanPham.maSoNhanVien,
            soSanPhamLam: luongSanPham.soSanPhamLam,
            mucSanPhamID: luongSanPham.mucSanPhamID,
            tongLuong: luongSanPham.tongLuong,
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
