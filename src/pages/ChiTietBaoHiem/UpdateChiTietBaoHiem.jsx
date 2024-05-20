import { EditOutlined, PlusOutlined } from "@ant-design/icons";
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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterChiTietBaoHiem,
  updateChiTietBaoHiem,
} from "../../redux/slices/chiTietBaoHiemSlice/chiTietBaoHiemSlice";
import { getListBaoHiemSelector } from "../../redux/selector";
import { getListBaoHiem } from "../../redux/slices/baoHiemSlice/baoHiemSlice";

const UpdateChiTietBaoHiem = (props) => {
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

  // UPDATE CHI TIET BAO HIEM
  const listLoaiBaoHiem = useSelector(getListBaoHiemSelector);

  useEffect(() => {
    dispatch(getListBaoHiem());
  }, []);

  const option_list_baoHiem = listLoaiBaoHiem?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      dispatch(
        updateChiTietBaoHiem({ id: record.id, updatedChiTietBaoHiem: values })
      )
        .unwrap()
        .then(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Chi Tiết Bảo hiểm có ID: ${record.id} thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(filterChiTietBaoHiem(data));
        })
        .catch((error) => {
          openNotification("warning", error);
        })
        .finally(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Chi Tiết Bảo hiểm có ID: ${record.id} thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(filterChiTietBaoHiem(data));
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
        title="Cập nhật Chi Tiết Bảo Hiểm"
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

              <p className="modalContent">Ngày Hiệu Lực</p>
              <Form.Item
                name="ngayHieuLuc"
                initialValue={record ? dayjs(record.ngayHieuLuc) : ""}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Ngày Hiệu Lực!",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY - HH:mm:ss"
                  style={{ display: "flex", cursor: "pointer" }}
                />
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
            {/* 3rd column */}
            <Col>
              <p className="modalContent">Loại Bảo Hiểm</p>
              <Form.Item
                name="loaiBaoHiem"
                initialValue={record.loaiBaoHiem}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Loại Bảo Hiểm!",
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
                initialValue={record.noiCap}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Nội Cấp!",
                  },
                ]}
              >
                <Input placeholder="Nội Cấp" allowClear />
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

export default UpdateChiTietBaoHiem;
