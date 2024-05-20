import { AlignCenterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, DatePicker, Form, Input, Row, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHangLoat } from "../../redux/selector";
import { filterHopDong } from "../../redux/slices/hopDongSlice/hopDongSlice";

const { Panel } = Collapse;

const FilterHopDong = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listHangLoatHD = useSelector(getHangLoat);

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

  const onFinishFilter = (values) => {
    console.log("valueFilter: ", values)
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize, ...values };
    console.log("data-finish: ", data)
    dispatch(filterHopDong(data))
      .unwrap()
      .then(() => {
      })
      .catch((error) => {
        console.log("errorFilter: ", error);
      })
  };

  const clearFilter = () => {
    form.resetFields();
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize };
    dispatch(filterHopDong(data))
      .unwrap()
      .then(() => {

      })
      .catch((error) => {
        console.log("errorFilter: ", error);
      });
  };

  return (
    <Collapse
      defaultActiveKey={["1"]}
      size="small"
      style={{ width: "100%", marginBottom: "20px" }}
    >
      <Panel header="Search Information" key="1">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "100px",
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
            onFinish={onFinishFilter}
          >
            <Row gutter={[10]}>
              <Col span={6}>
                <Form.Item name="LoaiHopDongID">
                  <Select options={loaiHD} placeholder="Chọn loại hợp đồng"/>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="BoPhanLamViec">
                  <Input placeholder="Chọn bộ phận làm việc" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="ChucVuID">
                  <Select name="ChucVuID" placeholder="Chọn chức vụ" options={chucVu}></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="ChucDanhID">
                  <Select
                    name="ChucDanhID"
                    placeholder="Chọn chức danh"
                    options={chucDanh}
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="PhuCapID">
                  <Select
                  // mode="multiple"
                    name="PhuCapID"
                    placeholder="Chọn phụ cấp"
                    options={phuCap}
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayKy">
                  <DatePicker placeholder="Chọn ngày ký" />
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

export default FilterHopDong;
