import {
  Button,
  Card,
  Form,
  Input,
  Row,
  Col,
  message,
  Radio,
  DatePicker,
} from "antd";
import { useState } from "react";
import "../../styles/Login.css";
import logo1 from "../../assets/ATlogo.png";
import { Link, useNavigate } from "react-router-dom";
import LoginSignUpHeader from "./LoginSignUpHeader";

const Signup = () => {
  const [gender, setGender] = useState();

  const navigate = useNavigate();

  const validateEmail = (_, value) => {
    if (value && !value.endsWith("@gmail.com")) {
      return Promise.reject("Please enter a valid Gmail email address.");
    }
    return Promise.resolve();
  };

  const onFinishSignup = () => {
    message.success("Your account has been signed up succesfully");
    navigate("/");
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
                <p className="login-header">SIGN UP</p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    fontSize: "16px",
                  }}
                >
                  Please fill in the details to sign up your account!
                </p>
                <Form onFinish={onFinishSignup} className="loginFormContent">
                  <p className="loginSignup_content">First Name:</p>
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name!",
                      },
                      {
                        pattern: /^[a-zA-Z]+$/,
                        message:
                          "First name can not contain any number or special character!",
                      },
                    ]}
                  >
                    <Input placeholder="First Name"></Input>
                  </Form.Item>
                  <p className="loginSignup_content">Last Name:</p>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name!",
                      },
                      {
                        pattern: /^[a-zA-Z]+$/,
                        message:
                          "Last name can not contain any number or special character!",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name"></Input>
                  </Form.Item>
                  <p className="loginSignup_content">Gender:</p>
                  <Form.Item
                    style={{ marginBottom: "25px" }}
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: "Please select your gender!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio
                        name="male"
                        value="Male"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        Male
                      </Radio>
                      <Radio
                        name="female"
                        value="Female"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        Female
                      </Radio>
                      <Radio
                        name="other"
                        value="Other"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        Other
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <p className="loginSignup_content">Date of birth:</p>
                  <Form.Item
                    name="dateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your date of birth!",
                      },
                      {
                        type: "date",
                        message: "Please enter valid date of birth!",
                      },
                    ]}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      style={{ display: "flex", cursor: "pointer" }}
                    ></DatePicker>
                  </Form.Item>
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
                  <div>
                    <Form.Item>
                      <Button block type="primary" htmlType="submit">
                        Sign up
                      </Button>
                    </Form.Item>
                    <p
                      style={{
                        marginTop: "-10px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        color: "#41474f",
                      }}
                    >
                      Already have an account?
                      <span style={{ marginLeft: "5px" }}>
                        <Link to="/" style={{ textDecoration: "underline" }}>
                          Login
                        </Link>
                      </span>
                    </p>
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
                  margin: "100px 0 0 0",
                }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default Signup;