import React from "react";
import { getTrinhDoHocVan } from "../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Collapse, Form, Input, Row, Select } from "antd";
import { filterTTDT } from "../../redux/slices/thongTinDaoTaoSlice/thongTinDaoTaoSlice";
import { AlignCenterOutlined, SearchOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const FilterThongTinDaoTao = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const listTrinhDoHocVan = useSelector(getTrinhDoHocVan);

  const trinhDoHocVan = listTrinhDoHocVan?.value?.map((item) => ({
    label: item.tenTrinhDo,
    value: item.id,
  }));

  const onFinish = (values) => {
    console.log("valueFilter: ", values);
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize, ...values };
    console.log("data: ", data);
    dispatch(filterTTDT(data))
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
    dispatch(filterTTDT(data))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log("errorFilter: ", error);
      });
  };
  return (
    <Collapse
      defaultActiveKey={["1"]}
      size="small"
      style={{ width: "100%", marginBottom: "10px" }}
    >
      <Panel header="Search Information" key="1">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "70px",
          }}
        >
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
                <Form.Item name="TrinhDoVanHoa">
                  <Input type="number" placeholder="Trình độ văn hoá" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="MaTrinhDoHocVanID">
                  <Select
                    options={trinhDoHocVan}
                    placeholder="Trình độ học vấn"
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NhanVienID">
                  <Input placeholder="Mã nhân viên" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="TenTruong">
                  <Input placeholder="Tên trường" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="ChuyenNganh">
                  <Input placeholder="Chuyên ngành" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Button
                  onClick={clearFilter}
                  icon={<AlignCenterOutlined />}
                  style={{ margin: "0 5px 0 0" }}
                >
                  Clean Filter
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

export default FilterThongTinDaoTao;
