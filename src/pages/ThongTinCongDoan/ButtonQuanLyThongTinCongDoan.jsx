import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddThongTinCongDoan from "./AddThongTinCongDoan";
import { getThongTinCongDoanRow } from "../../redux/selector";
import {
  deleteThongTinCongDoan,
  getListThongTinCongDoan,
} from "../../redux/slices/thongTinCongDoanSlice/thongTinCongDoanSlice";

const buttonStyle = {
  height: "40px",
  width: "150px",
  borderRadius: "20px",
  margin: "0px 5px",
};

const centered = {
  /* marginTop: "100px",
    borderRadius: "20px", */
  /* display: "flex",
    alignItems: "center",
    justifyContent: "center", */
};

const ButtonQuanLyThongTinCongDoan = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

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

  // Modal Add
  const [isAddOpen, setIsAddOpen] = useState(false);

  const showAddModal = () => {
    setIsAddOpen(true);
  };

  const handleOk = () => {
    setIsAddOpen(false);
  };

  const handleCancel = () => {
    setIsAddOpen(false);
  };

  // DELETE CONG DOAN
  const thongTinCongDoanSelectedRow = useSelector(getThongTinCongDoanRow);
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xóa Thông Tin Công Đoàn",
      content: "Bạn có muốn xóa Thông Tin Công Đoàn này không?",
      okText: "Có",
      cancelText: "Không",
      className: "custom-modal",
      centered,
      onOk: () => {
        dispatch(deleteThongTinCongDoan(id))
          .unwrap()
          .then(() => {
            const PageNumber = 1;
            const PageSize = 10;
            const data = { PageNumber, PageSize };
            dispatch(getListThongTinCongDoan(data));
            openNotification(
              "success",
              `Xóa Thông Tin Công Đoàn có ID "${id}" thành công!`
            );
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
        // .finally(() => {
        //   const PageNumber = 1;
        //   const PageSize = 10;
        //   const data = { PageNumber, PageSize };
        //   dispatch(filterNhanSu(data));
        //   openNotification("success", `Xóa Nhân Sự có ID ${id} thành công!`);
        // });
      },
      onCancel: () => {
        console.log("Cancel deletion");
      },
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <Button
        size="small"
        className="exportBtn"
        type="primary"
        icon={<DownloadOutlined />}
        style={buttonStyle}
      >
        Xuất File
      </Button>

      <Button
        size="small"
        className="deleteBtn"
        type="primary"
        icon={<DeleteOutlined />}
        style={buttonStyle}
        onClick={() => handleDelete(thongTinCongDoanSelectedRow[0].id)}
      >
        Xóa
      </Button>

      <AddThongTinCongDoan onClose={handleOk} />
    </div>
  );
};

export default ButtonQuanLyThongTinCongDoan;
