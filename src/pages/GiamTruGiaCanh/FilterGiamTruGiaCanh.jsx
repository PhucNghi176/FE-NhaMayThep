import { Button, Col, Collapse, Form, Input, Row, Select } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTTGiamTru } from '../../redux/selector';
import { filterGiamTru } from '../../redux/slices/giamTruGiaCanhSlice/giamTruGiaCanhSlice';
import { AlignCenterOutlined, SearchOutlined } from '@ant-design/icons';


const { Panel } = Collapse;
function FilterGiamTruGiaCanh() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const danhSachTTGiamTru = useSelector(getTTGiamTru);
    const listTTGiamTru = danhSachTTGiamTru?.data?.map((item) => ({
        label: item.name,
        value: item.id,
      }));

    const onFinish = (values) => {
      console.log("valueFilter: ", values)
      const PageNumber = 1;
      const PageSize = 10;
      const data = { PageNumber, PageSize, ...values };
      console.log("data: ", data)
      dispatch(filterGiamTru(data))
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
      dispatch(filterGiamTru(data))
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
        style={{ width: '100%' , marginBottom:'10px'}}
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
                    name="NhanVienID"
                  >
                    <Input placeholder="Mã số nhân viên" />
                  </Form.Item>
                </Col>
  
                <Col span={6}>
                  <Form.Item
                    name="TenNhanVien"
                  >
                    <Input placeholder="Tên nhân viên" />
                  </Form.Item>
                </Col>
  
                <Col span={6}>
                  <Form.Item
                    name="MaGiamTruID"
                  >
                   <Select options={listTTGiamTru} placeholder="Mã giảm trừ"/>
                  </Form.Item>
                </Col>
  
                <Col span={6}>
                  <Form.Item
                    name="TenGiamTru"
                  >
                    <Input placeholder="Tên giảm trừ" />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    name="CanCuocCongDan"
                  >
                    <Input placeholder="CCCD" />
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
}

export default FilterGiamTruGiaCanh