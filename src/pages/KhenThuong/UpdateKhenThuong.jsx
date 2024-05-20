import { EditOutlined, PlusOutlined } from "@ant-design/icons";
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
  filterKhenThuong,
  updateKhenThuong,
} from "../../redux/slices/khenThuongSlice/khenThuongSlice";
import { getChinhSachNhanSu } from "../../redux/selector";
import { fetchChinhSachNhanSu } from "../../redux/slices/chinhSachNhanSuSlice/chinhSachNhanSuSlice";

const UpdateKhenThuong = (props) => {
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

  // UPDATE KHEN THUONG
  const listChinhSachNhanSu = useSelector(getChinhSachNhanSu);

  useEffect(() => {
    dispatch(fetchChinhSachNhanSu());
  }, []);

  const option_list_chinhSach = listChinhSachNhanSu?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      values.tongThuong = Number(values.tongThuong);
      dispatch(updateKhenThuong({ id: record.id, updatedKhenThuong: values }))
        .unwrap()
        .then(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Khen Thưởng có ID: ${record.id} thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(filterKhenThuong(data));
        })
        .catch((error) => {
          openNotification("warning", error);
        })
        .finally(() => {
          form.resetFields();
          setIsEditOpen(false);
          openNotification(
            "success",
            `Cập nhật Khen Thưởng có ID: ${record.id} thành công`
          );
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(filterKhenThuong(data));
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
        title="Cập nhật Khen Thưởng"
        open={isEditOpen}
        onCancel={handleEditCancel}
        width={870}
        footer={null}
      >
        <Form form={form} onFinish={handleEditSubmit}>
          <Row style={{ justifyContent: "space-between" }}>
            {/* 1s column */}
            <Col>
              <p className="modalContent">ID</p>
              <Form.Item name="id" initialValue={record.id}>
                <Input placeholder="ID" disabled style={{ color: "black" }} />
              </Form.Item>

              <p className="modalContent">Đợt Khen Thưởng</p>
              <Form.Item
                name="tenDotKhenThuong"
                initialValue={record.tenDotKhenThuong}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Đợt Khen Thưởng!",
                  },
                ]}
              >
                <Input placeholder="Đợt Khen Thưởng" allowClear />
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

              <p className="modalContent">Tổng Thưởng</p>
              <Form.Item
                name="tongThuong"
                initialValue={record.tongThuong}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Tổng Thưởng!",
                  },
                ]}
              >
                <Input placeholder="Tổng Thưởng" allowClear />
              </Form.Item>
            </Col>
            {/* 3rd column */}
            <Col>
              <p className="modalContent">Chính Sách Nhân Sự</p>
              <Form.Item
                name="chinhSachNhanSuID"
                initialValue={record.chinhSachNhanSuID}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Chính Sách Nhân Sự ID!",
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

export default UpdateKhenThuong;
