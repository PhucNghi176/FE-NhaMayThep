import { Button, Col, Collapse, Form, Input, Row, Select } from "antd";
import { filterLuongSanPham } from "../../redux/slices/luongSanPhamSlice/luongSanPhamSlice";
import { useDispatch, useSelector } from "react-redux";
import { AlignCenterOutlined, SearchOutlined } from "@ant-design/icons";
import { getMucSanPham } from "../../redux/selector";
import { useEffect } from "react";
import { getListMucSanPham } from "../../redux/slices/mucSanPhamSlice/mucSanPhamSlice";

const { Panel } = Collapse;

const FilterLuongSanPham = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("valueFilter: ", values);
    const PageNo = 1;
    const PageSize = 10;
    const data = { PageNo, PageSize, ...values };
    console.log("data: ", data);
    dispatch(filterLuongSanPham(data))
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
    dispatch(filterLuongSanPham(data))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log("errorFilter: ", error);
      });
  };

  const listMucSanPham = useSelector(getMucSanPham);

  useEffect(() => {
    dispatch(getListMucSanPham());
  }, []);

  const option_list_mucSanPham = listMucSanPham?.value?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <Collapse defaultActiveKey={["1"]} size="small" style={{ width: "100%" }}>
      <Panel header="Search Information" key="1">
        <div style={{ display: "flex", flexWrap: "wrap", height: "30px" }}>
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
                <Form.Item name="SoSanPhamLam">
                  <Input
                    placeholder="Số Sản Phẩm Làm"
                    allowClear
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="MucSanPham">
                  <Select
                    placeholder="Mức Sản Phẩm"
                    allowClear
                    style={{ width: "377px" }}
                    options={option_list_mucSanPham}
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

export default FilterLuongSanPham;
