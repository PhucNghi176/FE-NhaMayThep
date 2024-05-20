import React, { useEffect, useState } from "react";
import { Button, Form, Input, Col, Row, notification, Typography, DatePicker, Select } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { loaiCongTacSelector } from "../../redux/selector";
import { getListLoaiCongTac } from "../../redux/slices/loaiCongTacSlice/loaiCongTacSlice";
import { createLichSuCongTac, getListCongTac } from "../../redux/slices/lichSuCongTacSlice/lichSuCongTacSlice";
const { Title } = Typography;

const AddLichSuCongTac = ({ onClose }) => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    // Notification
    const [notificationType, setNotificationType] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);

    useEffect(() => {
        if (notificationType && notificationMessage) {
            notification[notificationType]({
                message: notificationMessage,
                placement: "top",
            });
        }
    }, [notificationType, notificationMessage]);

    const openNotification = (type, message) => {
        setNotificationType(type);
        setNotificationMessage(message);
    };

    const onFinishLichSuCongTac = (values) => {
        setLoading(true);
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        dispatch(createLichSuCongTac(values))
            .unwrap()
            .then(() => {
                openNotification('success', "Thêm lịch sử công tác thành công");
                dispatch(getListCongTac(data));
                form.resetFields();

                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            })
            .catch((error) => {
                openNotification('warning', error)
                setLoading(false);
            })
            .finally(() => {
                onClose();
                openNotification('success', "Thêm lịch sử công tác thành công");
                dispatch(getListCongTac(data));
                form.resetFields();

                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            });
    }

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    const loaiCongTac = useSelector(loaiCongTacSelector);
    useEffect(() => {
        dispatch(getListLoaiCongTac());
    }, []);
    const option_congTac =
        loaiCongTac && loaiCongTac
            ? loaiCongTac.map((type) => ({
                value: type.id,
                label: type.name,
            }))
            : [];

    return (
        <>
            {/* Tạo Đảng Viên */}
            <Form
                labelCol={{
                    span: 0,
                }}
                wrapperCol={{
                    span: 24,
                }}
                form={form}
                onFinish={onFinishLichSuCongTac}
            >
                <Row gutter={[6]}>
                    <Col span={8}>
                        <Title level={5}>Nhân Viên ID</Title>
                        <Form.Item
                            name="maSoNhanVien"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập nhân viên ID" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Loại công tác</Title>
                        <Form.Item name="loaiCongTacID">
                            <Select
                                name="loaiCongTacID"
                                placeholder="Chọn loại công tác"
                                options={option_congTac}
                            ></Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Ngày bắt đầu công tác</Title>
                        <Form.Item name="ngayBatDau">
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ display: "flex", cursor: "pointer" }}
                                locale={locale}
                            ></DatePicker>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Ngày bắt kết thúc công tác</Title>
                        <Form.Item name="ngayKetThuc">
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ display: "flex", cursor: "pointer" }}
                                locale={locale}
                            ></DatePicker>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Nơi công tác</Title>
                        <Form.Item
                            name="noiCongTac"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập nơi công tác" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Lý do công tác</Title>
                        <Form.Item
                            name="lyDo"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập lý do công tác" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button className="cancelBtn" type="default" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Thêm mới lịch sử công tác
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default AddLichSuCongTac;