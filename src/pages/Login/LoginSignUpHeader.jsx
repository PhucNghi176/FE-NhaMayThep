import logo from "../../assets/logo-color.png";
import englishFlag from "../../assets/english.png";
import { Row, Col, Form, Select } from "antd";
import vietnamFlag from "../../assets/vietnam.png";

const LoginSignUpHeader = () => {
  const handleChange = (value) => {
    console.log(`Selected language: ${value}`);
    // Implement logic to change the language in your application
  };
  return (
    <>
      <div>
        <Row justify="space-between">
          <Col span={12}>
            <Form.Item>
              <img src={logo} style={{ marginLeft: "30px" }} />
            </Form.Item>
          </Col>
          <Col span={12} style={{ marginTop: "20px" }}>
            <Select
              defaultValue="en"
              style={{ width: 120, float: "right", marginRight: "30px" }}
              onChange={handleChange}
            >
              <Select.Option value="en">
                <span style={{ margin: " 10px 0 0 0" }}>
                  <div>
                    <img
                      src={englishFlag}
                      style={{
                        height: "12px",
                        float: "left",
                        marginLeft: "2px",
                        marginRight: "2px",
                      }}
                    />
                  </div>
                </span>
                <div>
                  <p style={{ margin: "3px" }}>English</p>
                </div>
              </Select.Option>
              <Select.Option value="vi">
                <span style={{ margin: " 10px 0 0 0" }}>
                  <div>
                    <img
                      src={vietnamFlag}
                      style={{
                        height: "12px",
                        float: "left",
                        marginLeft: "2px",
                        marginRight: "2px",
                      }}
                    />
                  </div>
                </span>
                <div>
                  <p style={{ margin: "3px" }}>Tiếng Việt</p>
                </div>
              </Select.Option>
            </Select>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginSignUpHeader;
