import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCaLamRow } from "../../redux/selector";
import {
  checkInCaLam,
  checkOutCaLam,
  deleteCaLam,
  fetchCaLam,
} from "../../redux/slices/DangKyCaLamSlice/DangKyCaLamSlice";
import { Button, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ModalAddCaLam from "./ModalAddCaLam";
import ModalEditCaLam from "./ModalEditCaLam";

const ButtonDangKyCaLam = () => {
  const dispatch = useDispatch();
  const selectedRow = useSelector(getCaLamRow);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //modal edit
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const showEditModal = () => {
    setIsModalEditOpen(true);
  };

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xoá?",
      content: "Bạn có chắc muốn xoá?",
      onOk: () => {
        dispatch(deleteCaLam(id))
          .then(() => {
            dispatch(fetchCaLam());
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      },
      onCancel: () => {
        console.log("Cancel deletion");
      },
    });
  };

  const buttonStyle = {
    width: "100px",
    margin: "0 1px",
    borderRadius: "30px",
  };

  return (
    <div>
      <Button
        size="small"
        className="exportBtn"
        type="primary"
        icon={<UploadOutlined />}
        style={buttonStyle}
      >
        Xuất
      </Button>

      <Button
        size="small"
        className="addBtn"
        type="primary"
        icon={<PlusOutlined />}
        style={buttonStyle}
        onClick={showModal}
      >
        Thêm
      </Button>
      <Modal
        title="Thêm mới"
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
        width={800}
      >
        <ModalAddCaLam onClose={handleCancel}/>
      </Modal>

      <Button
        size="small"
        className="deleteBtn"
        type="primary"
        icon={<DeleteOutlined />}
        style={buttonStyle}
        onClick={() => handleDelete(selectedRow[0].id)}
        disabled={!selectedRow || selectedRow.length === 0}
      >
        Xoá
      </Button>

      <Button
        size="small"
        className="editBtn"
        type="primary"
        icon={<EditOutlined />}
        onClick={showEditModal}
        style={buttonStyle}
        disabled={!selectedRow || selectedRow.length === 0}
      >
        Sửa
      </Button>
      <Modal
        title="Sửa Ca Làm"
        open={isModalEditOpen}
        onCancel={handleEditCancel}
        destroyOnClose
        footer={null}
        width={800}
      >
        <ModalEditCaLam onClose={handleEditCancel} />
      </Modal>
    </div>
  );
};

export default ButtonDangKyCaLam;
