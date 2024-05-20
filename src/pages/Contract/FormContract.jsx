import { Card, Col, Row, Spin } from "antd";
import "./FormContract.css";
import { useEffect, useState } from "react";


const FormContract = () => { 

  const [loading, setLoading] = useState(true);

  return (
      <>
          <>
            <div
              className="formHopDong"
              style={{ height: "84vh", overflow: "scroll" }}
            >
              <h3
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  marginTop: "10px",
                  color: "black",
                  textAlign: "center",
                }}
              >
                THÔNG TIN HỢP ĐỒNG
              </h3>
              <div
                className="Card"
                style={{ marginLeft: "25px", marginRight: "25px" }}
              >
                <Card style={{ width: "1200px" }}>
                  <div>
                    <div>
                      <h3 className="cardTitle">Thông tin người lao động</h3>
                      <Row
                        gutter={24}
                        style={{ width: "100%" }}
                        className="infoField"
                      >
                        <Col
                          span={3}
                          style={{ width: "50%" }}
                          className="infoField-label"
                        >
                          Họ và tên:
                        </Col>
                        <Col
                          span={21}
                          style={{ width: "100%" }}
                          className="infoField-value"
                        >
                          Nguyen Van A
                        </Col>
                      </Row>
                      <Row gutter={24}>
                        <Row
                          gutter={12}
                          style={{ width: "50%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "100%", marginLeft: "12px" }}
                            className="infoField-label"
                          >
                            Giới tính:
                          </Col>
                          <Col
                            span={6}
                            style={{ width: "100%", marginLeft: "-4px" }}
                            className="infoField-value"
                          >
                            Male
                          </Col>
                        </Row>
                        <Row
                          gutter={12}
                          style={{ width: "50%" }}
                          className="infoField"
                        >
                          <Col
                            span={8}
                            style={{ width: "100%" }}
                            className="infoField-label"
                          >
                            Số điện thoại:
                          </Col>
                          <Col
                            span={4}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            0901933
                          </Col>
                        </Row>
                      </Row>
                      <Row gutter={24}>
                        <Row
                          gutter={12}
                          style={{ width: "50%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "100%", marginLeft: "12px" }}
                            className="infoField-label"
                          >
                            Sinh ngày:
                          </Col>

                          <Col
                            span={6}
                            style={{ width: "100%", marginLeft: "-4px" }}
                            className="infoField-value"
                          >
                            11/01/2001
                          </Col>
                        </Row>
                        <Row
                          gutter={12}
                          style={{ width: "50%" }}
                          className="infoField"
                        >
                          <Col
                            span={8}
                            style={{ width: "100%" }}
                            className="infoField-label"
                          >
                            CMND|CCCD:
                          </Col>
                          <Col
                            span={4}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            073040400433
                          </Col>
                        </Row>
                      </Row>
                      <Row
                        gutter={24}
                        style={{ width: "100%" }}
                        className="infoField"
                      >
                        <Col
                          span={3}
                          style={{ width: "50%" }}
                          className="infoField-label"
                        >
                          Địa chỉ:
                        </Col>
                        <Col
                          span={21}
                          style={{ width: "100%" }}
                          className="infoField-value"
                        >
                          27A Le Van Viet
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <h3 className="cardTitle">Hợp đồng lao động</h3>
                      <div>
                        <h3 className="ectionTitle">
                          1. Công việc, phòng ban và thời hạn hợp đồng
                        </h3>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Phòng công tác:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            Department
                          </Col>
                        </Row>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Loại hợp đồng:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            Có thời hạn
                          </Col>
                        </Row>
                        <Row gutter={24}>
                          <Row
                            gutter={12}
                            style={{ width: "50%" }}
                            className="infoField"
                          >
                            <Col
                              span={6}
                              style={{ width: "100%", marginLeft: "12px" }}
                              className="infoField-label"
                            >
                              Từ ngày:
                            </Col>
                            <Col
                              span={6}
                              style={{ width: "100%", marginLeft: "-4px" }}
                              className="infoField-value"
                            >
                              
                              01/01/2024
                            </Col>
                          </Row>
                          <Row
                            gutter={12}
                            style={{ width: "50%" }}
                            className="infoField"
                          >
                            <Col
                              span={8}
                              style={{ width: "100%" }}
                              className="infoField-label"
                            >
                              Đến ngày:
                            </Col>
                            <Col
                              span={4}
                              style={{ width: "100%" }}
                              className="infoField-value"
                            >
                             01/04/2024
                            </Col>
                          </Row>
                        </Row>
                      </div>
                      <div>
                        <h3 className="ectionTitle">
                          2. Lương, phụ cấp và các khoản bổ sung khác
                        </h3>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Lương cơ bản:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            3000000
                          </Col>
                        </Row>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Lương Đóng BHXH:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            3000000
                          </Col>
                        </Row>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Các phụ cấp (mỗi tháng) bao gồm:
                          </Col>
                        </Row>
                            Phụ cấp
                            <div style={{ marginLeft: 20 }}>
                              <Row
                                gutter={24}
                                style={{ width: "100%" }}
                                className="infoField"
                              >
                                <Col
                                  span={6}
                                  style={{
                                    width: "50%",
                                    paddingTop: 3,
                                    fontWeight: 600,
                                  }}
                                >
                                  - Loại phụ cấp:
                                </Col>
                              </Row>
                            </div>
                        
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Số người phụ thuộc:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            12
                          </Col>
                        </Row>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Hình thức trả lương:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            Chuyển Khoản Qua Ngân Hàng
                          </Col>
                        </Row>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Số tài khoản ngân hàng:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            tknh: 123456
                          </Col>
                        </Row>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Chủ tài khoản:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            chủ tk
                          </Col>
                        </Row>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Ngân hàng:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            VietcomBank
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <h3 className="ectionTitle">
                          3. Thời gian làm việc và ghi chú
                        </h3>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Số ngày làm một tuần:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            5 ngày
                          </Col>
                        </Row>
                        <Row
                          gutter={24}
                          style={{ width: "100%" }}
                          className="infoField"
                        >
                          <Col
                            span={6}
                            style={{ width: "50%" }}
                            className="infoField-label"
                          >
                            Ghi chú:
                          </Col>
                          <Col
                            span={18}
                            style={{ width: "100%" }}
                            className="infoField-value"
                          >
                            
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </>
        
      </>
    
  );
};

export default FormContract;
