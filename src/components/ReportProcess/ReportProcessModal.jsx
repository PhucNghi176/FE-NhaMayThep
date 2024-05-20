import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import "../../styles/Modal.css";

const ReportProcessModal = (props) => {
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
          width: "120px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        2 báo cáo
        <EditOutlined />
      </Button>
      <Modal
        className="custom-modal"
        centered
        title="Quá Trình Báo Cáo"
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
              height: "40px",
              borderRadius: "10px",
            }}
          >
            <SaveOutlined />
            Lưu Thay Đổi
          </Button>,
        ]}
      >
        <Form>
          <Row style={{ justifyContent: "space-between" }}>
            {/* 1st column in modal */}
            <Col>
              <p className="modalContent">Vị Trí</p>
              <Form.Item name="position" initialValue={record.position}>
                <Input
                  className="Select_Input"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
            </Col>
            {/* 2nd column in modal */}
            <Col>
              <p className="modalContent">Dự Án</p>
              <Form.Item name="project" initialValue={record.project}>
                <Input
                  className="Select_Input"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
            </Col>
            {/* 3rd column in modal */}
            <Col>
              <p className="modalContent">Cố Vấn</p>
              <Form.Item name="mentor" initialValue={record.mentor}>
                <Input
                  className="Select_Input"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ display: "block" }}>
            <Col>
              <p className="modalContent">Báo Cáo</p>
              <Form.Item>
                <TextArea
                  style={{ height: "150px" }}
                  placeholder="Báo cáo"
                ></TextArea>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ReportProcessModal;
