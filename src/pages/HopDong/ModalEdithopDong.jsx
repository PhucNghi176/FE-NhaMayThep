import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import {
  fetchHopDong,
  filterHopDong,
  updateHopDong,
} from "../../redux/slices/hopDongSlice/hopDongSlice";
import {
  getCapBacLuong,
  getHangLoat,
  getSelectedHopDong,
} from "../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchCapBacLuong } from "../../redux/slices/CapBacLuongSlice/CapBacLuongSlice";

const ModalEditHopDong = ({ onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const inputStyle = {
    width: "200px",
  };
  const listHangLoatHD = useSelector(getHangLoat);
  const selectedRow = useSelector(getSelectedHopDong);
  const capBacLuong = useSelector(getCapBacLuong);

  useEffect(() => {
    dispatch(fetchCapBacLuong());
  }, [dispatch]);

  const loaiHD = listHangLoatHD?.LoaiHopDong?.map((item) => ({
    label: item.value,
    value: item.key,
  }));

  const chucDanh = listHangLoatHD?.ChucDanh?.map((item) => ({
    label: item.value,
    value: item.key,
  }));

  const chucVu = listHangLoatHD?.ChucVu?.map((item) => ({
    label: item.value,
    value: item.key,
  }));

  const phuCap = listHangLoatHD?.PhuCap?.map((item) => ({
    label: item.value,
    value: item.key.toString(),
  }));

  const listLuong = capBacLuong?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleUpdateForm = (updatedValues, selectedRow) => {
    console.log("update data", selectedRow);
    const id = selectedRow;
    updatedValues.id = id;
    dispatch(updateHopDong(updatedValues))
      .unwrap()
      .then(() => {
        dispatch(fetchHopDong());
      })
      .catch((error) => {
        console.error("Error updating record: ", error);
      })
      .finally(() => {
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };
        dispatch(filterHopDong(data));
      });
  };

  const handleEditCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <div>
      <Form
        form={form}
        initialValues={selectedRow ? selectedRow[0] : ""}
        name="editRecordForm"
        onFinish={handleUpdateForm}
      >
        <Row>
          <Col span={8}>
            <Typography.Title level={5}>Loại hợp đồng</Typography.Title>
            <Form.Item
              name="loaiHopDongId"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
            >
              <Select options={loaiHD} style={inputStyle}></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Ngày ký hợp đồng</Typography.Title>
            <Form.Item
              name="ngayKyHopDong"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={
                selectedRow ? moment(selectedRow.ngayKyHopDong) : null
              }
            >
              <DatePicker style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>
              Ngày kết thúc hợp đồng
            </Typography.Title>
            <Form.Item
              name="ngayKetThucHopDong"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={
                selectedRow ? moment(selectedRow.ngayKetThucHopDong) : null
              }
            >
              <DatePicker style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Thời hạn hợp đồng</Typography.Title>
            <Form.Item
              name="thoiHanHopDong"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
            >
              <Input suffix="tháng" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Địa điểm làm việc</Typography.Title>
            <Form.Item
              name="diaDiemLamViec"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
            >
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Bộ phận làm việc</Typography.Title>
            <Form.Item
              name="boPhanLamViec"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
            >
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Chức danh</Typography.Title>
            <Form.Item
              name="chucDanhId"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
            >
              <Select options={chucDanh} style={inputStyle}></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Chức vụ</Typography.Title>
            <Form.Item
              name="chucVuId"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
            >
              <Select options={chucVu} style={inputStyle}></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Lương cơ bản</Typography.Title>
            <Form.Item
              name="luongCoBan"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
            >
              <InputNumber suffix="VND" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Hệ số lương</Typography.Title>
            <Form.Item
              name="heSoLuongId"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
            >
              <Select options={listLuong} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Phụ cấp</Typography.Title>
            <Form.Item
              name="phuCapId"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={selectedRow ? selectedRow.phuCap : null}
            >
              <Select options={phuCap} style={inputStyle}></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Ghi chú</Typography.Title>
            <Form.Item
              name="ghiChu"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
            >
              <Input style={inputStyle} />
            </Form.Item>
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
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ModalEditHopDong;
