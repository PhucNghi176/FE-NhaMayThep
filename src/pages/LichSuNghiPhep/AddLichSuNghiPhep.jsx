import React, { useEffect, useState } from "react";
import { Button, Form, Input, Col, Row, notification, Typography, DatePicker, Select } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { getListLoaiNghiPhep } from "../../redux/slices/loaiNghiPhepSlice/loaiNghiPhepSlice";
import { createLichSuNghiPhep, getListNghiPhep } from "../../redux/slices/lichSuNghiPhepSlice/lichSuNghiPhepSlice";
import { loaiNghiPhepSelector } from "../../redux/selector";
const { Title } = Typography;

const AddLichSuNghiPhep = ({ onClose }) => {
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

    const onFinishLichSuNghiPhep = (values) => {
        setLoading(true);
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        dispatch(createLichSuNghiPhep(values))
            .unwrap()
            .then(() => {
                openNotification('success', "Thêm lịch sử nghỉ phép thành công");
                dispatch(getListNghiPhep(data));
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
                openNotification('success', "Tạo Đảng Viên thành công");
                dispatch(getListNghiPhep(data));
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

    const loaiNghiPhep = useSelector(loaiNghiPhepSelector);
    useEffect(() => {
        dispatch(getListLoaiNghiPhep());
    }, []);
    const option_nghiPhep =
        loaiNghiPhep && loaiNghiPhep
            ? loaiNghiPhep.map((type) => ({
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
                onFinish={onFinishLichSuNghiPhep}
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
                        <Title level={5}>Loại nghỉ phép</Title>
                        <Form.Item name="loaiNghiPhepID">
                            <Select
                                name="loaiNghiPhepID"
                                placeholder="Chọn loại nghỉ phép"
                                options={option_nghiPhep}
                            ></Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Ngày bắt đầu nghỉ</Title>
                        <Form.Item name="ngayBatDau">
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ display: "flex", cursor: "pointer" }}
                                locale={locale}
                            ></DatePicker>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Ngày bắt kết thúc nghỉ</Title>
                        <Form.Item name="ngayKetThuc">
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ display: "flex", cursor: "pointer" }}
                                locale={locale}
                            ></DatePicker>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Lý do nghỉ</Title>
                        <Form.Item
                            name="lyDo"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập lý do nghỉ" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Người duyệt</Title>
                        <Form.Item
                            name="nguoiDuyet"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập ID của người duyệt" />
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
                                Thêm mới lịch sử nghỉ phép
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default AddLichSuNghiPhep;