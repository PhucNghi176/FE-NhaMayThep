import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createHopDong,
  fetchHopDong,
} from "../../redux/slices/hopDongSlice/hopDongSlice";
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
import { getCapBacLuong, getHangLoat } from "../../redux/selector";
import { fetchHangLoatHopDong } from "../../redux/slices/hopDongSlice/gethangLoatSlice";
import { fetchCapBacLuong } from "../../redux/slices/CapBacLuongSlice/CapBacLuongSlice";

const ModalAddHopDong = ({onClose}) => {
  const inputStyle = {
    width: "200px",
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listHangLoatHD = useSelector(getHangLoat);
  const capBacLuong = useSelector(getCapBacLuong)
  console.log("first",capBacLuong)

  useEffect(() => {
    dispatch(fetchHangLoatHopDong());
    dispatch(fetchCapBacLuong())
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
    value: item.id
  }));
  console.log("ddasd",listLuong)


  const handleForm = (value) => {
    const data = { ...value };
    if (data) {
      const PageNumber = 1;
        const PageSize = 10;
        data.PageNumber=1;
        data.PageSize=1;
        console.log("data",data)
      dispatch(createHopDong(data))
        .unwrap()
        .then(() => {
          dispatch(fetchHopDong(data));
          // window.location.reload();
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
        .finally(()=>{
          dispatch(fetchHopDong(data));
        })
    }
  };

  const handleAddCancel = () => {
    form.resetFields();
    onClose();
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
            <Typography.Title level={5}>Loại hợp đồng</Typography.Title>
            <Form.Item name="loaiHopDongId">
              <Select options={loaiHD} style={inputStyle}></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Ngày ký hợp đồng</Typography.Title>
            <Form.Item name="ngayKyHopDong">
              <DatePicker style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>
              Ngày kết thúc hợp đồng
            </Typography.Title>
            <Form.Item name="ngayKetThucHopDong">
              <DatePicker style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Thời hạn hợp đồng</Typography.Title>
            <Form.Item name="thoiHanHopDong">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Địa điểm làm việc</Typography.Title>
            <Form.Item name="diaDiemLamViec">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Bộ phận làm việc</Typography.Title>
            <Form.Item name="boPhanLamViec">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Chức danh</Typography.Title>
            <Form.Item name="chucDanhId">
              <Select options={chucDanh} style={inputStyle}></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Chức vụ</Typography.Title>
            <Form.Item name="chucVuId">
              <Select options={chucVu} style={inputStyle}></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Lương cơ bản</Typography.Title>
            <Form.Item name="luongCoBan">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Hệ số lương </Typography.Title>
            <Form.Item name="heSoLuongId">
              <Select options={listLuong} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Phụ cấp</Typography.Title>
            <Form.Item name="phuCapId">
              <Select options={phuCap} style={inputStyle}></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Ghi chú</Typography.Title>
            <Form.Item name="ghiChu">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{display:'flex', justifyContent:'flex-end',margin:'0'}}>
        <Button
            type="default"
            onClick={handleAddCancel}
            style={{width:'60px', marginRight:'5px'}}
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

export default ModalAddHopDong;
