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
import { filterNhanSu } from "../../redux/slices/NhanSuSlice/nhanSuSlice";
import { AlignCenterOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { getListHangLoatNhanSu } from "../../redux/slices/NhanSuSlice/getHangLoatNhanSuSlice";
import { getHangLoatNhanSuSelector } from "../../redux/selector";

const { Panel } = Collapse;

const FilterNhanSu = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const listHangLoatNhanSu = useSelector(getHangLoatNhanSuSelector);
  useEffect(() => {
    dispatch(getListHangLoatNhanSu());
  }, []);

  const option_list_chucVu =
    listHangLoatNhanSu && listHangLoatNhanSu.ChucVu
      ? listHangLoatNhanSu.ChucVu.map((type) => ({
          value: type.key,
          label: type.value,
        }))
      : [];

  const option_list_chucDanh =
    listHangLoatNhanSu && listHangLoatNhanSu.ChucDanh
      ? listHangLoatNhanSu.ChucDanh.map((type) => ({
          value: type.key,
          label: type.value,
        }))
      : [];

  const option_list_phongBan =
    listHangLoatNhanSu && listHangLoatNhanSu.PhongBan
      ? listHangLoatNhanSu.PhongBan.map((type) => ({
          value: type.key,
          label: type.value,
        }))
      : [];

  const option_list_loaiQuaTrinh =
    listHangLoatNhanSu && listHangLoatNhanSu.LoaiQuaTrinh
      ? listHangLoatNhanSu.LoaiQuaTrinh.map((type) => ({
          value: type.key,
          label: type.value,
        }))
      : [];

  const onFinish = (values) => {
    console.log("valueFilter: ", values);
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize, ...values };
    console.log("data: ", data);
    dispatch(filterNhanSu(data))
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
    dispatch(filterNhanSu(data))
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
                <Form.Item name="NgayTao">
                  <DatePicker
                    placeholder="Ngày Tạo"
                    format="DD/MM/YYYY - HH:mm:ss"
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="MaSoNhanVien">
                  <Input placeholder="Mã Số Nhân Viên" allowClear />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="LoaiQuaTrinhID">
                  <Select
                    name="LoaiQuaTrinhID"
                    placeholder="Loại Quá Trình"
                    options={option_list_loaiQuaTrinh}
                    allowClear
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayBatDau">
                  <DatePicker
                    placeholder="Ngày Bắt Đầu"
                    format="DD/MM/YYYY"
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayKetThuc">
                  <DatePicker
                    placeholder="Ngày Kết Thúc"
                    format="DD/MM/YYYY"
                    style={{ width: "377px" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="PhongBanID">
                  <Select
                    name="PhongBanID"
                    placeholder="Phòng Ban"
                    options={option_list_phongBan}
                    allowClear
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="ChucVuID">
                  <Select
                    name="ChucVuID"
                    placeholder="Chức Vụ"
                    options={option_list_chucVu}
                    allowClear
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="ChucDanhID">
                  <Select
                    name="ChucDanhID"
                    placeholder="Chức Danh"
                    options={option_list_chucDanh}
                    allowClear
                  ></Select>
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

export default FilterNhanSu;
