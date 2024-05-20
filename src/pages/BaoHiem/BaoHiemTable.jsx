import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Pagination,
  Popconfirm,
  Space,
  Spin,
  Table,
  notification,
} from "antd";
import ViewBaoHiem from "./ViewBaoHiem";
import { useDispatch } from "react-redux";
/* import {
  deleteBaoHiem,
  getListBaoHiem,
  selectedBaoHiem,
} from "../../redux/slices/BaoHiemSlice/BaoHiemSlice"; */
import { DeleteOutlined } from "@ant-design/icons";
import UpdateBaoHiem from "./UpdateBaoHiem";

const renderUpdateBaoHiemButton = (record) => <UpdateBaoHiem record={record} />;

function BaoHiemTable({ dataSource }) {
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

  /* const openNotification = (type, message) => {
    notification[type]({
      message: message,
      placement: "top",
      duration: 5,
    });
    setTimeout(() => {
      notification.destroy();
    }, 5000);
  }; */

  /* const handleDelete = (id) => {
    Modal.confirm({
      title: "Xóa Bảo Hiểm?",
      content: "Bạn có muốn xóa Bảo Hiểm này ko?",
      okText: "Có",
      cancelText: "Không",
      className: "custom-modal",
      centered,
      onOk: () => {
        dispatch(deleteBaoHiem(id))
          .unwrap()
          .then(() => {
            const PageNumber = 1;
            const PageSize = 10;
            const data = { PageNumber, PageSize };
            dispatch(getListBaoHiem(data));
            openNotification("success", `Xóa Bảo Hiểm có ID ${id} thành công!`);
          })
          .catch((error) => {
            console.error("Error: ", error);
          })
          .finally(() => {
            const PageNumber = 1;
            const PageSize = 10;
            const data = { PageNumber, PageSize };
            dispatch(getListBaoHiem(data));
            openNotification("success", `Xóa Bảo Hiểm có ID ${id} thành công!`);
          });
      },
      onCancel: () => {
        console.log("Hủy xóa Bảo Hiểm");
      },
    });
  }; */

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Loại Bảo Hiểm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phần Trăm Khấu Trừ",
      dataIndex: "phanTramKhauTru",
      key: "phanTramKhauTru",
    },

    /* {
      title: "Xóa",
      width: 80,
      render: (record) => {
        return (
          <Space size="large">
            <Popconfirm
              cancelText="Không"
              okText="Có"
              title="Bạn có muốn xóa bảo hiểm này?"
              onConfirm={() => {
                handleDelete(record.id);
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Popconfirm>

            <Button
              size="small"
              className="deleteBtn"
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            ></Button>
          </Space>
        );
      },
    }, */

    {
      title: "Chỉnh Sửa",
      width: 80,
      render: (record) => {
        return renderUpdateBaoHiemButton(record);
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
      dispatch(selectedBaoHiem(selectedRows));
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
    dispatch(getListBaoHiem(data))
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
          dataSource={dataSource.data?.map((baoHiem) => ({
            id: baoHiem.id,
            name: baoHiem.name,
            phanTramKhauTru: baoHiem.phanTramKhauTru,
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

export default BaoHiemTable;
