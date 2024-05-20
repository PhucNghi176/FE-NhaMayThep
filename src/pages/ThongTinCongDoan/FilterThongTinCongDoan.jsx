import { Button, Col, Collapse, DatePicker, Form, Input, Row } from "antd";
import { useDispatch } from "react-redux";
import { filterThongTinCongDoan } from "../../redux/slices/thongTinCongDoanSlice/thongTinCongDoanSlice";
import { AlignCenterOutlined, SearchOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const FilterThongTinCongDoan = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("valueFilter: ", values);
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize, ...values };
    console.log("data: ", data);
    dispatch(filterThongTinCongDoan(data))
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
    dispatch(filterThongTinCongDoan(data))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log("errorFilter: ", error);
      });
  };
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
                  <Input
                    placeholder="Id"
                    style={{ width: "377px" }}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NhanVienId">
                  <Input
                    placeholder="Mã Số Nhân Viên"
                    style={{ width: "377px" }}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="TenNhanVien">
                  <Input
                    placeholder="Tên Nhân Viên"
                    style={{ width: "377px" }}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayGiaNhap">
                  <DatePicker
                    placeholder="Ngày Gia Nhập"
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

export default FilterThongTinCongDoan;
