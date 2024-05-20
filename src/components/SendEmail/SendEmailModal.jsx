import React, { useState } from "react";
import { Button, Col, Form, Modal, Row, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MailOutlined } from "@ant-design/icons";

const SendEmailModal = () => {
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
        onClick={showModal}
        type="primary"
        style={{
          backgroundColor: "#611dad",
          height: "40px",
          borderRadius: "10px",
        }}
      >
        <MailOutlined />
        Gửi Email
      </Button>
      <Modal
        className="custom-modal"
        centered
        title="Gửi Email"
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
            <MailOutlined />
            Gửi Email
          </Button>,
        ]}
      >
        <Form>
          <Row style={{ justifyContent: "space-between" }}>
            {/* 1st column in modal */}
            <Col>
              <p
                style={{
                  marginTop: 0,
                  marginBottom: "5px",
                  fontWeight: "bold",
                  display: "flex",
                }}
              >
                Chọn loại Email
              </p>
              <Form.Item
                name="emailType"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại Email!",
                  },
                ]}
              >
                <Select
                  placeholder="Loại Email"
                  allowClear
                  className="Select_Input"
                  style={{ width: "235px" }}
                  options={[
                    {
                      value: "email phỏng vấn",
                      label: "Email Phỏng Vấn",
                    },
                    {
                      value: "kết quả email",
                      label: "Kết Quả Email",
                    },
                    {
                      value: "thông tin thực tập sinh",
                      label: "Thông Tin Thực Tập Sinh",
                    },
                    {
                      value: "hồ sơ bổ sung",
                      label: "Hồ Sơ Bổ Sung",
                    },
                    {
                      value: "hoàn trả hồ sơ",
                      label: "Hoàn Trả Hồ Sơ",
                    },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            {/* 2nd column in modal */}
            <Col>
              <Form.Item style={{ width: "575px" }}>
                <TextArea
                  style={{ height: "150px", marginTop: "27px" }}
                  allowClear
                  placeholder="Nhập Email..."
                ></TextArea>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default SendEmailModal;
