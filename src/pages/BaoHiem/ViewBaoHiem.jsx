import React, { useState } from "react";
import "../../styles/Modal.css";
import { Button, Col, Form, Input, Modal, Row } from "antd";

const ViewBaoHiem = (props) => {
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
          width: "130px",
          borderRadius: "20px",
        }}
      >
        Xem
      </Button>
      <Modal
        className="custom-modal"
        centered
        title="Xem Thông Tin Bảo Hiểm"
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        width={870}
        footer={null}
      >
        <Form>
          <Row style={{ justifyContent: "space-between" }}>
            {/* 1st column */}
            <Col>
              <p className="modalContent">ID</p>
              <Form.Item name="id" initialValue={record.id}>
                <Input
                  className="Select_Input"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
            </Col>
            {/* 2st column */}
            <Col>
              <p className="modalContent">Họ và Tên</p>
              <Form.Item name="name" initialValue={record.name}>
                <Input
                  className="Select_Input"
                  disabled
                  style={{ color: "black" }}
                ></Input>
              </Form.Item>
            </Col>
            {/* 3st column */}
            <Col>
              <p className="modalContent">Phần Trăm Khấu trừ</p>
              <Form.Item
                name="phanTramKhauTru"
                initialValue={record.phanTramKhauTru}
              >
                <Input
                  className="Select_Input"
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

export default ViewBaoHiem;
