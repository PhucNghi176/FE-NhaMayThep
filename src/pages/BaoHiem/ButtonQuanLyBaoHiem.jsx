import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, notification } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import "../../styles/button.css";
import AddBaoHiem from "./AddBaoHiem";
import { useDispatch, useSelector } from "react-redux";
import { getBaoHiemRow } from "../../redux/selector";
/* import {
  deleteBaoHiem,
  getListBaoHiem,
  selectedBaoHiem,
  updateBaoHiem,
} from "../../redux/slices/BaoHiemSlice/BaoHiemSlice"; */

const buttonStyle = {
  height: "40px",
  width: "150px",
  borderRadius: "20px",
  margin: "0px 5px",
};

const centered = {
  /* marginTop: "100px",
  borderRadius: "20px", */
  /* display: "flex",
  alignItems: "center",
  justifyContent: "center", */
};

const ButtonQuanLyBaoHiem = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // Notification
  const [notificationType, setNotificationType] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    if (notificationType && notificationMessage) {
      notification[notificationType]({
        message: notificationMessage,
        placement: "top",
        duration: 5,
      });
      setTimeout(() => {
        notification.destroy();
      }, 5000);
      console.log("notification: ", notification);
    }
  }, [notificationType, notificationMessage]);

  const openNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
  };

  // Modal Add
  const [isAddOpen, setIsAddOpen] = useState(false);

  const showAddModal = () => {
    setIsAddOpen(true);
  };

  const handleOk = () => {
    setIsAddOpen(false);
  };

  const handleCancel = () => {
    setIsAddOpen(false);
  };

  // useState modal update
  const [isEditOpen, setIsEditOpen] = useState(false);

  const showEditModal = () => {
    setIsEditOpen(true);
  };

  const handleEditCancel = () => {
    form.resetFields();
    setIsEditOpen(false);
  };

  // UPDATE BAO HIEM
  /* const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      dispatch(
        updateBaoHiem({ id: baoHiemSelectedRow[0].id, updatedBaoHiem: values })
      )
        .unwrap()
        .then(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Bảo hiểm có ID: ${baoHiemSelectedRow[0].id} thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(getListBaoHiem(data));
        })
        .catch((error) => {
          openNotification("warning", error);
        })
        .finally(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Bảo hiểm có ID: ${baoHiemSelectedRow[0].id} thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(getListBaoHiem(data));
        });
    });
  }; */

  //  DELETE BAO HIEM
  const baoHiemSelectedRow = useSelector(getBaoHiemRow);
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xóa Bảo hiểm",
      content: "Bạn có muốn xóa bảo hiểm này không?",
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
        console.log("Cancel deletion");
      },
    });
  };
  // console.log("Selected:", baoHiemSelectedRow);

  return (
    <div style={{ display: "flex" }}>
      <Button
        size="small"
        className="exportBtn"
        type="primary"
        icon={<DownloadOutlined />}
        style={buttonStyle}
      >
        Xuất File
      </Button>

      {/* <Button
        size="small"
        className="editBtn"
        type="primary"
        icon={<EditOutlined />}
        style={buttonStyle}
        onClick={showEditModal}
      >
        Chỉnh Sửa
      </Button> */}

      {/* <UpdateBaoHiem onClose={handleOk} /> */}

      <Button
        size="small"
        className="deleteBtn"
        type="primary"
        icon={<DeleteOutlined />}
        style={buttonStyle}
        onClick={() => handleDelete(baoHiemSelectedRow[0].id)}
      >
        Xóa
      </Button>

      {/* Button add Bảo Hiểm */}
      <AddBaoHiem onClose={handleOk} />

      {/* Modal edit Bao Hiem */}
      {/* <Modal
        className="custom-modal"
        centered
        title="Cập nhật nhân viên"
        open={isEditOpen}
        onCancel={handleEditCancel}
        width={870}
        footer={null}
      >
        <Form form={form} onFinish={handleEditSubmit}>
          <Row style={{ justifyContent: "space-between" }}>
            <Col>
              <p className="modalContent">ID</p>
              <Form.Item
                name="id"
                initialValue={
                  baoHiemSelectedRow ? baoHiemSelectedRow[0]?.id : ""
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ID!",
                  },
                ]}
              >
                <Input placeholder="Vui lòng nhập ID" />
              </Form.Item>
            </Col>

            <Col>
              <p className="modalContent">Loại Bảo Hiểm</p>
              <Form.Item
                name="tenLoaiBaoHiem"
                initialValue={
                  baoHiemSelectedRow ? baoHiemSelectedRow[0]?.name : ""
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Loại Bảo Hiểm!",
                  },
                ]}
              >
                <Input placeholder="Vui lòng nhập Loại Bảo Hiểm"></Input>
              </Form.Item>
            </Col>

            <Col>
              <p className="modalContent">Phần Trăm Khấu Trừ</p>
              <Form.Item
                name="phantramKhauTru"
                initialValue={
                  baoHiemSelectedRow
                    ? baoHiemSelectedRow[0]?.phanTramKhauTru
                    : ""
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Phần Trăm Khấu Trừ!",
                  },
                ]}
              >
                <Input placeholder="Vui lòng nhập phần trăm khấu trừ"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row className="baoHiemButton">
            <Form.Item>
              <Button
                onClick={handleCancel}
                htmlType="submit"
                type="primary"
                style={{
                  width: "150px",
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "orange",
                }}
              >
                <PlusOutlined />
                Chỉnh Sửa
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal> */}
    </div>
  );
};

export default ButtonQuanLyBaoHiem;
