import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterLuongCongNhat,
  updateLuongCongNhat,
} from "../../redux/slices/luongCongNhatSlice/luongCongNhatSlice";

const UpdateLuongCongNhat = (props) => {
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

  // UPDATE LUONG CONG NHAT
  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      dispatch(
        updateLuongCongNhat({ id: record.id, updatedLuongCongNhat: values })
      )
        .unwrap()
        .then(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Lương Công Nhật có ID: ${record.id} thành công`
          );
          const PageNo = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(filterLuongCongNhat(data));
        })
        .catch((error) => {
          openNotification("warning", error);
        })
        .finally(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Lương Công Nhật có ID: ${record.id} thành công`
          );
          const PageNo = 1;
          const PageSize = 10;
          const data = { PageNo, PageSize };
          dispatch(filterLuongCongNhat(data));
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
        title="Cập nhật Lương Công Nhật"
        open={isEditOpen}
        onCancel={handleEditCancel}
        width={870}
        footer={null}
      >
        <Form form={form} onFinish={handleEditSubmit}>
          <Row style={{ justifyContent: "space-between" }}>
            {/* 1st column */}
            <Col>
              <p className="modalContent">ID</p>
              <Form.Item name="id" initialValue={record.id}>
                <Input placeholder="ID" disabled style={{ color: "black" }} />
              </Form.Item>

              <p className="modalContent">Lương 1 Giờ</p>
              <Form.Item
                name="luong1Gio"
                initialValue={record.luong1Gio}
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
            {/* 2nd column */}
            <Col>
              <p className="modalContent">Mã Số Nhân Viên</p>
              <Form.Item name="maSoNhanVien" initialValue={record.maSoNhanVien}>
                <Input
                  placeholder="Mã Số Nhân Viên"
                  disabled
                  style={{ color: "black" }}
                />
              </Form.Item>

              <p className="modalContent">Tổng Lương</p>
              <Form.Item
                name="tongLuong"
                initialValue={record.tongLuong}
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
            {/* 3rd column */}
            <Col>
              <p className="modalContent">Số Giờ Làm</p>
              <Form.Item
                name="soGioLam"
                initialValue={record.soGioLam}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Số giờ Làm!",
                  },
                ]}
              >
                <Input placeholder="Số giờ Làm" allowClear />
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

export default UpdateLuongCongNhat;
