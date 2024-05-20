import React from 'react';
import { Button, Form, Input, Col, Row, InputNumber, Typography, DatePicker, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Title } = Typography

const Comment = ({onClose}) => {
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
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc',
                            },
                        ]}
                    >
                        <div>
                            <Title level={5}>Họ và Tên</Title>
                            <Input placeholder='Nhập họ và tên' />
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc',
                            },
                        ]}
                    >
                        <div>
                            <Title level={5}>Email</Title>
                            <Input placeholder='Nhập email' />
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="cccd"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc',
                            },
                            {
                                pattern: /^[0-9]*$/,
                                message: 'Số CCCD chỉ được nhập số',
                            },
                            {
                                len: 9,
                                message: 'Số CCCD phải có 9 chữ số',
                            }
                        ]}
                    >
                        <div>
                            <Title level={5}>CCCD</Title>
                            <Input placeholder='Nhập CCCD' />
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="date"
                    >
                        <div>
                            <Title level={5}>Ngày vào công ty</Title>
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ display: "flex", cursor: "pointer" }}
                            ></DatePicker>
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="position"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc',
                            },
                        ]}
                    >
                        <div>
                            <Title level={5}>Chức vụ</Title>
                            <Input placeholder="Nhập chức vụ"></Input>
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="status"
                    >
                        <Title level={5}>Tình trạng làm việc</Title>
                        <Select placeholder="Tình trạng làm việc">
                            <Option value="male">Đang làm</Option>
                            <Option value="female">Đã out</Option>
                            <Option value="other">Đang xem xét</Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="tax"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc',
                            },
                            {
                                pattern: /^[0-9]*$/,
                                message: 'Mã số thuế chỉ được nhập số',
                            },
                        ]}
                    >
                        <div>
                            <Title level={5}>Mã số thuế</Title>
                            <Input placeholder="Nhập mã số thuế"></Input>
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="nameOfBank"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc',
                            },
                        ]}
                    >
                        <div>
                            <Title level={5}>Tên ngân hàng</Title>
                            <Input placeholder="Nhập tên ngân hàng"></Input>
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="bankAccountNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc',
                            },
                            {
                                pattern: /^[0-9]{8,15}$/,
                                message: 'Số tài khoản chỉ được nhập từ 8-15 chữ số',
                            },
                        ]}
                    >
                        <div>
                            <Title level={5}>Số tài khoản</Title>
                            <Input placeholder="Nhập mã số tài khoản"></Input>
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="dependents"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc',
                            },
                        ]}
                    >
                        <div>
                            <Title level={5}>Số người phụ thuộc</Title>
                            <InputNumber min={1}></InputNumber>
                        </div>
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.List
                        name="names"
                    >
                        {/* Thành phần props
                fields: Một mảng chứa các đối tượng đại diện cho tên intern và thông tin liên quan của từng intern.
                add: Một hàm để thêm field comment vào form.
                remove: Một hàm để xóa field comment khỏi form. */}
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field) => (
                                    <Form.Item mode="horizontal">
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input passenger's name or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder="Nhận xét NV"
                                                style={{
                                                    width: '90%',
                                                }}
                                            />
                                        </Form.Item>

                                        {/* Xóa field comment bị dư */}
                                        {fields.length > 0 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                                style={{ marginLeft: 10 }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{
                                            width: '60%',
                                        }}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm nhận xét
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
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

export default Comment;