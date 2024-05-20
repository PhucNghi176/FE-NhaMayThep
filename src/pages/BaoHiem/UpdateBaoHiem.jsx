import React, { useEffect, useState } from "react";
/* import {
  getListBaoHiem,
  updateBaoHiem,
} from "../../redux/slices/BaoHiemSlice/BaoHiemSlice"; */
import { Button, Col, Form, Input, Modal, Row, notification } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const UpdateBaoHiem = (props) => {
  const { record } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const showEditModal = () => {
    setIsEditOpen(true);
  };

  const handleEditCancel = () => {
    form.resetFields();
    setIsEditOpen(false);
  };

  const handleCancel = () => {
    setIsEditOpen(false);
  };

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

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      dispatch(updateBaoHiem({ id: record.id, updatedBaoHiem: values }))
        .unwrap()
        .then(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Bảo hiểm có ID: ${record.id} thành công`
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
            `Cập nhật Bảo hiểm có ID: ${record.id} thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(getListBaoHiem(data));
        });
    });
  };

  return (
    <div>
      <Button
        size="small"
        className="editBtn"
        type="primary"
        icon={<EditOutlined />}
        onClick={showEditModal}
      ></Button>

      <Modal
        className="custom-modal"
        centered
        title="Cập nhật Bảo Hiểm"
        open={isEditOpen}
        onCancel={handleEditCancel}
        width={870}
        footer={null}
      >
        <Form form={form} onFinish={handleEditSubmit}>
          <Row style={{ justifyContent: "space-between" }}>
            <Col>
              <p className="modalContent">ID</p>
              <Form.Item name="id" initialValue={record.id}>
                <Input
                  placeholder="Vui lòng nhập ID"
                  disabled
                  style={{ color: "black" }}
                />
              </Form.Item>
            </Col>
            {/* 1st column */}
            <Col>
              <p className="modalContent">Loại Bảo Hiểm</p>
              <Form.Item
                name="tenLoaiBaoHiem"
                initialValue={record.name}
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
            {/* 2st column */}
            <Col>
              <p className="modalContent">Phần Trăm Khấu Trừ</p>
              <Form.Item
                name="phantramKhauTru"
                initialValue={record.phanTramKhauTru}
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
      </Modal>
    </div>
  );
};

export default UpdateBaoHiem;
