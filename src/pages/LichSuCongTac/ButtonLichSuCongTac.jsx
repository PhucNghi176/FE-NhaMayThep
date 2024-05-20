
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, notification } from 'antd';
import {
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "../../styles/button.css";
import { getCongTacRow } from '../../redux/selector';
import AddLichSuCongTac from './AddLichSuCongTac';
import EditLichSuCongTac from './EditLichSuCongTac';
import { deleteLichSuCongTac, getListCongTac } from '../../redux/slices/lichSuCongTacSlice/lichSuCongTacSlice';

const ButtonLichSuCongTac = () => {
  const dispatch = useDispatch();

  // Notification
  const [notificationType, setNotificationType] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    if (notificationType && notificationMessage) {
      notification[notificationType]({
        message: notificationMessage,
        placement: "top",
      });
    }
  }, [notificationType, notificationMessage]);

  const openNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
  };

  //useState Modal Add
  const [isAddOpen, setIsAddOpen] = useState(false);
  const showAddModal = () => {
    setIsAddOpen(true);
  };

  // UseState Modal Update
  const [isEditOpen, setIsEditOpen] = useState(false);
  const showEditModal = () => {
    setIsEditOpen(true);
  };

  const handleCancel = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
  };

  const selectedRow = useSelector(getCongTacRow);
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xóa lịch sử công tác?",
      content:
        `Bạn chắc muốn xóa lịch sử công tác của : ${selectedRow[0]?.hoVaTen}  không?`,
      onOk: () => {
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        dispatch(deleteLichSuCongTac(id))
          .unwrap()
          .then(() => {
            dispatch(getListCongTac(data));
            openNotification('success', `Xóa lịch sử công tác của: ${selectedRow[0]?.hoVaTen} thành công`);
          })
          .catch((error) => {
            console.error("Error: ", error);
          })
          .finally(() => {
            dispatch(getListCongTac(data));
            openNotification('success', `Xóa lịch sử công tác của: ${selectedRow[0]?.hoVaTen} thành công`);
          })
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
      >
        Xuất file
      </Button>

      <Button
        size="small"
        className="editBtn"
        type="primary"
        htmlType='submit'
        icon={<EditOutlined />}
        onClick={showEditModal}
      >
        Cập nhật
      </Button>

      <Button
        size="small"
        className="deleteBtn"
        htmlType='submit'
        type="primary"
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(selectedRow[0].id)}
      >
        Xóa
      </Button>

      <Button
        size="small"
        className="addBtn"
        type="primary"
        icon={<PlusOutlined />}
        onClick={showAddModal}
      >
        Thêm
      </Button>

      {/* Modal add */}
      <Modal
        title="Thêm mới lịch sử công tác"
        open={isAddOpen}
        onCancel={handleCancel}
        width={900}
        footer={null}
        destroyOnClose
      >
        <AddLichSuCongTac onClose={handleCancel} />
      </Modal>

      {/* Modal edit Đảng Viên */}
      <Modal
        title="Cập nhật lịch sử công tác"
        open={isEditOpen}
        onCancel={handleCancel}
        width={700}
        footer={null}
        destroyOnClose
      >
        <EditLichSuCongTac onClose={handleCancel} />
      </Modal>
    </div>
  );
};

export default ButtonLichSuCongTac;