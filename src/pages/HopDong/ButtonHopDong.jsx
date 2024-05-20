import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined
} from "@ant-design/icons";
import {
  Button,
  Form,
  Modal
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedHopDong } from "../../redux/selector";
import { fetchHangLoatHopDong } from "../../redux/slices/hopDongSlice/getHangLoatSlice";
import {
  deleteHopDong,
  fetchHopDong
} from "../../redux/slices/hopDongSlice/hopDongSlice";
import "../../styles/button.css";
import ModalAddHopDong from "./ModalAddHopDong";
import ModalEditHopDong from "./ModalEdithopDong";

const buttonStyle = {
  width: "100px",
  margin: "0 1px",
  borderRadius: "30px",
};

const ButtonHopDong = () => {
  const dispatch = useDispatch();
  const selectedRow = useSelector(getSelectedHopDong);

  useEffect(() => {
    dispatch(fetchHangLoatHopDong());
    dispatch(fetchHopDong());
  }, [dispatch]);

  //Modal add
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xoá Hợp Đồng?",
      content: "Bạn có chắc muốn xoá hợp đồng này?",
      onOk: () => {
        dispatch(deleteHopDong(id))
          .then(() => {
            dispatch(fetchHopDong());
          })
          .catch((error) => {
            console.error("Error: ", error);
          })
          .finally(() => {
            const PageNumber = 1;
            const PageSize = 10;
            const data = { PageNumber, PageSize };
            dispatch(fetchHopDong(data));
          });
      },
      onCancel: () => {
        console.log("Cancel deletion");
      },
    });
    console.log("scvdsv", selectedRow[0].id);
  };

  //modal edit
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const showEditModal = () => {
    setIsModalEditOpen(true);
  };

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
    form.resetFields();
  };

  const [form] = Form.useForm();

  return (
    <div style={{ display: "flex", paddingBottom: "20px" }}>
      <Button
        size="small"
        className="exportBtn"
        type="primary"
        icon={<UploadOutlined />}
        style={buttonStyle}
      >
        Export
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
        style={buttonStyle}
        onClick={showEditModal}
        disabled={!selectedRow || selectedRow.length === 0}
      >
        Sửa
      </Button>

      <Modal
        title="Sửa Hợp Đồng"
        open={isModalEditOpen}
        onCancel={handleEditCancel}
        footer={null}
        destroyOnClose
        width={700}
      >
        <ModalEditHopDong onClose={handleEditCancel}/>
      </Modal>

      <Modal
        title="Thêm mới hợp đồng"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        destroyOnClose
      >
        <ModalAddHopDong onClose={handleCancel}/>
      </Modal>
    </div>
  );
};

export default ButtonHopDong;
