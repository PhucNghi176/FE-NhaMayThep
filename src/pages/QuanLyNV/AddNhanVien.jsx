import React, { useEffect, useState } from "react";
import { Button, Form, Input, Col, Row, notification, Typography, DatePicker, Select } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { createNhanVien } from "../../redux/slices/nhanVienSlice/nhanVienSlice";
import { filterNhanVien } from "../../redux/slices/nhanVienSlice/nhanVienSlice";
import { createCCCD } from "../../redux/slices/canCuocCongDanSlice/canCuocCongDanSlice";
import { getListHangLoat } from "../../redux/slices/nhanVienSlice/getHangLoatSlice";
import { getHangLoatSelector, getnhanVienIDSelector } from "../../redux/selector";
const { Title } = Typography;

const AddNhanVien = ({ onClose }) => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [formCCCD] = Form.useForm();

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

    const nhanVienID = useSelector(getnhanVienIDSelector);
    console.log("nhanVienID: ", nhanVienID);
    // Kiểm tra xem Nhân viên đã được tạo hay chưa
    const [showCCCDForm, setShowCCCDForm] = useState(false);
    const [showNhanVienForm, setShowNhanVienForm] = useState(true);

    const handleCancel = () => {
        form.resetFields();
        formCCCD.resetFields();
        setShowCCCDForm(false);
        setShowNhanVienForm(true);
        onClose();
    };

    const onFinishNhanVien = (values) => {
        setLoading(true);
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        // Dispatch the createNhanVien action with the form values
        dispatch(createNhanVien(values))
            .unwrap()
            .then((result) => {
                // mở form tạo CCCD
                setShowCCCDForm(true);
                // Close the Modal
                //onClose();
                openNotification('success', "Tạo nhân viên thành công");
                dispatch(filterNhanVien(data));
                form.resetFields();
                setShowNhanVienForm(false);

                setTimeout(() => {
                    setLoading(false);
                }, 5000);

                console.log("resultID: ", result)
            })
            .catch((error) => {
                openNotification('warning', error)
                setLoading(false);
            })
            .finally((response) => {
                // mở form tạo CCCD
                setShowCCCDForm(true);

                // Get the ID of the newly created employee
                //const nhanVienID = response.id;

                // Set the nhanVienID value to the CCCD form
                //formCCCD.setFieldsValue({ nhanVienID });

                openNotification('success', "Tạo nhân viên thành công");
                dispatch(filterNhanVien(data));
                form.resetFields();
                setShowNhanVienForm(false);

                setTimeout(() => {
                    setLoading(false);
                }, 5000);
                console.log("resID: ", response);

                formCCCD.setFieldsValue({ nhanVienID: result.id });

            });
    };


    const onFinishCCCD = (values) => {
        setLoading(true);
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };

        dispatch(createCCCD(values))
            .unwrap()
            .then(() => {
                // Đóng form CCCD sau khi tạo xong
                setShowCCCDForm(false);
                // Close the Modal
                onClose();
                openNotification('success', "Tạo CCCD thành công");
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
                openNotification('success', "Tạo CCCD thành công");
                dispatch(filterNhanVien(data));
                formCCCD.resetFields();

                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            });
    };

    const listHangLoat = useSelector(getHangLoatSelector);
    useEffect(() => {
        dispatch(getListHangLoat());
    }, []);

    const option_list_chucVu =
        listHangLoat && listHangLoat.ChucVu
            ? listHangLoat.ChucVu.map((type) => ({
                value: type.key,
                label: type.value,
            }))
            : [];

    const option_list_tinhTrang =
        listHangLoat && listHangLoat.TinhTrangLamViec
            ? listHangLoat.TinhTrangLamViec.map((type) => ({
                value: type.key,
                label: type.value,
            }))
            : [];

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

    return (
        <>
            {/* Tạo Nhân Viên */}
            {showNhanVienForm && (
                <Form
                    labelCol={{
                        span: 0,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    form={form}
                    onFinish={onFinishNhanVien}

                >
                    <Row gutter={[6]}>
                        <Col span={8}>
                            <Title level={5}>Email</Title>
                            <Form.Item
                                name="email"
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
                            <Form.Item name="chucVuID">
                                <Select
                                    name="chucVuID"
                                    placeholder="Chọn chức vụ"
                                    options={option_list_chucVu}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Tình trạng làm việc</Title>
                            <Form.Item name="tinhTrangLamViecID">
                                <Select
                                    name="tinhTrangLamViecID"
                                    placeholder="Chọn tình trạng"
                                    options={option_list_tinhTrang}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Ngày vào công ty</Title>
                            <Form.Item name="ngayVaoCongTy">
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    style={{ display: "flex", cursor: "pointer" }}
                                    locale={locale}
                                ></DatePicker>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Địa chỉ liên lạc</Title>
                            <Form.Item
                                name="diaChiLienLac"
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
                                <Button className="cancelBtn" type="default" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Tạo mới nhân viên
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
                        <Col span={8}>
                            <Title level={5}>CCCD</Title>
                            <Form.Item
                                name="canCuocCongDan"
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
                            <Title level={5}>ID Nhân Viên</Title>
                            <Form.Item
                                name="nhanVienID"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc",
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9]{32}$/,
                                        message: "Chỉ được nhập 32 ký tự gồm số và chữ",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập ID Nhân Viên" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Họ và Tên</Title>
                            <Form.Item
                                name="hoVaTen"
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
                            <Form.Item name="ngaySinh">
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    style={{ display: "flex", cursor: "pointer" }}
                                    locale={locale}
                                ></DatePicker>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Giới tính</Title>
                            <Form.Item name="gioiTinh"
                                rules={[{
                                    required: true,
                                    message: 'Bắt buộc'
                                }]}>
                                <Select
                                    name="gioiTinh"
                                    placeholder="Chọn giới tính"
                                >
                                    <Select.Option value="true">Nam</Select.Option>
                                    <Select.Option value="false">Nữ</Select.Option>
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
                            <Form.Item name="ngayCap">
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
                                <Button className="cancelBtn" type="default" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Tạo CCCD
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>


            )}
        </>
    );
};

export default AddNhanVien;