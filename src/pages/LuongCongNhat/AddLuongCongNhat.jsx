import { Button, Col, Form, Input, Modal, Row, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createLuongCongNhat,
  filterLuongCongNhat,
} from "../../redux/slices/luongCongNhatSlice/luongCongNhatSlice";
import { PlusOutlined } from "@ant-design/icons";

const AddLuongCongNhat = ({ onClose }) => {
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

  // POST - CREATE LUONG CONG NHAT
  const onFinish = (values) => {
    console.log(values);
    const PageNo = 1;
    const PageSize = 10;
    const data = { PageNo, PageSize };
    // Dispatch the createLuongCongNhat action with the form values
    dispatch(createLuongCongNhat(values))
      .unwrap()
      .then(() => {
        // Close the Modal
        onClose();
        openNotification("success", "Tạo Lương Công Nhật thành công!");
        dispatch(filterLuongCongNhat(data));
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
        dispatch(filterLuongCongNhat(data));
        openNotification("success", "Tạo Lương Công Nhật thành công!");
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
        title="Tạo mới Lương Công Nhật"
        open={isAddOpen}
        onCancel={handleCancel}
        width={870}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Row style={{ justifyContent: "space-between" }}>
            {/* 1st column */}
            <Col>
              <p className="modalContent">Mã Số Nhân Viên</p>
              <Form.Item
                name="maSoNhanVien"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Mã Số Nhân Viên!",
                  },
                ]}
              >
                <Input placeholder="Mã Số Nhân Viên" allowClear />
              </Form.Item>

              <p className="modalContent">Tổng Lương</p>
              <Form.Item
                name="tongLuong"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Tổng Lương!",
                  },
                ]}
              >
                <Input placeholder="Tổng Lương" allowClear />
              </Form.Item>
            </Col>
            {/* 1st column */}
            <Col>
              <p className="modalContent">Số Giờ Làm</p>
              <Form.Item
                name="soGioLam"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Số Giờ Làm!",
                  },
                ]}
              >
                <Input placeholder="Số Giờ Làm" allowClear />
              </Form.Item>
            </Col>
            {/* 1st column */}
            <Col>
              <p className="modalContent">Lương 1 Giờ</p>
              <Form.Item
                name="luong1Gio"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Lương 1 Giờ!",
                  },
                ]}
              >
                <Input placeholder="Lương 1 Giờ" allowClear />
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

export default AddLuongCongNhat;
