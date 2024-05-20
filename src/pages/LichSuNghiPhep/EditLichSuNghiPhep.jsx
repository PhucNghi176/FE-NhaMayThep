import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Typography, Col, Row, Input, Select, DatePicker, notification } from 'antd';
import dayjs from 'dayjs';
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { updateDangVien, getListDangVien } from "../../redux/slices/dangVienSlice/dangVienSlice";
import { getListCapDangVienSelector, getListChucVuDangSelector, getListDonViCongTacSelector, getListTrinhDoChinhTriSelector, getNghiPhepRow, getSelectedRowDV, loaiNghiPhepSelector } from '../../redux/selector';
import { getListDonViCongTac } from "../../redux/slices/donViCongTacSlice/donViCongTacSlice";
import { getListChucVuDang } from "../../redux/slices/chucVuDangSlice/chucVuDangSlice";
import { getListTrinhDoChinhTri } from "../../redux/slices/trinhDoChinhTriSlice/trinhDoChinhTriSlice";
import { getListCapDangVien } from "../../redux/slices/capDangVienSlice/capDangVienSlice";
import { getListNghiPhep, updateLichSuNghiPhep } from "../../redux/slices/lichSuNghiPhepSlice/lichSuNghiPhepSlice";
import { getListLoaiNghiPhep } from "../../redux/slices/loaiNghiPhepSlice/loaiNghiPhepSlice";

const EditLichSuNghiPhep = ({ onClose }) => {
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


    const selectedRow = useSelector(getNghiPhepRow);
    console.log("selectLichSuNghiPhep: ", selectedRow);

    const handleEditSubmit = (values) => {
        setLoading(true);
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        dispatch(updateLichSuNghiPhep({ id: selectedRow[0].id, updateLichSuNghiPhep: values }))
            .unwrap()
            .then(() => {
                openNotification('success', `Cập nhật lịch sử nghỉ phép của nhân viên : ${selectedRow[0]?.tenNhanVien} thành công`)
            })
            .catch((error) => {
                console.log()
                openNotification('warning', error);
                setLoading(false);
            })
            .finally(() => {
                openNotification('success', `Cập nhật lịch sử nghỉ phép của nhân viên : ${selectedRow[0]?.tenNhanVien} thành công`)
                onClose();
                dispatch(getListNghiPhep(data));
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
            <Form
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                form={form}
                onFinish={handleEditSubmit}
            >
                <Row gutter={[6]}>
                    <Col span={8} style={{ display: 'none' }}>
                        <Title level={5}>ID Lịch sử nghỉ phép</Title>
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
                        <Title level={5}>Loại nghỉ phép</Title>
                        <Form.Item
                            name="loaiNghiPhepID"
                            initialValue={selectedRow ? selectedRow[0]?.loaiNghiPhepID : ""}
                        >
                            <Select
                                name="loaiNghiPhepID"
                                placeholder="Chọn đơn vị công tác"
                                options={option_nghiPhep}
                            ></Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Ngày bắt đầu nghỉ</Title>
                        <Form.Item name="ngayBatDau" initialValue={selectedRow ? dayjs(selectedRow[0]?.ngayBatDau) : ""}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ display: "flex", cursor: "pointer" }}
                                locale={locale}
                            ></DatePicker>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Title level={5}>Ngày kết thúc nghỉ</Title>
                        <Form.Item name="ngayKetThuc" initialValue={selectedRow ? dayjs(selectedRow[0]?.ngayKetThuc) : ""}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ display: "flex", cursor: "pointer" }}
                                locale={locale}
                            ></DatePicker>
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

                    <Col span={8}>
                        <Title level={5}>Người duyệt</Title>
                        <Form.Item
                            name="nguoiDuyet"
                            initialValue={selectedRow ? selectedRow[0]?.nguoiDuyet : ""}
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập ID người duyệt" />
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
                                Cập nhật lịch sử nghỉ phép
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default EditLichSuNghiPhep;
