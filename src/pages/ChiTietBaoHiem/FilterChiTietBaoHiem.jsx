import React, { useEffect } from "react";
import { filterChiTietBaoHiem } from "../../redux/slices/chiTietBaoHiemSlice/chiTietBaoHiemSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { AlignCenterOutlined, SearchOutlined } from "@ant-design/icons";
/* import { getListBaoHiem } from "../../redux/slices/baoHiemSlice/baoHiemSlice";
import { getListBaoHiemSelector } from "../../redux/selector"; */

const { Panel } = Collapse;

const FilterChiTietBaoHiem = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("valueFilter: ", values);
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize, ...values };
    console.log("data: ", data);
    dispatch(filterChiTietBaoHiem(data))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log("errorFilter: ", error);
      });
  };

  const clearFilter = () => {
    form.resetFields();
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    dispatch(filterChiTietBaoHiem(data))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log("errorFilter: ", error);
      });
  };

  /* const listLoaiBaoHiem = useSelector(getListBaoHiemSelector);

  useEffect(() => {
    dispatch(getListBaoHiem());
  }, []);

  const option_list_baoHiem = listLoaiBaoHiem?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  })); */

  return (
    <Collapse defaultActiveKey={["1"]} size="small" style={{ width: "100%" }}>
      <Panel header="Search Information" key="1">
        <div style={{ display: "flex", flexWrap: "wrap", height: "70px" }}>
          <Form
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              span: 24,
            }}
            form={form}
            onFinish={onFinish}
          >
            <Row gutter={[10]}>
              <Col span={6}>
                <Form.Item name="Id">
                  <Input placeholder="Id" allowClear />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="MaBaoHiem">
                  <Input placeholder="Loại Bảo Hiểm" allowClear />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="TenBaohiem">
                  <Input placeholder="Tên Bảo Hiểm" allowClear />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="MaNhanVien">
                  <Input placeholder="Mã Số Nhân Viên" allowClear />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="TenNhanVien">
                  <Input placeholder="Tên Nhân Viên" allowClear />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayHieuLuc">
                  <DatePicker
                    placeholder="Ngày Hiệu Lực"
                    format="DD/MM/YYYY - HH:mm:ss"
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayKetThuc">
                  <DatePicker
                    placeholder="Ngày Kết Thúc"
                    format="DD/MM/YYYY - HH:mm:ss"
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col>
                <Button
                  onClick={clearFilter}
                  icon={<AlignCenterOutlined />}
                  style={{ margin: "0 5px 0 0" }}
                >
                  Clear Filter
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ padding: "4px 5px" }}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  );
};

export default FilterChiTietBaoHiem;
