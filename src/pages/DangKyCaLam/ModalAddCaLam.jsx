import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTrangThai } from '../../redux/selector';
import { fetchTrangThai } from '../../redux/slices/TrangThaiCaLamSlice/trangThaiCaLamSlice';
import { createCaLam, fetchCaLam } from '../../redux/slices/DangKyCaLamSlice/DangKyCaLamSlice';

const ModalAddCaLam=({onClose})=> {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const listTrangThai = useSelector(getTrangThai);
  
    useEffect(() => {
      dispatch(fetchTrangThai());
    }, []);
  
    const trangThai = listTrangThai?.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  
    const handleForm = (value) => {
      const data = { ...value };
      if (data) {
        console.log("data", data);
        dispatch(createCaLam(data))
          .unwrap()
          .then(() => {
            dispatch(fetchCaLam());
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      }
    };

  const handleAddCancel = () => {
    form.resetFields();
    onClose();
  };
  
    const inputStyle = {
      width: "200px",
    };
    return (
      <div>
        <Form onFinish={handleForm} form={form}>
          <Row>
            <Col span={8}>
              <Typography.Title level={5}>Mã số nhân viên</Typography.Title>
              <Form.Item name="maSoNhanVien">
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Ngày đăng kí</Typography.Title>
              <Form.Item name="ngayDangKi">
                <DatePicker style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Ca đăng kí</Typography.Title>
              <Form.Item name="caDangKi">
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Thời gian ca làm bắt đầu</Typography.Title>
              <Form.Item name="thoiGianCaLamBatDau">
                <DatePicker style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Thời gian ca làm kết thúc</Typography.Title>
              <Form.Item name="thoiGianCaLamKetThuc">
                <DatePicker style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Thời gian chấm công bắt đầu</Typography.Title>
              <Form.Item name="thoiGianChamCongBatDau">
                <DatePicker style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Thời gian chấm công kết thúc</Typography.Title>
              <Form.Item name="thoiGianChamCongKetThuc">
                <DatePicker style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Hệ số ngày công</Typography.Title>
              <Form.Item name="heSoNgayCong">
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Mã số người quản lí</Typography.Title>
              <Form.Item name="maSoNguoiQuanLy">
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Trạng thái ca làm</Typography.Title>
              <Form.Item name="trangThai">
                <Select options={trangThai} style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Typography.Title level={5}>Ghi chú</Typography.Title>
              <Form.Item name="ghiChu">
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            style={{ display: "flex", justifyContent: "flex-end", margin: "0" }}
          >
            <Button
            type="default"
            onClick={handleAddCancel}
            style={{width:'80px', marginRight:'5px'}}
          >
            Huỷ
          </Button>
            <Button htmlType="submit" type="primary">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
}

export default ModalAddCaLam
