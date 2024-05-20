import { Button, Col, Collapse, DatePicker, Form, Input, Row } from "antd";
import { useDispatch } from "react-redux";
import { filterLuongThoiGian } from "../../redux/slices/luongThoiGianSlice/luongThoiGianSlice";
import { AlignCenterOutlined, SearchOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const FilterLuongThoiGian = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("valueFilter: ", values);
    const PageNo = 1;
    const PageSize = 10;
    const data = { PageNo, PageSize, ...values };
    console.log("data: ", data);
    dispatch(filterLuongThoiGian(data))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log("errorFilter: ", error);
      });
  };

  const clearFilter = () => {
    form.resetFields();
    const PageNo = 1;
    const PageSize = 10;
    const data = { PageNo, PageSize };
    dispatch(filterLuongThoiGian(data))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log("errorFilter: ", error);
      });
  };
  return (
    <Collapse defaultActiveKey={["1"]} size="small" style={{ width: "100%" }}>
      <Panel header="Search Information" key="1">
        <div style={{ display: "flex", flexWrap: "wrap", height: "110px" }}>
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
                <Form.Item name="MaSoNhanVien">
                  <Input
                    placeholder="Mã Số Nhân Viên"
                    allowClear
                    style={{ width: "377px", marginRight: "200px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="HoVaTen">
                  <Input
                    placeholder="Họ và Tên"
                    allowClear
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="LuongNam">
                  <Input
                    placeholder="Lương Năm"
                    allowClear
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="LuongThang">
                  <Input
                    placeholder="Lương Tháng"
                    allowClear
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="LuongTuan">
                  <Input
                    placeholder="Lương Tuần"
                    allowClear
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="LuongNgay">
                  <Input
                    placeholder="Lương Ngày"
                    allowClear
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="LuongGio">
                  <Input
                    placeholder="Lương Giờ"
                    allowClear
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayApDung">
                  <DatePicker
                    placeholder="Ngày Áp Dụng"
                    format="DD/MM/YYYY"
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

export default FilterLuongThoiGian;
