import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTTDT, fetchTTDT } from "../../redux/slices/thongTinDaoTaoSlice/thongTinDaoTaoSlice";
import { Button, Modal } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { getSelectedTTDT } from "../../redux/selector";
import ModalAddThongTinDaoTao from "./ModalAddThongTinDaoTao";
import ModalEditThongTinDaoTao from "./ModalEditThongTinDaoTao";

const ThongTinDaoTaoButton = () => {
  const dispatch = useDispatch();
  const selectedRow = useSelector(getSelectedTTDT);

 //Modal add
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
        dispatch(deleteTTDT(id))
          .then(() => {
            dispatch(fetchTTDT());
          })
          .catch((error) => {
            console.error("Error: ", error);
          })
          .finally(() => {
            const PageNumber = 1;
            const PageSize = 10;
            const data = { PageNumber, PageSize };
            dispatch(fetchTTDT(data));
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
        footer={null}
        width={700}
      >
        <ModalAddThongTinDaoTao onClose={handleCancel}/>
      </Modal>


      <Button
        size="small"
        className="deleteBtn"
        type="primary"
        icon={<DeleteOutlined />}
        style={buttonStyle}
        onClick={() => handleDelete(selectedRow.id)}
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
        title="Sửa Thông tin Đào Tạo"
        open={isModalEditOpen}
        onCancel={handleEditCancel}
        destroyOnClose
        footer={null}
        width={700}
      >
        <ModalEditThongTinDaoTao onClose={handleEditCancel} />
      </Modal>
    </div>
  );
}

export default ThongTinDaoTaoButton;
