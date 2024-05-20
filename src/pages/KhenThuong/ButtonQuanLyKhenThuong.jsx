import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKhenThuongRow } from "../../redux/selector";
import AddKhenThuong from "./AddKhenThuong";
import {
  deleteKhenThuong,
  getListKhenThuong,
} from "../../redux/slices/khenThuongSlice/khenThuongSlice";

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

const ButtonQuanLyKhenThuong = () => {
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

  //  DELETE KHEN THUONG
  const khenThuongSelectedRow = useSelector(getKhenThuongRow);
  const handleDelete = (Id) => {
    Modal.confirm({
      title: "Xóa Khen Thưởng",
      content: "Bạn có muốn xóa Thưởng này không?",
      okText: "Có",
      cancelText: "Không",
      className: "custom-modal",
      centered,
      onOk: () => {
        dispatch(deleteKhenThuong(Id))
          .unwrap()
          .then(() => {
            const PageNumber = 1;
            const PageSize = 10;
            const data = { PageNumber, PageSize };
            dispatch(getListKhenThuong(data));
            openNotification(
              "success",
              `Xóa Khen Thưởng có ID ${Id} thành công!`
            );
          })
          .catch((error) => {
            console.error("Error: ", error);
          })
          .finally(() => {
            const PageNumber = 1;
            const PageSize = 10;
            const data = { PageNumber, PageSize };
            dispatch(getListKhenThuong(data));
            openNotification(
              "success",
              `Xóa Khen Thưởng có ID ${Id} thành công!`
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
        onClick={() => handleDelete(khenThuongSelectedRow[0].id)}
      >
        Xóa
      </Button>

      <AddKhenThuong onClose={handleOk} />
    </div>
  );
};

export default ButtonQuanLyKhenThuong;
