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
  filterNhanSu,
  updateNhanSu,
} from "../../redux/slices/nhanSuSlice/nhanSuSlice";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { getHangLoatNhanSuSelector } from "../../redux/selector";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { getListHangLoatNhanSu } from "../../redux/slices/nhanSuSlice/getHangLoatNhanSuSlice";

const UpdateNhanSu = (props) => {
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

  // UPDATE NHAN SU
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

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      values.id = record.id;
      /* values.ngayKetThuc = "2024-04-20T13:55:54.495Z";

      values.ngayBatDau = "2024-03-13T13:55:54.495Z"; */

      dispatch(updateNhanSu({ id: record.id, updatedNhanSu: values }))
        .unwrap()
        .then(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Nhân Sự có ID: ${record.id} thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(filterNhanSu(data));
        })
        .catch((error) => {
          openNotification("warning", error);
        })
        .finally(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Nhân Sự có ID: "${record.id}" thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(filterNhanSu(data));
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
        title="Cập nhật Nhân Sự"
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

              <p className="modalContent">Loại Quá Trình</p>
              <Form.Item
                name="loaiQuaTrinhID"
                initialValue={record.loaiQuaTrinhID}
              >
                <Select
                  name="loaiQuaTrinhID"
                  placeholder="Chọn Loại Quá Trình"
                  options={option_list_loaiQuaTrinh}
                  allowClear
                ></Select>
              </Form.Item>

              <p className="modalContent">Ngày Bắt Đầu</p>
              <Form.Item
                name="ngayBatDau"
                initialValue={record ? dayjs(record.ngayBatDau) : ""}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Ngày Kết Thúc!",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY - HH:mm:ss"
                  style={{ display: "flex", cursor: "pointer" }}
                />
              </Form.Item>
            </Col>
            {/* 2st column */}
            <Col>
              <p className="modalContent">Phòng Ban</p>
              <Form.Item name="phongBanID" initialValue={record.phongBanID}>
                <Select
                  name="phongBanID"
                  placeholder="Chọn Phòng Ban"
                  options={option_list_phongBan}
                  allowClear
                ></Select>
              </Form.Item>

              <p className="modalContent">Chức Vụ</p>
              <Form.Item name="chucVuID" initialValue={record.chucVuID}>
                <Select
                  name="chucVuID"
                  placeholder="Chọn Chức Vụ"
                  options={option_list_chucVu}
                  allowClear
                ></Select>
              </Form.Item>

              <p className="modalContent">Ngày Kết Thúc</p>
              <Form.Item
                name="ngayKetThuc"
                initialValue={record ? dayjs(record.ngayKetThuc) : ""}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Ngày Kết Thúc!",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY - HH:mm:ss"
                  style={{ display: "flex", cursor: "pointer" }}
                />
              </Form.Item>
            </Col>
            {/* 3st column */}
            <Col>
              <p className="modalContent">Chức Danh</p>
              <Form.Item name="chucDanhID" initialValue={record.chucDanhID}>
                <Select
                  name="chucDanhID"
                  placeholder="Chọn Chức Danh"
                  options={option_list_chucDanh}
                  allowClear
                ></Select>
              </Form.Item>

              <p className="modalContent">Ghi Chú</p>
              <Form.Item
                name="ghiChu"
                initialValue={record.ghiChu}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Ghi Chú!",
                  },
                ]}
              >
                <Input placeholder="Ghi Chú" allowClear />
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

export default UpdateNhanSu;
