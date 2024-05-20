import React from "react";
import { Button, Select, Popover, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const renderCVLink = (text, record) => (
  <a href={text} target="_blank" rel="noopener noreferrer">
    View
  </a>
);

export const renderRankSelect = (text,record) => (
  <Select defaultValue="accept">
    <Select.Option value="accept" style={{ color: "green" }}>
        Fresher
    </Select.Option>
    <Select.Option value="reject" style={{ color: "red" }}>
    Junior
    </Select.Option>
    <Select.Option value="pending" style={{ color: "orange" }}>
      Senior
    </Select.Option>
  </Select>
);

const columns = [
  {
    title: "Intern ID",
    dataIndex: "internId",
  },
  {
    title: "Full name",
    dataIndex: "fullName",
  },
  {
    title: "Phone number",
    dataIndex: "phoneNumber",
  },
  {
    title: "School",
    dataIndex: "school",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "CV",
    dataIndex: "cv",
    render: renderCVLink,
  },
  {
    title: "Technology",
    dataIndex: "tech",
  },
  {
    title:'Rank',
    dataIndex:'rank',
    render:renderRankSelect
  }
];

const data = [
  {
    key: "1",
    internId: "INTRN001",
    fullName: "John Doe",
    phoneNumber: "+1234567890",
    school: "MIT",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    tech:'BE'
  },
  {
    key: "2",
    internId: "INTRN002",
    fullName: "John Doe",
    phoneNumber: "+1234567890",
    school: "MIT",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    tech:'BE'

  },
  {
    key: "3",
    internId: "INTRN002",
    fullName: "John Doe",
    phoneNumber: "+1234567890",
    school: "MIT",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    tech:'BE'

  },
  {
    key: "4",
    internId: "INTRN002",
    fullName: "John Doe",
    phoneNumber: "+1234567890",
    school: "MIT",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    tech:'BE'

  },
  {
    key: "5",
    internId: "INTRN002",
    fullName: "John Doe",
    phoneNumber: "+1234567890",
    school: "MIT",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    tech:'BE'

  },
  {
    key: "6",
    internId: "INTRN002",
    fullName: "John Doe",
    phoneNumber: "+1234567890",
    school: "MIT",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    tech:'BE'

  },
  {
    key: "7",
    internId: "INTRN002",
    fullName: "John Doe",
    phoneNumber: "+1234567890",
    school: "MIT",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    tech:'BE'

  },
  {
    key: "8",
    internId: "INTRN002",
    fullName: "John Doe",
    phoneNumber: "+1234567890",
    school: "MIT",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    tech:'BE'
  },
];

const PositionTable = () => {
  return (
    <>
      <Table
        tableLayout="auto"
        size="small"
        scroll={{
          x: 900,
          // y: 4000,
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default PositionTable;
