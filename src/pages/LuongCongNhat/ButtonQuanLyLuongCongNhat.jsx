import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddLuongCongNhat from "./AddLuongCongNhat";
import { getLuongCongNhatRow } from "../../redux/selector";
import {
  deleteLuongCongNhat,
  filterLuongCongNhat,
} from "../../redux/slices/luongCongNhatSlice/luongCongNhatSlice";

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

const ButtonQuanLyLuongCongNhat = () => {
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

  //  DELETE LUONG CONG NHAT
  const luongCongNhatSelectedRow = useSelector(getLuongCongNhatRow);
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xóa Lương Công Nhật",
      content: "Bạn có muốn xóa Lương Công Nhật này không?",
      okText: "Có",
      cancelText: "Không",
      className: "custom-modal",
      centered,
      onOk: () => {
        dispatch(deleteLuongCongNhat(id))
          .unwrap()
          .then(() => {
            const PageNo = 1;
            const PageSize = 10;
            const data = { PageNo, PageSize };
            dispatch(filterLuongCongNhat(data));
            openNotification(
              "success",
              `Xóa Lương Công Nhật có ID ${id} thành công!`
            );
          })
          .catch((error) => {
            console.error("Error: ", error);
          })
          .finally(() => {
            const PageNo = 1;
            const PageSize = 10;
            const data = { PageNo, PageSize };
            dispatch(filterLuongCongNhat(data));
            openNotification(
              "success",
              `Xóa Lương Công Nhật có ID ${id} thành công!`
            );
          });
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
        onClick={() => handleDelete(luongCongNhatSelectedRow[0].id)}
      >
        Xóa
      </Button>

      <AddLuongCongNhat onClose={handleOk} />
    </div>
  );
};

export default ButtonQuanLyLuongCongNhat;
