import { TeamOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useState } from "react";
import "../../styles/Modal.css";

const CreateGroupModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
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
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: "#611dad",
          height: "40px",
          borderRadius: "10px",
        }}
      >
        <TeamOutlined />
        Tạo Nhóm
      </Button>
      <Modal
        className="custom-modal"
        centered
        title="Tạo Nhóm"
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
              backgroundColor: "#611dad",
              width: "150px",
              height: "40px",
              borderRadius: "10px",
            }}
          >
            <TeamOutlined />
            Tạo Nhóm
          </Button>,
        ]}
      >
        <Form>
          <Row style={{ justifyContent: "space-between" }}>
            {/*  1st column in modal */}
            <Col>
              <p className="modalContent">Vai trò</p>
              <Form.Item
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn vai trò!",
                  },
                ]}
              >
                <Select
                  className="Select_Input"
                  placeholder="Cố vấn/Lãnh đạo team/Thực tập sinh"
                  allowClear
                  options={[
                    {
                      value: "mentor",
                      label: "Cố vấn",
                    },
                    {
                      value: "leader",
                      label: "Lãnh đạo team",
                    },
                    {
                      value: "intern",
                      label: "Thực tập sinh",
                    },
                  ]}
                ></Select>
              </Form.Item>
              <p className="modalContent">Cố Vấn</p>
              <Form.Item
                name="mentor"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên cố vấn!",
                  },
                ]}
              >
                <Input
                  className="Select_Input"
                  placeholder="Tên cố vấn"
                ></Input>
              </Form.Item>
            </Col>
            {/*  2nd column in modal */}
            <Col>
              <p className="modalContent">Dự Án</p>
              <Form.Item
                name="project"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn dự án!",
                  },
                ]}
              >
                <Select
                  className="Select_Input"
                  placeholder="Hệ thống thực tập sinh"
                  allowClear
                  options={[
                    {
                      value: "Intern System",
                      label: "Hệ thống thực tập sinh",
                    },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            {/* 3rd column in modal */}
            <Col>
              <p className="modalContent">Nhóm Zalo</p>
              <Form.Item
                name="groupZalo"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên nhóm Zalo!",
                  },
                ]}
              >
                <Input
                  className="Select_Input"
                  placeholder="Tên nhóm Zalo"
                ></Input>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateGroupModal;
