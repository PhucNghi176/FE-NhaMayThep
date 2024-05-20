import { useDispatch, useSelector } from "react-redux";
import { getNhanSuRow } from "../../redux/selector";
import { Button, Form, Modal, notification } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AddNhanSu from "./AddNhanSu";
import { useEffect, useState } from "react";
import {
  deleteNhanSu,
  filterNhanSu,
} from "../../redux/slices/nhanSuSlice/nhanSuSlice";

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

const ButtonQuanLyNhanSu = () => {
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

  // Add modal
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

  // DELETE NHAN SU
  const nhanSuSelectedRow = useSelector(getNhanSuRow);
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xóa Nhân Sự",
      content: "Bạn có muốn xóa Nhân Sự này không?",
      okText: "Có",
      cancelText: "Không",
      className: "custom-modal",
      centered,
      onOk: () => {
        dispatch(deleteNhanSu(id))
          .unwrap()
          .then(() => {
            const PageNumber = 1;
            const PageSize = 10;
            const data = { PageNumber, PageSize };
            dispatch(filterNhanSu(data));
            openNotification(
              "success",
              `Xóa Nhân Sự có ID "${id}" thành công!`
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
        onClick={() => handleDelete(nhanSuSelectedRow[0].id)}
      >
        Xóa
      </Button>

      <AddNhanSu onClose={handleOk} />
    </div>
  );
};

export default ButtonQuanLyNhanSu;
