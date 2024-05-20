import { EditOutlined, PlusOutlined } from "@ant-design/icons";
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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterLuongThoiGian,
  updateLuongThoiGian,
} from "../../redux/slices/luongThoiGianSlice/luongThoiGianSlice";

const UpdateLuongThoiGian = (props) => {
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
        updateLuongThoiGian({ id: record.id, updatedLuongThoiGian: values })
      )
        .unwrap()
        .then(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Lương Thời Gian có ID: ${record.id} thành công`
          );
          const PageNo = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(filterLuongThoiGian(data));
        })
        .catch((error) => {
          openNotification("warning", error);
        })
        .finally(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Lương Thời Gian có ID: ${record.id} thành công`
          );
          const PageNo = 1;
          const PageSize = 10;
          const data = { PageNo, PageSize };
          dispatch(filterLuongThoiGian(data));
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
        title="Cập nhật Lương Thời Gian"
        open={isEditOpen}
        onCancel={handleEditCancel}
        width={870}
        footer={null}
      >
        <Form form={form} onFinish={handleEditSubmit}>
          <Row style={{ justifyContent: "space-between" }}>
            {/*  1st column */}
            <Col>
              <p className="modalContent">ID</p>
              <Form.Item name="id" initialValue={record.id}>
                <Input placeholder="ID" disabled style={{ color: "black" }} />
              </Form.Item>

              <p className="modalContent">Lương Năm</p>
              <Form.Item
                name="luongNam"
                initialValue={record.luongNam}
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
                initialValue={record.luongNgay}
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
            {/*  2nd column */}
            <Col>
              <p className="modalContent">Mã Số Nhân Viên</p>
              <Form.Item name="maSoNhanVien" initialValue={record.maSoNhanVien}>
                <Input
                  placeholder="Mã Số Nhân Viên"
                  disabled
                  style={{ color: "black" }}
                />
              </Form.Item>

              <p className="modalContent">Lương Tháng</p>
              <Form.Item
                name="luongThang"
                initialValue={record.luongThang}
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
                initialValue={record.luongGio}
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
            {/*  3rd column */}
            <Col>
              <p className="modalContent">Mã Lương Thời Gian</p>
              <Form.Item
                name="maLuongThoiGian"
                initialValue={record.maLuongThoiGian}
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
                initialValue={record.luongTuan}
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
                initialValue={record ? dayjs(record.ngayApDung) : ""}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Ngày Áp Dụng!",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY - HH:mm:ss"
                  style={{ display: "flex", cursor: "pointer" }}
                />
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

export default UpdateLuongThoiGian;
