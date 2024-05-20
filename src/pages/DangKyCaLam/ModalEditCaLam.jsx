import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCaLamRow, getTrangThai } from "../../redux/selector";
import { fetchTrangThai } from "../../redux/slices/TrangThaiCaLamSlice/trangThaiCaLamSlice";
import {
  fetchCaLam,
  updateCaLam,
} from "../../redux/slices/DangKyCaLamSlice/DangKyCaLamSlice";
import moment from "moment";

const ModalEditCaLam = ({ onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listTrangThai = useSelector(getTrangThai);
  const selectedRow = useSelector(getCaLamRow);

  useEffect(() => {
    dispatch(fetchTrangThai());
  }, []);

  const trangThai = listTrangThai?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleUpdateForm = (updatedValues, selectedRow) => {
    console.log("update data", selectedRow);
    const id = selectedRow;
    updatedValues.id = id;
    dispatch(updateCaLam(updatedValues))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.error("Error updating record: ", error);
      })
      .finally(() => {
        dispatch(fetchCaLam());
        form.resetFields();
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
              name="maSoNhanVien"
              initialValue={selectedRow ? selectedRow[0].maSoNhanVien : ""}
            >
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Ngày đăng kí</Typography.Title>
            <Form.Item
              name="ngayDangKi"
              initialValue={
                selectedRow ? moment(selectedRow[0]?.ngayDangKi) : ""
              }
            >
              <DatePicker format="DD/MM/YYYY" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Ca đăng kí</Typography.Title>
            <Form.Item
              name="caDangKi"
              initialValue={selectedRow ? selectedRow[0].caDangKi : ""}
            >
              <Input type="number" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>
              Thời gian ca làm bắt đầu
            </Typography.Title>
            <Form.Item name="thoiGianCaLamBatDau">
              <DatePicker style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>
              Thời gian ca làm kết thúc
            </Typography.Title>
            <Form.Item name="thoiGianCaLamKetThuc">
              <DatePicker style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>
              Thời gian chấm công bắt đầu
            </Typography.Title>
            <Form.Item name="thoiGianChamCongBatDau">
              <DatePicker style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>
              Thời gian chấm công kết thúc
            </Typography.Title>
            <Form.Item name="thoiGianChamCongKetThuc">
              <DatePicker style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Hệ số ngày công</Typography.Title>
            <Form.Item
              name="heSoNgayCong"
              initialValue={selectedRow ? selectedRow[0].heSoNgayCong : ""}
            >
              <Input type="number" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Mã số người quản lí</Typography.Title>
            <Form.Item
              name="maSoNguoiQuanLy"
              initialValue={selectedRow ? selectedRow[0].maSoNguoiQuanLy : ""}
            >
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Trạng thái ca làm</Typography.Title>
            <Form.Item
              name="trangThai"
              initialValue={selectedRow ? selectedRow[0].trangThai : ""}
            >
              <Select options={trangThai} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Ghi chú</Typography.Title>
            <Form.Item
              name="ghiChu"
              initialValue={selectedRow ? selectedRow[0].ghiChu : ""}
            >
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="default"
            onClick={handleEditCancel}
            style={{ width: "80px", marginRight: "5px" }}
          >
            Huỷ
          </Button>
          <Button
            key="submit"
            type="primary"
            style={{ width: "80px" }}
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleUpdateForm(values, selectedRow[0].id);
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

export default ModalEditCaLam;
