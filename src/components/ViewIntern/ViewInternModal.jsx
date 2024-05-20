import React, { useState } from "react";
import "../../styles/Modal.css";
import { Button, Col, Form, Input, Modal, Row } from "antd";

const ViewInternModal = (props) => {
  const { record } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    console.log("record", record);
  };

  const handleOK = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        onClick={showModal}
        style={{
          width: "75px",
          borderRadius: "20px",
        }}
      >
        View
      </Button>
      <Modal
        className="custom-modal"
        centered
        title="View details of Intern"
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        width={870}
        footer={null}
      >
        <Form>
          <Row style={{ justifyContent: "space-between" }}>
            {/*  1st Column in modal */}
            <Col>
              <p className="modalContent">ID Thực Tập Sinh</p>
              <Form.Item name="internId" initialValue={record.internId}>
                <Input
                  className="Select_Input"
                  placeholder="ID thực tập sinh"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
              <p className="modalContent">Vị Trí</p>
              <Form.Item name="position" initialValue={record.position}>
                <Input
                  className="Select_Input"
                  placeholder="Vị trí"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
              <p className="modalContent">Email</p>
              <Form.Item name="email" initialValue={record.email}>
                <Input
                  className="Select_Input"
                  placeholder="Email"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
              <p className="modalContent">Dự Án</p>
              <Form.Item name="project" initialValue={record.project}>
                <Input
                  className="Select_Input"
                  placeholder="Tên dự án"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
            </Col>
            {/* 2nd column in modal */}
            <Col>
              <p className="modalContent">Họ và Tên</p>
              <Form.Item name="fullName" initialValue={record.fullName}>
                <Input
                  className="Select_Input"
                  placeholder="Họ và Tên"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
              <p className="modalContent">Trường</p>
              <Form.Item name="school" initialValue={record.school}>
                <Input
                  className="Select_Input"
                  placeholder="Tên trường"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
              <p className="modalContent">Link CV</p>
              <Form.Item name="cv" initialValue={record.cv}>
                <Input
                  className="Select_Input"
                  placeholder="Link CV"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
              <p className="modalContent">Nhóm Zalo</p>
              <Form.Item name="groupZalo" initialValue={record.groupZalo}>
                <Input
                  className="Select_Input"
                  placeholder="Tên nhóm Zalo"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
            </Col>
            {/* 3rd column in modal */}
            <Col>
              <p className="modalContent">Số Điện Thoại</p>
              <Form.Item name="phoneNumber" initialValue={record.phoneNumber}>
                <Input
                  className="Select_Input"
                  placeholder="Số điện thoại"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
              <p className="modalContent">Địa Chỉ</p>
              <Form.Item name="address" initialValue={record.address}>
                <Input
                  className="Select_Input"
                  placeholder="Địa chỉ"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
              <p className="modalContent">Cố Vấn</p>
              <Form.Item name="mentor" initialValue={record.mentor}>
                <Input
                  className="Select_Input"
                  placeholder="Tên cố vấn"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
              <p className="modalContent">Vai Trò</p>
              <Form.Item name="role" initialValue={record.role}>
                <Input
                  className="Select_Input"
                  placeholder="Vai trò"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewInternModal;
