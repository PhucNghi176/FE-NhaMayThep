import { Button, Col, Form, Input, Modal, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
/* import {
  createBaoHiem,
  getListBaoHiem,
} from "../../redux/slices/BaoHiemSlice/BaoHiemSlice"; */
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

const AddBaoHiem = ({ onClose }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const showAddModal = () => {
    setIsAddOpen(true);
  };

  const handleCancel = () => {
    setIsAddOpen(false);
  };

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const buttonStyle = {
    height: "40px",
    width: "150px",
    borderRadius: "20px",
    margin: "0px 5px",
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

  const onFinish = (values) => {
    console.log(values);
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    // Dispatch the createBaoHiem action with the form values
    dispatch(createBaoHiem(values))
      .unwrap()
      .then(() => {
        // Close the Modal
        onClose();
        openNotification("success", "Tạo Bảo Hiểm thành công!");
        dispatch(getListBaoHiem(data));
        handleCancel();
        // Reset the form fields after dispatching the action
        form.resetFields();
      })
      .catch((error) => {
        openNotification("warning", error);
      })
      .finally(() => {
        // Reset the form fields after dispatching the action
        form.resetFields();
        // Close the Modal
        onClose();
        dispatch(getListBaoHiem(data));
        openNotification("success", "Tạo Bảo Hiểm thành công!");
        handleCancel();
      });
  };

  return (
    <div>
      <Button
        size="small"
        className="addBtn"
        type="primary"
        icon={<PlusOutlined />}
        style={buttonStyle}
        onClick={showAddModal}
      >
        Tạo Mới
      </Button>
      <Modal
        className="custom-modal"
        centered
        title="Tạo mới Bảo Hiểm"
        open={isAddOpen}
        onCancel={handleCancel}
        width={870}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Row style={{ justifyContent: "space-between" }}>
            {/* 1st column */}
            <Col>
              <p className="modalContent-2">Loại Bảo Hiểm</p>
              <Form.Item
                name="tenLoaiBaoHiem"
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
              <p className="modalContent-2">Phần Trăm Khấu Trừ</p>
              <Form.Item
                name="phantramKhauTru"
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
                htmlType="submit"
                type="primary"
                style={{
                  width: "150px",
                  height: "40px",
                  borderRadius: "20px",
                }}
              >
                <PlusOutlined />
                Tạo Mới
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBaoHiem;
