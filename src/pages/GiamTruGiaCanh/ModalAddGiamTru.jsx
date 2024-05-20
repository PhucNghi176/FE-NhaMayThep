import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTTGiamTru } from "../../redux/selector";
import { fetchTTGiamTru } from "../../redux/slices/thongTinGiamTruSlice/thongTinGiamTruSlice";
import { createGiamTru, fetchGiamTru } from "../../redux/slices/giamTruGiaCanhSlice/giamTruGiaCanhSlice";

const ModalAddGiamTru = ({ onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const danhSachTTGiamTru = useSelector(getTTGiamTru);

  useEffect(() => {
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    dispatch(fetchTTGiamTru(data));
  }, []);

  const listTTGiamTru = danhSachTTGiamTru?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleForm = (value) => {
    const data = { ...value };
    if (data) {
      const PageNumber = 1;
      const PageSize = 10;
      data.PageNumber = 1;
      data.PageSize = 1;
      console.log("data", data);
      dispatch(createGiamTru(data))
        .unwrap()
        .then(() => {
          dispatch(fetchGiamTru(data));
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
            <Form.Item name="nhanVienID">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Mã giảm trừ</Typography.Title>
            <Form.Item name="maGiamTruID">
              <Select options={listTTGiamTru} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Địa chỉ</Typography.Title>
            <Form.Item name="diaChiLienLac">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Quan hệ với nhân viên</Typography.Title>
            <Form.Item name="quanHeVoiNhanVien">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Căn cước công dân</Typography.Title>
            <Form.Item name="canCuocCongDan">
              <Input type="number" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Ngày xác nhận phụ thuộc</Typography.Title>
            <Form.Item name="ngayXacNhanPhuThuoc">
              <DatePicker style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          style={{ display: "flex", justifyContent: "flex-end", margin: "0" }}
        >
          <Button
            type="default"
            onClick={handleAddCancel}
            style={{ width: "80px", marginRight: "5px" }}
          >
            Huỷ
          </Button>
          <Button htmlType="submit" type="primary">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalAddGiamTru;
