import React from 'react';
import { Button, Form, Input, Col, Row, Typography, DatePicker, TimePicker, Select } from 'antd';
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography

const selectBefore = (
    <Select defaultValue="Position">
        <Option value="be">Back-End</Option>
        <Option value="fe">Front-End</Option>
        <Option value="de">Design</Option>
    </Select>
);

const Schedule = ({onClose}) => {
    const [form] = Form.useForm();

    const onFinish = () => {
        // Reset the form fields after dispatching the action
        //form.resetFields();

        // Close the Modal
        onClose();
        // toast.success("New product has been added successfully");
    };

    return (
        <Form
            labelCol={{
                span: 0,
            }}
            wrapperCol={{
                span: 24,
            }}
            id='myForm'
            form={form}
            onFinish={onFinish}
        >
            <Row gutter={[6]}>
                <Col span={8}>
                    <Form.Item
                        name="date"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: "Chọn ngày phỏng vấn",
                    //     },
                    // ]}
                    >
                        <div>
                            <Title level={5}>Ngày phỏng vấn</Title>
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ display: "flex", cursor: "pointer" }}
                            ></DatePicker>
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="time"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: "Chọn giờ phỏng vấn",
                    //     },
                    // ]}
                    >
                        <div>
                            <Title level={5}>Giờ phỏng vấn</Title>
                            <TimePicker.RangePicker
                                format="HH:mm"
                                style={{ display: "flex", cursor: "pointer" }}
                            ></TimePicker.RangePicker>
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="typeOfInterview"
                    >
                        <Title level={5}>Hình thức phỏng vấn</Title>
                        <Select placeholder="Hình thức phỏng vấn">
                            <Option value="online">Online</Option>
                            <Option value="offline">Offline</Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="typeOfInterviewer"
                    >
                        <Title level={5}>Người phỏng vấn</Title>
                        <Input addonBefore={selectBefore} />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="linkMeet"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc',
                            },
                        ]}
                    >
                        <div>
                            <Title level={5}>Link Google Meet</Title>
                            <Input placeholder="Nhập link Google Meet"></Input>
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="rank"
                    >
                        <Title level={5}>Rank</Title>
                        <Select placeholder="Intern/Junior/Senior">
                            <Option value="intern">Intern</Option>
                            <Option value="junior">Junior</Option>
                            <Option value="senior">Senior</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[20]}>
                <Col span={12}>
                    <Form.Item
                        name="to"
                    >
                        <Title level={5}>To:</Title>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="bcc"
                    >
                        <Title level={5}>BCC:</Title>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[6]}>
                <Col span={6}>
                    <Form.Item
                        name="sendMail"
                    >
                        <Title level={5}>Gửi Mail</Title>
                        <Select placeholder="Chọn loại Email">
                            <Option value="pass">Đậu PV</Option>
                            <Option value="fail">Rớt PV</Option>
                            <Option value="pending">Xem xét PV</Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={18}>
                    <Form.Item
                        name="textArea"
                    >
                        <TextArea
                            style={{ marginTop: "32px" }}
                            allowClear
                            placeholder="Nhập Email..."
                        ></TextArea>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Form.Item
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default Schedule;