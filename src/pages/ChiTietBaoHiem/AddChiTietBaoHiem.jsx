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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createChiTietBaoHiem,
  filterChiTietBaoHiem,
} from "../../redux/slices/chiTietBaoHiemSlice/chiTietBaoHiemSlice";
import { PlusOutlined } from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { getListBaoHiemSelector } from "../../redux/selector";
import { getListBaoHiem } from "../../redux/slices/baoHiemSlice/baoHiemSlice";

const AddchiTietBaoHiem = ({ onClose }) => {
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

  // ADD CHI TIET BAO HIEM
  const listLoaiBaoHiem = useSelector(getListBaoHiemSelector);

  useEffect(() => {
    dispatch(getListBaoHiem());
  }, []);

  const option_list_baoHiem = listLoaiBaoHiem?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const onFinish = (values) => {
    console.log(values);
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    // Dispatch the createBaoHiem action with the form values
    dispatch(createChiTietBaoHiem(values))
      .unwrap()
      .then(() => {
        // Close the Modal
        onClose();
        openNotification("success", "Tạo Chi Tiết Bảo Hiểm thành công!");
        dispatch(filterChiTietBaoHiem(data));
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
        dispatch(filterChiTietBaoHiem(data));
        openNotification("success", "Tạo Chi Tiết Bảo Hiểm thành công!");
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
        title="Tạo mới Chi Tiết Bảo Hiểm"
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
                <Input placeholder="Mã Số Nhân Viên"></Input>
              </Form.Item>

              <p className="modalContent">Ngày Kết Thúc</p>
              <Form.Item
                name="ngayKetThuc"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Ngày Kết Thúc!",
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
            {/* 2nd column */}
            <Col>
              <p className="modalContent">Loại Bảo Hiểm</p>
              <Form.Item
                name="loaiBaoHiem"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Loại Bảo Hiểm!",
                  },
                ]}
              >
                <Select
                  placeholder="Loại Bảo Hiểm"
                  options={option_list_baoHiem}
                  allowClear
                />
              </Form.Item>

              <p className="modalContent">Nội Cấp</p>
              <Form.Item
                name="noiCap"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Nội Cấp!",
                  },
                ]}
              >
                <Input placeholder="Nội Cấp" allowClear></Input>
              </Form.Item>
            </Col>
            {/* 3rd column */}
            <Col>
              <p className="modalContent">Ngày Hiệu Lực</p>
              <Form.Item
                name="ngayHieuLuc"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Ngày Hiệu Lực!",
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

export default AddchiTietBaoHiem;
