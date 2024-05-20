import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Typography, Col, Row, Input, Select, DatePicker, notification } from 'antd';
import dayjs from 'dayjs';
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { getCongTacRow, getListTrinhDoChinhTriSelector, getNghiPhepRow, getSelectedRowDV, loaiCongTacSelector, loaiNghiPhepSelector } from '../../redux/selector';
import { getListDonViCongTac } from "../../redux/slices/donViCongTacSlice/donViCongTacSlice";
import { getListChucVuDang } from "../../redux/slices/chucVuDangSlice/chucVuDangSlice";
import { getListTrinhDoChinhTri } from "../../redux/slices/trinhDoChinhTriSlice/trinhDoChinhTriSlice";
import { getListCapDangVien } from "../../redux/slices/capDangVienSlice/capDangVienSlice";
import { getListLoaiNghiPhep } from "../../redux/slices/loaiNghiPhepSlice/loaiNghiPhepSlice";
import { getListCongTac, updateLichSuCongTac } from "../../redux/slices/lichSuCongTacSlice/lichSuCongTacSlice";
import { getListLoaiCongTac } from "../../redux/slices/loaiCongTacSlice/loaiCongTacSlice";

const EditLichSuCongTac = ({ onClose }) => {
    const [form] = Form.useForm();

    const { Title } = Typography;
    const dispatch = useDispatch();

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

    const selectedRow = useSelector(getCongTacRow);
    console.log("selectLichSuCongTac: ", selectedRow);

    const handleEditSubmit = (values) => {
        setLoading(true);
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        dispatch(updateLichSuCongTac({ id: selectedRow[0].id, updateLichSuCongTac: values }))
            .unwrap()
            .then(() => {
                openNotification('success', `Cập nhật lịch sử công tác của nhân viên : ${selectedRow[0]?.hoVaTen} thành công`)
            })
            .catch((error) => {
                openNotification('warning', error);
                setLoading(false);
            })
            .finally(() => {
                openNotification('success', `Cập nhật lịch sử công tác của nhân viên : ${selectedRow[0]?.hoVaTen} thành công`)
                onClose();
                dispatch(getListCongTac(data));
                form.resetFields();
                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            })
    };

    const handleEditCancel = () => {
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
            <Form
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                form={form}
                onFinish={handleEditSubmit}
            >
                <Row gutter={[6]}>
                    <Col span={8} style={{ display: 'none' }}>
                        <Title level={5}>ID Lịch sử công tác</Title>
                        <Form.Item
                            name="id"
                            initialValue={selectedRow ? selectedRow[0]?.id : ""}
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập ID" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Nhân viên ID</Title>
                        <Form.Item
                            name="maSoNhanVien"
                            initialValue={selectedRow ? selectedRow[0]?.maSoNhanVien : ""}
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                            
                        >
                            <Input placeholder="Nhập ID nhân viên" disabled />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Loại công tác</Title>
                        <Form.Item
                            name="loaiCongTacID"
                            initialValue={selectedRow ? selectedRow[0]?.loaiCongTacID : ""}
                        >
                            <Select
                                name="loaiCongTacID"
                                placeholder="Chọn loại công tác"
                                options={option_congTac}
                            ></Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Ngày bắt đầu công tác</Title>
                        <Form.Item name="ngayBatDau" initialValue={selectedRow ? dayjs(selectedRow[0]?.ngayBatDau) : ""}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ display: "flex", cursor: "pointer" }}
                                locale={locale}
                            ></DatePicker>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Ngày kết thúc công tác</Title>
                        <Form.Item name="ngayKetThuc" initialValue={selectedRow ? dayjs(selectedRow[0]?.ngayKetThuc) : ""}>
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
                            initialValue={selectedRow ? selectedRow[0]?.noiCongTac : ""}
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
                        <Title level={5}>Lý Do</Title>
                        <Form.Item
                            name="lyDo"
                            initialValue={selectedRow ? selectedRow[0]?.lyDo : ""}
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập lý do" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button className="cancelBtn" type="default" onClick={handleEditCancel}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Cập nhật lịch sử công tác
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default EditLichSuCongTac;
