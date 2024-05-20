import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGiamTruRow, getTTGiamTru } from '../../redux/selector';
import { fetchTTGiamTru } from '../../redux/slices/thongTinGiamTruSlice/thongTinGiamTruSlice';
import { fetchGiamTru, updateGiamTru } from '../../redux/slices/giamTruGiaCanhSlice/giamTruGiaCanhSlice';

const ModalEditGiamTru=({onClose})=> {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const danhSachTTGiamTru = useSelector(getTTGiamTru);
    const selectedRow = useSelector(getGiamTruRow);

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
  
    const handleUpdateForm = (updatedValues, selectedRow) => {
      const id = selectedRow;
      updatedValues.id = id;
      dispatch(updateGiamTru(updatedValues))
        .unwrap()
        .then(() => {
          dispatch(fetchGiamTru());
        })
        .catch((error) => {
          console.error("Error updating record: ", error);
        })
        .finally(() => {
          const PageNumber = 1;
          const PageSize = 10;
          const data = { PageNumber, PageSize };
          dispatch(fetchGiamTru(data));
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
        <Form form={form} name="editRecordForm" onFinish={handleUpdateForm} >
        <Row>
          <Col span={8}>
            <Typography.Title level={5}>Mã giảm trừ</Typography.Title>
            <Form.Item name="maGiamTruID" initialValue={selectedRow ? selectedRow.maGiamTruID : ""}>
              <Select options={listTTGiamTru} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Địa chỉ</Typography.Title>
            <Form.Item name="diaChiLienLac" initialValue={selectedRow ? selectedRow.diaChiLienLac : ""}>
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Quan hệ với nhân viên</Typography.Title>
            <Form.Item name="quanHeVoiNhanVien" initialValue={selectedRow ? selectedRow.quanHeVoiNhanVien : ""}>
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Căn cước công dân</Typography.Title>
            <Form.Item name="canCuocCongDan" initialValue={selectedRow ? selectedRow.canCuocCongDan : ""}>
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
    )
}

export default ModalEditGiamTru