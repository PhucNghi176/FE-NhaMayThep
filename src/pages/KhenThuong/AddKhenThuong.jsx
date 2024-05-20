import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createKhenThuong,
  filterKhenThuong,
} from "../../redux/slices/khenThuongSlice/khenThuongSlice";
import { getChinhSachNhanSu } from "../../redux/selector";
import { fetchChinhSachNhanSu } from "../../redux/slices/ChinhSachNhanSuSlice/chinhSachNhanSuSlice";

const AddKhenThuong = ({ onClose }) => {
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

  // ADD KHEN THUONG
  const listChinhSachNhanSu = useSelector(getChinhSachNhanSu);

  useEffect(() => {
    dispatch(fetchChinhSachNhanSu());
  }, []);

  const option_list_chinhSach = listChinhSachNhanSu?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const onFinish = (values) => {
    console.log(values);
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    // Dispatch the createKhenThuong action with the form values
    dispatch(createKhenThuong(values))
      .unwrap()
      .then(() => {
        // Close the Modal
        onClose();
        openNotification("success", "Tạo Khen Thưởng thành công!");
        dispatch(filterKhenThuong(data));
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
        dispatch(filterKhenThuong(data));
        openNotification("success", "Tạo Khen Thưởng thành công!");
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
                <Input placeholder="Mã Số Nhân Viên" allowClear></Input>
              </Form.Item>

              <p className="modalContent">Tổng Thưởng</p>
              <Form.Item
                name="tongThuong"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Tổng Thưởng!",
                  },
                ]}
              >
                <Input placeholder="Tổng Thưởng" allowClear></Input>
              </Form.Item>
            </Col>
            {/* 2nd column */}
            <Col>
              <p className="modalContent">Chính Sách Nhân Sự</p>
              <Form.Item
                name="chinhSachNhanSuID"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Chính Sách Nhân Sự!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn Chính Sách Nhân Sự"
                  options={option_list_chinhSach}
                  allowClear
                />
              </Form.Item>
            </Col>
            {/* 3rd column */}
            <Col>
              <p className="modalContent">Đợt Khen Thưởng</p>
              <Form.Item
                name="tenDotKhenThuong"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Đợt Khen Thưởng!",
                  },
                ]}
              >
                <Input placeholder="Đợt Khen Thưởng" allowClear></Input>
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

export default AddKhenThuong;
