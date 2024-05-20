import React, { useEffect } from "react";
import {
  fetchTTDT,
  updateTTDT,
} from "../../redux/slices/thongTinDaoTaoSlice/thongTinDaoTaoSlice";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedTTDT, getTrinhDoHocVan } from "../../redux/selector";
import { fetchTrinhDoHocVan } from "../../redux/slices/TrinhDoHocVanSlice/trinhDoHocVanSlice";
import moment from "moment";

const ModalEditThongTinDaoTao = ({ onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const listTrinhDoHocVan = useSelector(getTrinhDoHocVan);
  const selectedRow = useSelector(getSelectedTTDT);
  console.log("zzz", selectedRow);

  useEffect(() => {
    dispatch(fetchTrinhDoHocVan());
  }, []);

  const trinhDoHocVan = listTrinhDoHocVan?.value?.map((item) => ({
    label: item.tenTrinhDo,
    value: item.id,
  }));

  const handleUpdateForm = (updatedValues, selectedRow) => {
    const id = selectedRow;
    updatedValues.id = id;
    dispatch(updateTTDT(updatedValues))
      .unwrap()
      .then(() => {
        dispatch(fetchTTDT());
      })
      .catch((error) => {
        console.error("Error updating record: ", error);
      })
      .finally(() => {
        const PageNumber = 1;
        const PageSize = 10;
        const data = { PageNumber, PageSize };
        dispatch(fetchTTDT(data));
      });
  };
  const handleEditCancel = () => {
    form.resetFields();
    onClose();
  };
  const inputStyle = {
    width: "200px",
  };

  return (
    <div>
      <Form form={form} name="editRecordForm" onFinish={handleUpdateForm}>
        <Row>
          <Col span={8}>
            <Typography.Title level={5}>Tên trường</Typography.Title>
            <Form.Item
              name="tenTruong"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={selectedRow ? selectedRow.tenTruong : ""}
            >
              <Input style={inputStyle}></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Chuyên ngành</Typography.Title>
            <Form.Item
              name="chuyenNganh"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={selectedRow ? selectedRow.chuyenNganh : ""}
            >
              <Input style={inputStyle}></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Năm tốt nghiệp</Typography.Title>
            <Form.Item
              name="namTotNghiep"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={
                selectedRow ? moment(selectedRow.namTotNghiep) : null
              }
            >
              <DatePicker style={inputStyle} picker="year" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Trình độ văn hoá</Typography.Title>
            <Form.Item
              name="trinhDoVanHoa"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={selectedRow ? selectedRow.trinhDoVanHoa : ""}
            >
              <Input style={inputStyle} type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Trình độ học vấn</Typography.Title>
            <Form.Item
              name="maTrinhDoHocVanId"
              rules={[{ required: true, message: "Vui lòng nhập!" }]}
              initialValue={selectedRow ? selectedRow.maTrinhDoHocVanID : ""}
            >
              <Select options={trinhDoHocVan} style={inputStyle} />
            </Form.Item>
            
          </Col>
        </Row>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="default"
                onClick={handleEditCancel}
                style={{ width: "60px", marginRight: "5px" }}
              >
                Huỷ
              </Button>
              <Button
                key="submit"
                type="primary"
                onClick={() => {
                  form
                    .validateFields()
                    .then((values) => {
                      handleUpdateForm(values, selectedRow.id);
                    })
                    .catch((error) => {
                      console.error("Validation failed:", error);
                    });
                }}
              >
                Lưu
              </Button>
            </Form.Item>
      </Form>
    </div>
  );
};

export default ModalEditThongTinDaoTao;
