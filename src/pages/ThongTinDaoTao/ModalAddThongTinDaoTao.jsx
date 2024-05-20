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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrinhDoHocVan } from "../../redux/selector";
import { fetchTrinhDoHocVan } from "../../redux/slices/TrinhDoHocVanSlice/trinhDoHocVanSlice";
import {
  createTTDT,
  fetchTTDT,
} from "../../redux/slices/thongTinDaoTaoSlice/thongTinDaoTaoSlice";

const ModalAddThongTinDaoTao = ({onClose}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listTrinhDoHocVan = useSelector(getTrinhDoHocVan);
  console.log("das", listTrinhDoHocVan);

  useEffect(() => {
    dispatch(fetchTrinhDoHocVan());
  }, []);

  const trinhDoHocVan = listTrinhDoHocVan?.value?.map((item) => ({
    label: item.tenTrinhDo,
    value: item.id,
  }));

  console.log("datdeptrai", trinhDoHocVan);

  const handleForm = (value) => {
    const data = { ...value };
    if (data) {
      const PageNumber = 1;
      const PageSize = 10;
      data.PageNumber = 1;
      data.PageSize = 1;
      console.log("data", data);
      dispatch(createTTDT(data))
        .unwrap()
        .then(() => {
          dispatch(fetchTTDT(data));
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
            <Form.Item name="nhanVienId">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Trình độ học vấn</Typography.Title>
            <Form.Item name="maTrinhDoHocVanId">
              <Select options={trinhDoHocVan} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Tên Trường</Typography.Title>
            <Form.Item name="tenTruong">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Chuyên ngành</Typography.Title>
            <Form.Item name="chuyenNganh">
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Năm tốt nghiệp</Typography.Title>
            <Form.Item name="namTotNghiep">
              <DatePicker style={inputStyle} picker="year" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Trình độ văn hoá</Typography.Title>
            <Form.Item name="trinhDoVanHoa">
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
  );
};

export default ModalAddThongTinDaoTao;
