import React from 'react';
import { Collapse, DatePicker, Button, Form, Col, Row, Select } from 'antd';
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { AlignCenterOutlined, SearchOutlined } from '@ant-design/icons';
import { getListCapDangVienSelector, getListChucVuDangSelector, getListDonViCongTacSelector, getListTrinhDoChinhTriSelector } from "../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../../styles/button.css";
import { getListDonViCongTac } from '../../redux/slices/donViCongTacSlice/donViCongTacSlice';
import { getListChucVuDang } from '../../redux/slices/chucVuDangSlice/chucVuDangSlice';
import { getListTrinhDoChinhTri } from '../../redux/slices/trinhDoChinhTriSlice/trinhDoChinhTriSlice';
import { getListCapDangVien } from '../../redux/slices/capDangVienSlice/capDangVienSlice';
import { getListDangVien } from '../../redux/slices/dangVienSlice/dangVienSlice';

const { Panel } = Collapse;

const FilterDangVien = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const listDonViCongTac = useSelector(getListDonViCongTacSelector);
  useEffect(() => {
    dispatch(getListDonViCongTac());
  }, []);
  const option_list_donViCongTac =
    listDonViCongTac && listDonViCongTac
      ? listDonViCongTac.map((type) => ({
        value: type.id,
        label: type.name,
      }))
      : [];

  const listChucVuDang = useSelector(getListChucVuDangSelector);
  useEffect(() => {
    dispatch(getListChucVuDang());
  }, []);
  const option_list_chucVuDang =
    listChucVuDang && listChucVuDang
      ? listChucVuDang.map((type) => ({
        value: type.id,
        label: type.name,
      }))
      : [];

  const listTrinhDoChinhTri = useSelector(getListTrinhDoChinhTriSelector);
  useEffect(() => {
    dispatch(getListTrinhDoChinhTri());
  }, []);
  const option_list_trinhDoChinhTri =
    listTrinhDoChinhTri && listTrinhDoChinhTri
      ? listTrinhDoChinhTri.map((type) => ({
        value: type.id,
        label: type.name,
      }))
      : [];

  const listCapDangVien = useSelector(getListCapDangVienSelector);
  useEffect(() => {
    dispatch(getListCapDangVien());
  }, []);
  const option_list_capDangVien =
    listCapDangVien && listCapDangVien
      ? listCapDangVien.map((type) => ({
        value: type.id,
        label: type.name,
      }))
      : [];

  const onFinish = (values) => {
    // console.log("valueFilter: ", values)
    const PageNumber = 1;
    const PageSize = 10;
    const data = { PageNumber, PageSize, ...values };

    dispatch(getListDangVien(data))
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
    dispatch(getListDangVien(data))
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
                <Form.Item name="DonViCongTacID">
                  <Select
                    name="donViCongTac"
                    placeholder="Chọn đơn vị công tác"
                    options={option_list_donViCongTac}
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="ChucVuDangID">
                  <Select
                    name="chucVuDang"
                    placeholder="Chọn chức vụ Đảng"
                    options={option_list_chucVuDang}
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="TrinhDoChinhTriID">
                  <Select
                    name="trinhDoChinhTri"
                    placeholder="Chọn trình độ chính trị"
                    options={option_list_trinhDoChinhTri}
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="NgayVaoDang">
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ display: "flex", cursor: "pointer" }}
                    locale={locale}
                    placeholder='Ngày vào Đảng'
                  ></DatePicker>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="CapDangVienID">
                  <Select
                    name="capDangVien"
                    placeholder="Chọn cấp Đảng viên"
                    options={option_list_capDangVien}
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

export default FilterDangVien;
