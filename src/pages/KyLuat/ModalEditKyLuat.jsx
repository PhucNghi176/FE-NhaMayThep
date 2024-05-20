import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChinhSachNhanSu, getSelectedKyLuat } from "../../redux/selector";
import { fetchChinhSachNhanSu } from "../../redux/slices/chinhSachNhanSuSlice/chinhSachNhanSuSlice";
import {
  fetchKyLuat,
  updateKyLuat,
} from "../../redux/slices/KyLuatSlice/kyLuatSlice";

const ModalEditKyLuat = ({ onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listChinhSach = useSelector(getChinhSachNhanSu);
  const selectedRow = useSelector(getSelectedKyLuat);

  useEffect(() => {
    dispatch(fetchChinhSachNhanSu());
  }, []);

  const chinhSach = listChinhSach?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleUpdateForm = (updatedValues, selectedRow) => {
    const id = selectedRow;
    updatedValues.id = id;
    dispatch(updateKyLuat(updatedValues))
      .unwrap()
      .then(() => {
        dispatch(fetchKyLuat());
      })
      .catch((error) => {
        console.error("Error updating record: ", error);
      })
      .finally(() => {
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };
        dispatch(fetchKyLuat(data));
      });
  };

  const handleEditCancel = () => {
    form.resetFields();
    onClose();
  };

  const inputStyle = {
    width: "200px",
  };
  return (
    <div>
      <Form form={form} name="editRecordForm" onFinish={handleUpdateForm}>
        <Row>
          <Col span={8}>
            <Typography.Title level={5}>Mã số nhân viên</Typography.Title>
            <Form.Item
              name="maNhanVien"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={selectedRow ? selectedRow.maSoNhanVien : ""}
            >
              <Input style={inputStyle}></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Chính sách nhân sự</Typography.Title>
            <Form.Item
              name="chinhSachNhanSuID"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={selectedRow ? selectedRow.chinhSachNhanSuID : ""}
            >
              <Select options={chinhSach} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Tên đợt kỷ luật</Typography.Title>
            <Form.Item
              name="tenDotKyLuat"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={selectedRow ? selectedRow.tenDotKyLuat : ""}
            >
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Tổng phạt</Typography.Title>
            <Form.Item
              name="tongPhat"
              initialValue={selectedRow ? selectedRow.tongPhat: ""}
            >
              <Input suffix="VND" style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
            type="default"
            onClick={handleEditCancel}
            style={{ width: "60px", marginRight: "5px" }}
          >
            Huỷ
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleUpdateForm(values, selectedRow.id);
                })
                .catch((error) => {
                  console.error("Validation failed:", error);
                });
            }}
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalEditKyLuat;
