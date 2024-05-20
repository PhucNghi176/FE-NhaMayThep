import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Typography, Col, Row, Input, Select, DatePicker, notification } from 'antd';
import dayjs from 'dayjs';
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { filterNhanVien, updateNhanVien } from '../../redux/slices/nhanVienSlice/nhanVienSlice';
import { getSelectedRowNV, getHangLoatSelector, getCanCuocCongDanSelector } from '../../redux/selector';
import { getListHangLoat } from "../../redux/slices/nhanVienSlice/getHangLoatSlice";
import { getListCanCuocCongDan, updateCCCD } from "../../redux/slices/canCuocCongDanSlice/canCuocCongDanSlice";

const EditNhanVien = ({ onClose }) => {
    const [form] = Form.useForm();
    const [formCCCD] = Form.useForm();

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

    // Update 
    const listHangLoat = useSelector(getHangLoatSelector);
    useEffect(() => {
        dispatch(getListHangLoat());

    }, []);
    const option_list_chucVu = listHangLoat && listHangLoat.ChucVu
        ? listHangLoat.ChucVu.map((type) => ({
            value: type.key,
            label: type.value,
        }))
        : [];

    const option_list_tinhTrang = listHangLoat && listHangLoat.TinhTrangLamViec
        ? listHangLoat.TinhTrangLamViec.map((type) => ({
            value: type.key,
            label: type.value,
        }))
        : [];

    const selectedRow = useSelector(getSelectedRowNV);
    const selectedRowCCCD = useSelector(getCanCuocCongDanSelector);
    console.log("selectedRowCCCD: ", selectedRowCCCD);
    console.log("selectedRowNV: ", selectedRow);

    const [showCCCDForm, setShowCCCDForm] = useState(false);
    const [showNhanVienForm, setShowNhanVienForm] = useState(true);

    const handleEditSubmit = (values) => {
        setLoading(true);
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        dispatch(updateNhanVien({ id: selectedRow[0].id, updatedNhanVien: values }))
            .unwrap()
            .then(() => {
                openNotification('success', `Cập nhật nhân viên: ${selectedRow[0]?.hoVaTen} thành công`)
            })
            .catch((error) => {
                console.log()
                openNotification('warning', error);
                setLoading(false);
            })
            .finally(() => {
                // mở form tạo CCCD
                setShowCCCDForm(true);
                openNotification('success', `Cập nhật nhân viên: ${selectedRow[0]?.hoVaTen} thành công`);
                dispatch(filterNhanVien(data));
                form.resetFields();
                // đóng form tạo Nhân Viên
                setShowNhanVienForm(false);

                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            })
    };

    const onFinishCCCD = (result) => {
        setLoading(true);
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        dispatch(updateCCCD({ id: selectedRowCCCD.canCuocCongDanID, updatedCCCD: result }))
            .unwrap()
            .then(() => {
                // Đóng form CCCD sau khi tạo xong
                setShowCCCDForm(false);
                // Close the Modal
                onClose();
                openNotification('success', "Cập nhật CCCD thành công");
                dispatch(filterNhanVien(data));
                formCCCD.resetFields();

                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            })
            .catch((error) => {
                openNotification('warning', error)
                setLoading(false);
            })
            .finally(() => {
                // Đóng form CCCD sau khi tạo xong
                setShowCCCDForm(false);
                // Close the Modal
                onClose();
                openNotification('success', "Cập nhật CCCD thành công");
                dispatch(filterNhanVien(data));
                formCCCD.resetFields();

                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            });
    };

    const handleEditCancel = () => {
        form.resetFields();
        onClose();
    };

    const danTocVietNam = [
        "Kinh", "Mường", "H'Mông", "Dao", "Nùng", "Tày", "Hoa", "Khơ Me", "Chăm",
    ];

    const tonGiaoVietNam = [
        "Phật giáo", "Thiên chúa giáo", "Đạo Bửu Sơn Kỳ Hương", "Hòa Hảo", "Cao Đài",
    ]

    const danTocOptions = danTocVietNam.map(danToc => (
        <Select.Option key={danToc} value={danToc}>
            {danToc}
        </Select.Option>
    ));

    const tonGiaoOptions = tonGiaoVietNam.map(tonGiao => (
        <Select.Option key={tonGiao} value={tonGiao}>
            {tonGiao}
        </Select.Option>
    ));

    const gioiTinhOptions = [
        { value: true, label: 'Nam' },
        { value: false, label: 'Nữ' },
    ];

    return (
        <>
            {/* Edit Nhân Viên */}
            {showNhanVienForm && (
                <Form
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 24 }}
                    form={form}
                    onFinish={handleEditSubmit}
                >
                    <Row gutter={[6]}>
                        <Col span={8} style={{ display: 'none' }}>
                            <Title level={5}>ID</Title>
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
                            <Title level={5}>Email</Title>
                            <Form.Item
                                name="email"
                                initialValue={selectedRow ? selectedRow[0]?.email : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập email" type="email" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Họ và Tên</Title>
                            <Form.Item
                                name="hoVaTen"
                                initialValue={selectedRow ? selectedRow[0]?.hoVaTen : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ và tên" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Chức vụ</Title>
                            <Form.Item name="chucVuID" initialValue={selectedRow ? selectedRow[0]?.chucVuID : ""}>
                                <Select
                                    name="chucVuID"
                                    placeholder="Chọn chức vụ"
                                    options={option_list_chucVu}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Tình trạng làm việc</Title>
                            <Form.Item name="tinhTrangLamViecID" initialValue={selectedRow ? selectedRow[0]?.tinhTrangLamViecID : ""}>
                                <Select
                                    name="tinhTrangLamViecID"
                                    placeholder="Chọn tình trạng"
                                    options={option_list_tinhTrang}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Ngày vào công ty</Title>
                            <Form.Item name="ngayVaoCongTy" initialValue={selectedRow ? dayjs(selectedRow[0]?.ngayVaoCongTy) : ""}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    style={{ display: "flex", cursor: "pointer" }}
                                ></DatePicker>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Địa chỉ liên lạc</Title>
                            <Form.Item
                                name="diaChiLienLac"
                                initialValue={selectedRow ? selectedRow[0]?.diaChiLienLac : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập địa chỉ" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Số điện thoại liên lạc</Title>
                            <Form.Item
                                name="soDienThoaiLienLac"
                                initialValue={selectedRow ? selectedRow[0]?.soDienThoaiLienLac : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                    {
                                        pattern: /^[0-9]{8,11}$/,
                                        message: "Số điện thoại chỉ được nhập từ 8-11 chữ số",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại liên lạc"></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Mã số thuế</Title>
                            <Form.Item
                                name="maSoThue"
                                initialValue={selectedRow ? selectedRow[0]?.maSoThue : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                    {
                                        pattern: /^[0-9]*$/,
                                        message: "Mã số thuế chỉ được nhập số",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập mã số thuế"></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Tên ngân hàng</Title>
                            <Form.Item
                                name="tenNganHang"
                                initialValue={selectedRow ? selectedRow[0]?.tenNganHang : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên ngân hàng"></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Số tài khoản</Title>
                            <Form.Item
                                name="soTaiKhoan"
                                initialValue={selectedRow ? selectedRow[0]?.soTaiKhoan : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                    {
                                        pattern: /^[0-9]{8,15}$/,
                                        message: "Số tài khoản chỉ được nhập từ 8-15 chữ số",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập mã số tài khoản"></Input>
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
            )}

            {/* Tạo CCCD */}
            {showCCCDForm && (
                <Form
                    labelCol={{
                        span: 0,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    form={formCCCD}
                    onFinish={onFinishCCCD}
                >
                    <Row gutter={[6]}>
                        <Col span={8} style={{ display: 'none' }}>
                            <Title level={5}>ID CCCD</Title>
                            <Form.Item
                                name="canCuocCongDanID"
                                initialValue={selectedRowCCCD ? selectedRowCCCD?.id : ""}
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
                            <Title level={5}>CCCD</Title>
                            <Form.Item
                                name="canCuocCongDan"
                                initialValue={selectedRowCCCD ? selectedRowCCCD?.canCuocCongDan : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                    {
                                        pattern: /^[0-9]{12}$/,
                                        message: "Số CCCD chỉ được nhập 12 chữ số",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập CCCD" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Họ và Tên</Title>
                            <Form.Item
                                name="hoVaTen"
                                initialValue={selectedRowCCCD ? selectedRowCCCD?.hoVaTen : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ và tên" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Ngày sinh</Title>
                            <Form.Item
                                name="ngaySinh"
                                initialValue={selectedRowCCCD ? dayjs(selectedRowCCCD?.ngaySinh) : ""}
                            >
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    style={{ display: "flex", cursor: "pointer" }}
                                    locale={locale}
                                ></DatePicker>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Giới tính</Title>
                            <Form.Item
                                name="gioiTinh"
                                initialValue={selectedRowCCCD ? selectedRowCCCD?.gioiTinh : ""}
                                rules={[{
                                    required: true,
                                    message: 'Bắt buộc'
                                }]}>
                                <Select name="gioiTinh" placeholder="Chọn giới tính">
                                    {gioiTinhOptions.map((option) => (
                                        <Select.Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Quốc tịch</Title>
                            <Form.Item name="quocTich" initialValue="Viêt Nam">
                                <Input placeholder="Nhập quốc tịch"></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Quê quán</Title>
                            <Form.Item
                                name="queQuan"
                                initialValue={selectedRowCCCD ? selectedRowCCCD?.queQuan : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập quê quán"></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Địa chỉ thường trú</Title>
                            <Form.Item
                                name="diaChiThuongTru"
                                initialValue={selectedRowCCCD ? selectedRowCCCD?.diaChiThuongTru : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập địa chỉ" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Ngày cấp CCCD</Title>
                            <Form.Item
                                name="ngayCap"
                                initialValue={selectedRowCCCD ? dayjs(selectedRowCCCD?.ngayCap) : ""}
                            >
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    style={{ display: "flex", cursor: "pointer" }}
                                    locale={locale}
                                ></DatePicker>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Nơi cấp CCCD</Title>
                            <Form.Item
                                name="noiCap"
                                initialValue={selectedRowCCCD ? selectedRowCCCD?.noiCap : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập nơi cấp CCCD" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Dân tộc</Title>
                            <Form.Item
                                name="danToc"
                                initialValue={selectedRowCCCD ? selectedRowCCCD?.danToc : ""}
                                rules={[{ required: true, message: 'Bắt buộc' }]}
                            >
                                <Select
                                    name="danToc"
                                    placeholder="Chọn dân tộc"
                                    allowClear
                                >
                                    {danTocOptions}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Tôn giáo</Title>
                            <Form.Item
                                name="tonGiao"
                                initialValue={selectedRowCCCD ? selectedRowCCCD?.tonGiao : ""}
                                rules={[{ required: true, message: 'Bắt buộc' }]}
                            >
                                <Select
                                    name="tonGiao"
                                    placeholder="Chọn tôn giáo"
                                    allowClear
                                >
                                    {tonGiaoOptions}
                                </Select>
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
                                    Cập nhật CCCD
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            )}
        </>
    );
};

export default EditNhanVien;
