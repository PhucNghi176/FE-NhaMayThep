import { Pagination, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterKhenThuong,
  selectedKhenThuong,
} from "../../redux/slices/khenThuongSlice/khenThuongSlice";
import { getChinhSachNhanSu } from "../../redux/selector";
import { fetchChinhSachNhanSu } from "../../redux/slices/chinhSachNhanSuSlice/chinhSachNhanSuSlice";
import UpdateKhenThuong from "./UpdateKhenThuong";
import dayjs from "dayjs";

const renderUpdateKhenThuongButton = (record) => (
  <UpdateKhenThuong record={record} />
);

function KhenThuongTable({ dataSource }) {
  console.log("Datasource: ", dataSource);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const listChinhSachNhanSu = useSelector(getChinhSachNhanSu);

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
      title: "Mã Số Nhân viên",
      dataIndex: "maSoNhanVien",
      key: "maSoNhanVien",
      hidden: true,
    },
    {
      title: "Nhân Viên",
      dataIndex: "tenNhanVien",
      key: "tenNhanVien",
    },
    {
      title: "Chính Sách Nhân Sự",
      dataIndex: "chinhSachNhanSuID",
      key: "chinhSachNhanSuID",
      render: (chinhSachNhanSuID) => {
        const ChinhSachNhanSu =
          option_list_chinhSach &&
          option_list_chinhSach.find(
            (item) => item.value === chinhSachNhanSuID
          );
        return ChinhSachNhanSu ? ChinhSachNhanSu.label : "";
      },
    },
    {
      title: "Đợt Khen Thưởng",
      dataIndex: "tenDotKhenThuong",
      key: "tenDotKhenThuong",
    },
    {
      title: "Ngày Khen Thưởng",
      dataIndex: "ngayKhenThuong",
      key: "ngayKhenThuong",
      render: (text, record) => {
        const entryDate = dayjs(text);
        const finishDate = dayjs(record.ngayKhenThuong);
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
      title: "Tổng Thưởng",
      dataIndex: "tongThuong",
      key: "tongThuong",
    },
    {
      title: "Chỉnh Sửa",
      width: 80,
      render: (record) => {
        return renderUpdateKhenThuongButton(record);
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
      dispatch(selectedKhenThuong(selectedRows));
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
    dispatch(fetchChinhSachNhanSu());
  }, [dataSource]);

  const option_list_chinhSach = listChinhSachNhanSu?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  console.log("chinh sach", option_list_chinhSach);

  // Phân trang
  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    const PageNumber = page;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    dispatch(filterKhenThuong(data))
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
          dataSource={dataSource.data?.map((khenThuong, index) => ({
            index: index + 1,
            stt: index + 1,
            maSoNhanVien: khenThuong.maSoNhanVien,
            tenNhanVien: khenThuong.tenNhanVien,
            id: khenThuong.id,
            chinhSachNhanSuID: khenThuong.chinhSachNhanSuID,
            tenDotKhenThuong: khenThuong.tenDotKhenThuong,
            ngayKhenThuong: khenThuong.ngayKhenThuong,
            tongThuong: khenThuong.tongThuong,
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
export default KhenThuongTable;
