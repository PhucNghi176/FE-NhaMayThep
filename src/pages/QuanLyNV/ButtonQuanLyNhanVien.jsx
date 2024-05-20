import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, notification } from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import "../../styles/button.css";
import AddNhanVien from './AddNhanVien';
import EditNhanVien from './EditNhanVien';
import { deleteNhanVien, filterNhanVien, selectedNhanVien, selectedItem } from '../../redux/slices/nhanVienSlice/nhanVienSlice';
import { deleteCCCD } from '../../redux/slices/canCuocCongDanSlice/canCuocCongDanSlice';
import { getSelectedRowNV } from '../../redux/selector';

const ButtonGroup = () => {
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

  //  Delete
  const selectedRow = useSelector(getSelectedRowNV);
  const handleDelete = (id, canCuocCongDan) => {
    Modal.confirm({
      title: "Xóa Nhân Viên?",
      content:
        `Bạn chắc muốn xóa nhân viên: ${selectedRow[0]?.hoVaTen} này không?`,
      onOk: () => {
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        dispatch(deleteNhanVien(id))
          .unwrap()
          .then(() => {
            dispatch(deleteCCCD(canCuocCongDan));
            dispatch(filterNhanVien(data));
            openNotification('success', `Xóa nhân viên có tên: ${selectedRow[0]?.hoVaTen} thành công`);
          })
          .catch((error) => {
            console.error("Error: ", error);
          })
          .finally(() => {
            dispatch(deleteCCCD(canCuocCongDan));
            dispatch(filterNhanVien(data));
            openNotification('success', `Xóa nhân viên có tên: ${selectedRow[0]?.hoVaTen} thành công`);

          })
      },
      onCancel: () => {
        console.log("Cancel deletion");
      },
    });
  };

  const handleCancel = () => {
    // dispatch(selectedItem(true));
    // dispatch(selectedNhanVien(null));
    setIsAddOpen(false);
    setIsEditOpen(false);
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
        onClick={() => handleDelete(selectedRow[0].id, selectedRow[0].canCuocCongDan)}
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

      {/* Modal add Nhân Viên */}
      <Modal
        open={isAddOpen}
        onCancel={handleCancel}
        width={900}
        footer={null}
        destroyOnClose
      >
        <AddNhanVien onClose={handleCancel} />
      </Modal>

      {/* Modal edit Nhân Viên */}
      <Modal
        title="Cập nhật nhân viên"
        open={isEditOpen}
        onCancel={handleCancel}
        width={700}
        footer={null}
        destroyOnClose
      >
        <EditNhanVien onClose={handleCancel} />
      </Modal>
    </div>
  );
};

export default ButtonGroup;
