import React from 'react';
import { Collapse, DatePicker, Button, Form, Col, Row, Select, Input } from 'antd';
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { AlignCenterOutlined, SearchOutlined } from '@ant-design/icons';
import { loaiCongTacSelector } from "../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../../styles/button.css";
import { getListLoaiCongTac } from '../../redux/slices/loaiCongTacSlice/loaiCongTacSlice';
import { getListCongTac } from '../../redux/slices/lichSuCongTacSlice/lichSuCongTacSlice';

const { Panel } = Collapse;

const FilterLichSuCongTac = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const loaiCongTac = useSelector(loaiCongTacSelector);
  useEffect(() => {
    dispatch(getListLoaiCongTac());
  }, []);
  const option_congTac =
    loaiCongTac && loaiCongTac
      ? loaiCongTac.map((type) => ({
        value: type.id,
        label: type.name,
      }))
      : [];


  const onFinish = (values) => {
    // console.log("valueFilter: ", values)
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize, ...values };

    dispatch(getListCongTac(data))
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
    dispatch(getListCongTac(data))
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
                  name="MaSoNhanVien"
                >
                  <Input placeholder="ID nhân viên" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="HoVaTen"
                >
                  <Input placeholder="Họ và tên nhân viên" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="LoaiCongTacID">
                  <Select
                    name="loaiCongTac"
                    placeholder="Chọn loại công tác"
                    options={option_congTac}
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayBatDau">
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ display: "flex", cursor: "pointer" }}
                    locale={locale}
                    placeholder='Ngày bắt đầu công tác'
                  ></DatePicker>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayKetThuc">
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ display: "flex", cursor: "pointer" }}
                    locale={locale}
                    placeholder='Ngày kết thúc công tác'
                  ></DatePicker>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="NoiCongTac"
                >
                  <Input placeholder="Nơi công Tác" />
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

export default FilterLichSuCongTac;
