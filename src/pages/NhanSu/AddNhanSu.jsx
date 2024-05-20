import { PlusOutlined } from "@ant-design/icons";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNhanSu,
  filterNhanSu,
} from "../../redux/slices/NhanSuSlice/nhanSuSlice";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { getHangLoatNhanSuSelector } from "../../redux/selector";
import { getListHangLoatNhanSu } from "../../redux/slices/NhanSuSlice/getHangLoatNhanSuSlice";

const AddNhanSu = ({ onClose }) => {
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
    // Dispatch the createNhanSu action with the form values
    dispatch(createNhanSu(values))
      .unwrap()
      .then(() => {
        // Close the Modal
        onClose();
        openNotification("success", "Tạo Nhân Sự thành công!");
        dispatch(filterNhanSu(data));
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
        dispatch(filterNhanSu(data));
        openNotification("success", "Tạo Nhân Sự thành công!");
        handleCancel();
      });
  };

  const listHangLoatNhanSu = useSelector(getHangLoatNhanSuSelector);

  useEffect(() => {
    dispatch(getListHangLoatNhanSu());
  }, []);

  const option_list_chucVu =
    listHangLoatNhanSu && listHangLoatNhanSu.ChucVu
      ? listHangLoatNhanSu.ChucVu.map((type) => ({
          value: type.key,
          label: type.value,
        }))
      : [];

  const option_list_chucDanh =
    listHangLoatNhanSu && listHangLoatNhanSu.ChucDanh
      ? listHangLoatNhanSu.ChucDanh.map((type) => ({
          value: type.key,
          label: type.value,
        }))
      : [];

  const option_list_phongBan =
    listHangLoatNhanSu && listHangLoatNhanSu.PhongBan
      ? listHangLoatNhanSu.PhongBan.map((type) => ({
          value: type.key,
          label: type.value,
        }))
      : [];

  const option_list_loaiQuaTrinh =
    listHangLoatNhanSu && listHangLoatNhanSu.LoaiQuaTrinh
      ? listHangLoatNhanSu.LoaiQuaTrinh.map((type) => ({
          value: type.key,
          label: type.value,
        }))
      : [];

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
        Tạo mới
      </Button>
      <Modal
        className="custom-modal"
        centered
        title="Tạo mới Nhân Sự"
        open={isAddOpen}
        onCancel={handleCancel}
        width={870}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Row style={{ justifyContent: "space-between" }}>
            {/* 1st column */}
            <Col>
              <p className="modalContent">Ngày Tạo</p>
              <Form.Item
                name="ngayTao"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Ngày Tạo!",
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

              <p className="modalContent">Ngày Bắt Đầu</p>
              <Form.Item
                name="ngayBatDau"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Ngày Bắt Đầu!",
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

              <p className="modalContent">Chức Vụ</p>
              <Form.Item
                name="chucVuID"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Chức Vụ!",
                  },
                ]}
              >
                <Select
                  name="chucVuID"
                  placeholder="Chọn Chức Vụ"
                  options={option_list_chucVu}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>
            {/* 2nd column */}
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

              <p className="modalContent">Ngày Kết Thúc</p>
              <Form.Item
                name="ngayKetThuc"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Ngày Kết Thúc!",
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

              <p className="modalContent">Chức Danh</p>
              <Form.Item
                name="chucDanhID"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Chức Danh!",
                  },
                ]}
              >
                <Select
                  name="chucDanhID"
                  placeholder="Chọn Chức Danh"
                  options={option_list_chucDanh}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>
            {/* 3rd column */}
            <Col>
              <p className="modalContent">Loại Quá Trình</p>
              <Form.Item
                name="loaiQuaTrinhID"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Loại Quá Trình!",
                  },
                ]}
              >
                <Select
                  name="loaiQuaTrinhID"
                  placeholder="Chọn Loại Quá Trình"
                  options={option_list_loaiQuaTrinh}
                  allowClear
                ></Select>
              </Form.Item>

              <p className="modalContent">Phòng Ban</p>
              <Form.Item
                name="phongBanID"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Phòng Ban!",
                  },
                ]}
              >
                <Select
                  name="phongBanID"
                  placeholder="Chọn Phòng Ban"
                  options={option_list_phongBan}
                  allowClear
                ></Select>
              </Form.Item>

              <p className="modalContent">Ghi Chú</p>
              <Form.Item
                name="ghiChu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Ghi Chú!",
                  },
                ]}
              >
                <Input placeholder="Ghi Chú" allowClear></Input>
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

export default AddNhanSu;
