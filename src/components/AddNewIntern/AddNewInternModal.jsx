import React, { useEffect, useState } from "react";
import "../../styles/Modal.css";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchListTinhTrang } from "../../redux/slices/tinhTrangLamViecSlice/tinhTrangLamViecSlice";
import { getListTinhTrangLamViec } from "../../redux/selector";

const AddNewInternModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const listTinhTrangLamViec = useSelector(getListTinhTrangLamViec);

  console.log("listTinhTrangLamViec", listTinhTrangLamViec);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOK = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchListTinhTrang());
  }, [dispatch]);

  const option_list_tinhTrang = listTinhTrangLamViec?.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  return (
    <div>
      <Button
        onClick={showModal}
        type="primary"
        style={{
          backgroundColor: "#2f8cef",
          height: "40px",
          borderRadius: "10px",
        }}
      >
        <PlusCircleFilled />
        Thêm thực tập sinh mới
      </Button>
      <Modal
        className="custom-modal"
        centered
        title="Add New Intern"
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        width={870}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            style={{ width: "100px", height: "40px", borderRadius: "10px" }}
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOK}
            style={{
              backgroundColor: "#2f8cef",
              width: "150px",
              height: "40px",
              borderRadius: "10px",
            }}
          >
            <PlusCircleFilled />
            Thêm
          </Button>,
        ]}
      >
        <Form>
          <Row style={{ justifyContent: "space-between" }}>
            {/*  1st Column in modal */}
            <Col>
              <p className="modalContent">ID Thực Tập Sinh</p>
              <Form.Item
                name="internID"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ID thực tập sinh!",
                  },
                ]}
              >
                <Input
                  className="Select_Input"
                  placeholder="ID Thực Tập Sinh"
                ></Input>
              </Form.Item>
              <p className="modalContent">Vị Trí</p>
              <Form.Item
                name="position"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Vị Trí!",
                  },
                ]}
              >
                <Input className="Select_Input" placeholder="Vị Trí"></Input>
              </Form.Item>
              <p className="modalContent">Email</p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Email!",
                  },
                ]}
              >
                <Input className="Select_Input" placeholder="Email"></Input>
              </Form.Item>
              <p className="modalContent">Tình Trạng làm việc</p>
              <Form.Item
                name="tinhTrangLamViecID"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn tình trạng"
                  options={option_list_tinhTrang}
                ></Select>
              </Form.Item>
            </Col>
            {/* 2nd column in modal */}
            <Col>
              <p className="modalContent">Họ và Tên</p>
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Họ và Tên!",
                  },
                ]}
              >
                <Input className="Select_Input" placeholder="Họ và Tên"></Input>
              </Form.Item>
              <p className="modalContent">Trường</p>
              <Form.Item
                name="school"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên Trường!",
                  },
                ]}
              >
                <Input
                  className="Select_Input"
                  placeholder="Tên trường"
                ></Input>
              </Form.Item>
              <p className="modalContent">Link CV</p>
              <Form.Item
                name="linkCV"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Link CV!",
                  },
                ]}
              >
                <Input className="Select_Input" placeholder="Link CV"></Input>
              </Form.Item>
              <p className="modalContent">Nhóm Zalo</p>
              <Form.Item
                name="groupZalo"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên Nhóm Zalo!",
                  },
                ]}
              >
                <Input
                  className="Select_Input"
                  placeholder="Tên nhóm Zalo"
                ></Input>
              </Form.Item>
            </Col>
            {/* 3rd column in modal */}
            <Col>
              <p className="modalContent">Số Điện Thoại</p>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Số Điện Thoại!",
                  },
                ]}
              >
                <Input
                  className="Select_Input"
                  placeholder="Số điện thoại"
                ></Input>
              </Form.Item>
              <p className="modalContent">Địa Chỉ</p>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Địa Chỉ nơi sinh sống!",
                  },
                ]}
              >
                <Input className="Select_Input" placeholder="Địa chỉ"></Input>
              </Form.Item>
              <p className="modalContent">Cố vấn</p>
              <Form.Item
                name="mentor"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên Cố Vấn!",
                  },
                ]}
              >
                <Input
                  className="Select_Input"
                  placeholder="Tên cố vấn"
                ></Input>
              </Form.Item>
              <p className="modalContent">Vai Trò</p>
              <Form.Item
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Vai Vai Trò!",
                  },
                ]}
              >
                <Input className="Select_Input" placeholder="Vai trò"></Input>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewInternModal;
