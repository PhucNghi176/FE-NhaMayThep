import React, { useState } from 'react';
import { Button, Form, Input, Col, Row, Modal, Typography } from 'antd';

const { Title } = Typography

const ViewNhanVien = (props) => {
    const { record } = props

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
            <Button onClick={showModal} style={{ width: '50px', marginRight: '5px' }}>View</Button>
            <Modal
                centered
                title="View details of Intern"
                open={isModalOpen}
                onOk={handleOK}
                onCancel={handleCancel}
                width={870}
                footer={null}
            >
                <Form>
                    <Row gutter={[5]}>
                        {/*  1st Column in modal */}
                        <Col span={8}>
                            <Title level={5}>Email</Title>
                            <Form.Item name="email" initialValue={record.email}>
                                <Input
                                    disabled
                                    style={{ color: "black" }}
                                ></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Họ và Tên</Title>
                            <Form.Item name="hoVaTen" initialValue={record.hoVaTen}>
                                <Input
                                    disabled
                                    style={{ color: "black" }}
                                ></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Chức vụ</Title>
                            <Form.Item name="chucVu" initialValue={record.chucVu}>
                                <Input
                                    disabled
                                    style={{ color: "black" }}
                                ></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Tình trạng làm việc</Title>
                            <Form.Item name="tinhTrangLamViec" initialValue={record.tinhTrangLamViec}>
                                <Input
                                    disabled
                                    style={{ color: "black" }}
                                ></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Ngày vào công ty</Title>
                            <Form.Item name="ngayVaoCongTy" initialValue={record.ngayVaoCongTy}>
                                <Input
                                    disabled
                                    style={{ color: "black" }}
                                ></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Địa chỉ liên lạc</Title>
                            <Form.Item name="diaChiLienLac" initialValue={record.diaChiLienLac}>
                                <Input
                                    disabled
                                    style={{ color: "black" }}
                                ></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Số điện thoại liên lạc</Title>
                            <Form.Item name="soDienThoaiLienLac" initialValue={record.soDienThoaiLienLac}>
                                <Input
                                    disabled
                                    style={{ color: "black" }}
                                ></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Mã số thuế</Title>
                            <Form.Item name="maSoThue" initialValue={record.maSoThue}>
                                <Input
                                    disabled
                                    style={{ color: "black" }}
                                ></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Số tài khoản</Title>
                            <Form.Item name="soTaiKhoan" initialValue={record.soTaiKhoan}>
                                <Input
                                    disabled
                                    style={{ color: "black" }}
                                ></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Tên ngân hàng</Title>
                            <Form.Item name="tenNganHang" initialValue={record.tenNganHang}>
                                <Input
                                    disabled
                                    style={{ color: "black" }}
                                ></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default ViewNhanVien;