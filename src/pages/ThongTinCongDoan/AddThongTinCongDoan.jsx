import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  notification,
} from "antd";
import { useDispatch } from "react-redux";
import {
  createThongTinCongDoan,
  filterThongTinCongDoan,
} from "../../redux/slices/thongTinCongDoanSlice/thongTinCongDoanSlice";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

const AddThongTinCongDoan = ({ onClose }) => {
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

    dispatch(createThongTinCongDoan(values))
      .unwrap()
      .then(() => {
        onClose();
        openNotification("success", "Tạo Thông Tin Công Đoàn thành công!");
        dispatch(filterThongTinCongDoan(data));
        handleCancel();
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
        dispatch(filterThongTinCongDoan(data));
        openNotification("success", "Tạo Thông Tin Công Đoàn thành công!");
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
        title="Tạo mới Thông Tin Công Đoàn"
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
                name="nhanVienID"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Mã Số Nhân Viên!",
                  },
                ]}
              >
                <Input placeholder="Mã Số Nhân Viên" allowClear></Input>
              </Form.Item>
            </Col>
            {/* 2ndt column */}
            <Col>
              <p className="modalContent">Thư Ký Công Đoàn</p>
              <Form.Item
                name="thuKyCongDoan"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Thư Ký Công Đoàn!",
                  },
                ]}
              >
                <Select
                  name="thuKyCongDoan"
                  placeholder="Thư Ký Công Đoàn"
                  allowClear
                >
                  <Select.Option value="true">Có</Select.Option>
                  <Select.Option value="false">Không</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {/* 3rd column */}
            <Col>
              <p className="modalContent">Ngày Gia Nhập</p>
              <Form.Item
                name="ngayGiaNhap"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Ngày Gia Nhập!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Ngày Gia Nhập"
                  style={{
                    width: "270px",
                    cursor: "pointer",
                  }}
                  locale={locale}
                  format="DD/MM/YYYY"
                ></DatePicker>
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

export default AddThongTinCongDoan;
