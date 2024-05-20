import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Typography, Col, Row, Input, Select, DatePicker, notification } from 'antd';
import dayjs from 'dayjs';
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { updateDangVien, getListDangVien } from "../../redux/slices/dangVienSlice/dangVienSlice";
import { getListCapDangVienSelector, getListChucVuDangSelector, getListDonViCongTacSelector, getListTrinhDoChinhTriSelector, getSelectedRowDV } from '../../redux/selector';
import { getListDonViCongTac } from "../../redux/slices/donViCongTacSlice/donViCongTacSlice";
import { getListChucVuDang } from "../../redux/slices/chucVuDangSlice/chucVuDangSlice";
import { getListTrinhDoChinhTri } from "../../redux/slices/trinhDoChinhTriSlice/trinhDoChinhTriSlice";
import { getListCapDangVien } from "../../redux/slices/capDangVienSlice/capDangVienSlice";

const EditDangVien = ({ onClose }) => {
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


    const selectedRow = useSelector(getSelectedRowDV);
    console.log("selectRowDangVien: ", selectedRow);

    const handleEditSubmit = (values) => {
        setLoading(true);
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        dispatch(updateDangVien({ id: selectedRow[0].id, updatedDangVien: values }))
            .unwrap()
            .then(() => {
                openNotification('success', `Cập nhật Đảng viên: ${selectedRow[0]?.hoVaTen} thành công`)
            })
            .catch((error) => {
                console.log()
                openNotification('warning', error);
                setLoading(false);
            })
            .finally(() => {
                openNotification('success', `Cập nhật Đảng viên: ${selectedRow[0]?.hoVaTen} thành công`)
                onClose();
                dispatch(getListDangVien(data));
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

    const listDonViCongTac = useSelector(getListDonViCongTacSelector);
    useEffect(() => {
        dispatch(getListDonViCongTac());
    }, []);
    const option_list_donViCongTac =
        listDonViCongTac && listDonViCongTac
            ? listDonViCongTac.map((type) => ({
                value: type.id,
                label: type.name,
            }))
            : [];

    const listChucVuDang = useSelector(getListChucVuDangSelector);
    useEffect(() => {
        dispatch(getListChucVuDang());
    }, []);
    const option_list_chucVuDang =
        listChucVuDang && listChucVuDang
            ? listChucVuDang.map((type) => ({
                value: type.id,
                label: type.name,
            }))
            : [];

    const listTrinhDoChinhTri = useSelector(getListTrinhDoChinhTriSelector);
    useEffect(() => {
        dispatch(getListTrinhDoChinhTri());
    }, []);
    const option_list_trinhDoChinhTri =
        listTrinhDoChinhTri && listTrinhDoChinhTri
            ? listTrinhDoChinhTri.map((type) => ({
                value: type.id,
                label: type.name,
            }))
            : [];

    const listCapDangVien = useSelector(getListCapDangVienSelector);
    useEffect(() => {
        dispatch(getListCapDangVien());
    }, []);
    const option_list_capDangVien =
        listCapDangVien && listCapDangVien
            ? listCapDangVien.map((type) => ({
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
                        <Title level={5}>Đảng viên ID</Title>
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
                        <Title level={5}>Đơn vị công tác</Title>
                        <Form.Item name="donViCongTacID" initialValue={selectedRow ? selectedRow[0]?.donViCongTacID : ""}>
                            <Select
                                name="donViCongTacID"
                                placeholder="Chọn đơn vị công tác"
                                options={option_list_donViCongTac}
                            ></Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Chức vụ Đảng</Title>
                        <Form.Item
                            name="chucVuDang"
                            initialValue={selectedRow ? selectedRow[0]?.chucVuDangID : ""}
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Select
                                name="chucVuDang"
                                placeholder="Chọn chức vụ Đảng"
                                options={option_list_chucVuDang}
                            ></Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Trình độ chính trị</Title>
                        <Form.Item
                            name="trinhDoChinhTri"
                            initialValue={selectedRow ? selectedRow[0]?.trinhDoChinhTriID : ""}
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Select
                                name="trinhDoChinhTri"
                                placeholder="Chọn trình độ chính trị"
                                options={option_list_trinhDoChinhTri}
                            ></Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Ngày vào Đảng</Title>
                        <Form.Item name="ngayVaoDang" initialValue={selectedRow ? dayjs(selectedRow[0]?.ngayVaoDang) : ""}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ display: "flex", cursor: "pointer" }}
                                locale={locale}
                            ></DatePicker>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Cấp Đảng Viên</Title>
                        <Form.Item
                            name="capDangVien"
                            initialValue={selectedRow ? selectedRow[0]?.capDangVienID : ""}
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Select
                                name="capDangVien"
                                placeholder="Chọn cấp Đảng viên"
                                options={option_list_capDangVien}
                            ></Select>
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
                                Cập nhật Nhân Viên
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default EditDangVien;
