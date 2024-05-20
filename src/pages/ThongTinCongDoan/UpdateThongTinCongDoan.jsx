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
import { useDispatch } from "react-redux";
import {
  filterThongTinCongDoan,
  updateThongTinCongDoan,
} from "../../redux/slices/thongTinCongDoanSlice/thongTinCongDoanSlice";

const UpdateThongTinCongDoan = (props) => {
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

  const option_thuKyCongDoan = [
    { value: true, label: "Có" },
    { value: false, label: "Không" },
  ];

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      values.id = record.id;
      /* values.ngayKetThuc = "2024-04-20T13:55:54.495Z";

      values.ngayBatDau = "2024-03-13T13:55:54.495Z"; */

      dispatch(
        updateThongTinCongDoan({
          id: record.id,
          updatedThongTinCongDoan: values,
        })
      )
        .unwrap()
        .then(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Thông Tin Công Đoàn có ID: ${record.id} thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(filterThongTinCongDoan(data));
        })
        .catch((error) => {
          openNotification("warning", error);
        })
        .finally(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Thông Tin Công Đoàn có ID: "${record.id}" thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(filterThongTinCongDoan(data));
        });
    });
  };
  //   console.log("record: ", re);
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
        title="Cập nhật Thông Tin Công Đoàn"
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

              <p className="modalContent">Ngày Gia Nhập</p>
              <Form.Item
                name="ngayGiaNhap"
                initialValue={record ? dayjs(record.ngayGiaNhap) : ""}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Ngày Gia Nhập!",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY - HH:mm:ss"
                  style={{ display: "flex", cursor: "pointer" }}
                />
              </Form.Item>
            </Col>
            {/* 1st column */}
            <Col>
              <p className="modalContent">Mã Số Nhân Viên</p>
              <Form.Item name="nhanVienId" initialValue={record.nhanVienID}>
                <Input
                  placeholder="Mã Số Nhân Viên"
                  disabled
                  style={{ color: "black" }}
                />
              </Form.Item>
            </Col>
            {/* 1st column */}
            <Col>
              <p className="modalContent">Thư Ký Công Đoàn</p>
              <Form.Item
                name="thuKyCongDoan"
                initialValue={record.thuKiCongDoan}
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
                  options={option_thuKyCongDoan}
                  allowClear
                >
                  {/* {option_thuKyCongDoan.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))} */}
                </Select>
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

export default UpdateThongTinCongDoan;
