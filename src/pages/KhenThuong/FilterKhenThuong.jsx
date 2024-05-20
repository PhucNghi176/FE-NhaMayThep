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
import { useDispatch, useSelector } from "react-redux";
import { filterKhenThuong } from "../../redux/slices/khenThuongSlice/khenThuongSlice";
import { AlignCenterOutlined, SearchOutlined } from "@ant-design/icons";
import { getChinhSachNhanSu } from "../../redux/selector";
import { fetchChinhSachNhanSu } from "../../redux/slices/chinhSachNhanSuSlice/chinhSachNhanSuSlice";
import { useEffect } from "react";

const { Panel } = Collapse;

const FilterKhenThuong = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const listChinhSachNhanSu = useSelector(getChinhSachNhanSu);

  useEffect(() => {
    dispatch(fetchChinhSachNhanSu());
  }, []);

  const option_list_chinhSach = listChinhSachNhanSu?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const onFinish = (values) => {
    console.log("valueFilter: ", values);
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize, ...values };
    console.log("data: ", data);
    dispatch(filterKhenThuong(data))
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
    dispatch(filterKhenThuong(data))
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
                <Form.Item name="MaSoNhanVien">
                  <Input
                    placeholder="Mã Số Nhân Viên"
                    allowClear
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="ChinhSachNhanSuID">
                  <Select
                    placeholder="Chính Sách Nhân Sự"
                    options={option_list_chinhSach}
                    allowClear
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="TenDotKhenThuong">
                  <Input
                    placeholder="Đợt Khen Thưởng"
                    allowClear
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayKhenThuong">
                  <DatePicker
                    placeholder="Ngày Khen Thưởng"
                    format="DD/MM/YYYY - HH:mm:ss"
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="TongThuong">
                  <Input
                    placeholder="Tổng Thưởng"
                    allowClear
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

export default FilterKhenThuong;
