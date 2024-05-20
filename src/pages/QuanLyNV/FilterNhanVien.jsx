import React from 'react';
import { Collapse, Input, Button, Form, Col, Row, Select } from 'antd';
import { AlignCenterOutlined, SearchOutlined } from '@ant-design/icons';
import { getListHangLoat } from "../../redux/slices/nhanVienSlice/getHangLoatSlice";
import { getHangLoatSelector } from "../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterNhanVien } from '../../redux/slices/nhanVienSlice/nhanVienSlice';
import "../../styles/button.css";

const { Panel } = Collapse;

const FilterNhanVien = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const listHangLoat = useSelector(getHangLoatSelector);
  useEffect(() => {
    dispatch(getListHangLoat());

  }, []);

  const option_list_chucVu = listHangLoat && listHangLoat.ChucVu
    ? listHangLoat.ChucVu.map((type) => ({
      value: type.key,
      label: type.value,
    }))
    : [];

  const option_list_tinhTrang = listHangLoat && listHangLoat.TinhTrangLamViec
    ? listHangLoat.TinhTrangLamViec.map((type) => ({
      value: type.key,
      label: type.value,
    }))
    : [];

  const onFinish = (values) => {
    console.log("valueFilter: ", values)
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize, ...values };
    console.log("data: ", data)
    dispatch(filterNhanVien(data))
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
    dispatch(filterNhanVien(data))
      .unwrap()
      .then(() => {

      })
      .catch((error) => {
        console.log("errorFilter: ", error);
      });
  };
  return (

    <Collapse
      defaultActiveKey={['1']}
      size="small"
      style={{ width: '100%' }}
    >
      <Panel header="Search Information" key="1">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            height: '70px',
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
                <Form.Item
                  name="Email"
                >
                  <Input placeholder="Email" type="email" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="HoVaTen"
                >
                  <Input placeholder="Họ và Tên" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="CanCuocCongDan"
                >
                  <Input placeholder="Căn cước công dân" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="chucvuID">
                  <Select
                    name="chucVuID"
                    placeholder="Chọn chức vụ"
                    options={option_list_chucVu}
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="tinhtranglamviecID">
                  <Select
                    name="tinhTrangLamViecID"
                    placeholder="Chọn tình trạng"
                    options={option_list_tinhTrang}
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Button onClick={clearFilter} icon={<AlignCenterOutlined />} style={{ margin: '0 5px 0 0' }}>
                  Clean Filter
                </Button>
                <Button type="primary" htmlType='submit' icon={<SearchOutlined />} style={{ padding: '4px 5px' }}>
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

export default FilterNhanVien;
