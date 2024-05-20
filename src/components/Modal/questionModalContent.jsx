import React from "react";
import { Input, Tabs, Typography } from "antd";

const modalAddStyle = {
  display: "flex",
  margin: "15px 0",
};

const inputStyle = {
  width: "200px",
};

const TabContent = () => {
  return (
    <div style={modalAddStyle}>
      <div>
        <Typography.Title level={5}>Project Title </Typography.Title>
        <Input style={inputStyle} />
      </div>
      <div style={{ margin: "0 20px" }}>
        <Typography.Title level={5}>Position</Typography.Title>
        <Input style={inputStyle} />
      </div>
      <div>
        <Typography.Title level={5}>Technology</Typography.Title>
        <Input style={inputStyle} />
      </div>
    </div>
  );
};

const items = [
  { key: "1", label: "Intern", children: <TabContent /> },
  { key: "2", label: "Fresher", children: <TabContent /> },
  { key: "3", label: "Junior", children: <TabContent /> },
  { key: "4", label: "Senior", children: <TabContent /> },
];

const QuestionModalContent = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default QuestionModalContent;
