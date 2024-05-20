import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createLuongThoiGian,
  filterLuongThoiGian,
} from "../../redux/slices/luongThoiGianSlice/luongThoiGianSlice";
import { PlusOutlined } from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/vi_VN";

const AddLuongThoiGian = ({ onClose }) => {
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

  // POST - CREATE LUONG THOI GIAN
  const onFinish = (values) => {
    console.log(values);
    const PageNo = 1;
    const PageSize = 10;
    const data = { PageNo, PageSize };
    // Dispatch the createLuongThoiGian action with the form values
    dispatch(createLuongThoiGian(values))
      .unwrap()
      .then(() => {
        // Close the Modal
        onClose();
        openNotification("success", "Tạo Lương Thời Gian thành công!");
        dispatch(filterLuongThoiGian(data));
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
        dispatch(filterLuongThoiGian(data));
        openNotification("success", "Tạo Lương Thời Gian thành công!");
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

              <p className="modalContent">Lương Tháng</p>
              <Form.Item
                name="luongThang"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Lương Tháng!",
                  },
                ]}
              >
                <Input placeholder="Lương Tháng" allowClear />
              </Form.Item>

              <p className="modalContent">Lương Giờ</p>
              <Form.Item
                name="luongGio"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Lương Giờ!",
                  },
                ]}
              >
                <Input placeholder="Lương Giờ" allowClear />
              </Form.Item>
            </Col>
            {/* 2nd column */}
            <Col>
              <p className="modalContent">Mã Lương Thời Gian</p>
              <Form.Item
                name="maLuongThoiGian"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Mã Lương Thời Gian!",
                  },
                ]}
              >
                <Input placeholder="Mã Lương Thời Gian" allowClear />
              </Form.Item>

              <p className="modalContent">Lương Tuần</p>
              <Form.Item
                name="luongTuan"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Lương Tuần!",
                  },
                ]}
              >
                <Input placeholder="Lương Tuần" allowClear />
              </Form.Item>

              <p className="modalContent">Ngày Áp Dụng</p>
              <Form.Item
                name="ngayApDung"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Ngày Áp Dụng!",
                  },
                ]}
              >
                <DatePicker
                  style={{
                    width: "270px",
                    cursor: "pointer",
                  }}
                  locale={locale}
                  format="DD/MM/YYYY"
                ></DatePicker>
              </Form.Item>
            </Col>
            {/* 3rd column */}
            <Col>
              <p className="modalContent">Lương Năm</p>
              <Form.Item
                name="luongNam"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Lương Năm!",
                  },
                ]}
              >
                <Input placeholder="Lương Năm" allowClear />
              </Form.Item>

              <p className="modalContent">Lương Ngày</p>
              <Form.Item
                name="luongNgay"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Lương Ngày!",
                  },
                ]}
              >
                <Input placeholder="Lương Ngày" allowClear />
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

export default AddLuongThoiGian;
