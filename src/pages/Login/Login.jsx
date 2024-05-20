import { Button, Card, Form, Input, Row, Col, Checkbox, message } from "antd";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import logo1 from "../../assets/ATlogo.png";
import LoginSignUpHeader from "./LoginSignUpHeader";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../redux/slices/nhanVienSlice/nhanVienSlice";
import { tokenSelector } from "../../redux/selector";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector)
  const validateEmail = (_, value) => {
    if (value && !value.endsWith("@gmail.com")) {
      return Promise.reject("Please enter a valid Gmail email address.");
    }
    return Promise.resolve();
  };

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const data = { ...values };
    if (data) {
      dispatch(authenticateUser(data))
        .unwrap()
        .then((response) => {
          console.log("lgIn: ", response)
          // Kiểm tra nếu response không phải là lỗi
          if (response && response.status === 200) {
            navigate("/admin/dashboard");
          } else {
            // Xử lý lỗi ở đây
            message.error("Không thể đăng nhập. Vui lòng thử lại.");
          }
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  
  return (
    <>
      <LoginSignUpHeader />
      <div className="login-container">
        <Card style={{ overflowX: "hidden" }}>
          <Row gutter={[200, 200]}>
            {/* First Column */}
            <Col>
              {/* Content for the first column */}
              <div>
                <p className="login-header">WELCOME!</p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    fontSize: "16px",
                  }}
                >
                  Please fill in the details to access your account!
                </p>
                <Form
                  className="loginFormContent"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  autoComplete="off"
                  noValidate
                >
                  <p className="loginSignup_content">Email:</p>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email!",
                      },
                      {
                        validator: validateEmail,
                      },
                    ]}
                  >
                    <Input placeholder="Email"></Input>
                  </Form.Item>
                  <p className="loginSignup_content">Password:</p>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password"></Input.Password>
                  </Form.Item>
                  <Form.Item>
                    <Row justify="space-between">
                      <Col span={9} style={{ marginTop: "-10px" }}>
                        <Form.Item name="rememberMe">
                          <div>
                            <Checkbox>Remember me</Checkbox>
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={12} style={{ marginTop: "-5px" }}>
                        <a style={{ float: "right", color: "#cc1f53" }}>
                          Forgot Password?
                        </a>
                      </Col>
                    </Row>
                  </Form.Item>
                  <div style={{ marginTop: "-35px" }}>
                    <Form.Item>
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                      >
                        Login
                      </Button>
                    </Form.Item>
                    {/* <Form.Item style={{ marginTop: "-15px" }}>
                      <Button
                        block
                        type="default"
                        htmlType="submit"
                        onClick={onClickSignup}
                      >
                        Sign up
                      </Button>
                    </Form.Item> */}
                  </div>
                </Form>
              </div>
            </Col>

            {/* Second Column */}
            <Col>
              {/* Content for the second column */}
              <img
                src={logo1}
                style={{
                  maxWidth: "100%",
                  height: "400px",
                  margin: "50px 0 0 0",
                }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default Login;
