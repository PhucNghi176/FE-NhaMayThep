import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChinhSachNhanSu } from "../../redux/selector";
import { fetchChinhSachNhanSu } from "../../redux/slices/ChinhSachNhanSuSlice/chinhSachNhanSuSlice";
import { createKyLuat, fetchKyLuat } from "../../redux/slices/KyLuatSlice/kyLuatSlice";

const ModalAddKyLuat = ({onClose}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listChinhSach = useSelector(getChinhSachNhanSu);

  useEffect(() => {
    dispatch(fetchChinhSachNhanSu());
  }, []);

  const chinhSach = listChinhSach?.value?.map((item) => ({
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
      dispatch(createKyLuat(data))
        .unwrap()
        .then(() => {
          dispatch(fetchKyLuat(data));
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
            <Typography.Title level={5}>Chính sách nhân sự</Typography.Title>
            <Form.Item name="chinhSachNhanSuID">
              <Select options={chinhSach} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Tên đợt kỷ luật</Typography.Title>
            <Form.Item name="tenDotKyLuat">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Tổng phạt</Typography.Title>
            <Form.Item name="tongPhat">
              <Input type="number" style={inputStyle} />
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
   
};

export default ModalAddKyLuat;
