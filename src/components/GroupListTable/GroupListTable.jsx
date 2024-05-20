import React from "react";
import { Button, Select, Popover, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const renderCVLink = (text, record) => (
  <a href={text} target="_blank" rel="noopener noreferrer">
    View
  </a>
);

const renderCommentPopover = (text) => (
  <Popover
    content={<span style={{ whiteSpace: "pre-wrap" }}>{text}</span>}
    title="Comment"
    trigger="click"
  >
    <Button
      icon={<EyeOutlined />}
      type="text"
      style={{ marginLeft: "21px" }}
    ></Button>
  </Popover>
);

const renderStatusSelect = () => (
  <Select style={{ width: "100px" }} defaultValue="accept">
    <Select.Option value="accept" style={{ color: "green" }}>
      Accept
    </Select.Option>
    <Select.Option value="reject" style={{ color: "red" }}>
      Reject
    </Select.Option>
    <Select.Option value="in process" style={{ color: "orange" }}>
      <p style={{ color: "orange" }}>In Process</p>
    </Select.Option>
  </Select>
);

const renderInternshipContractSelect = () => (
  <Select style={{ width: "160px" }} defaultValue="signed">
    <Select.Option value="signed" style={{ color: "green" }}>
      <p style={{ color: "green" }}>Signed</p>
    </Select.Option>
    <Select.Option value="not signed" style={{ color: "red" }}>
      <p style={{ color: "red" }}>Not Signed</p>
    </Select.Option>
    <Select.Option value="in process" style={{ color: "orange" }}>
      <p style={{ color: "orange" }}>In Process</p>
    </Select.Option>
  </Select>
);

const renderButtonGroup = () => (
  <div>
    <Button style={{ width: "50px", marginRight: "5px" }}>View</Button>
    <Button style={{ width: "80px" }}>Upload File</Button>
  </div>
);

const columns = [
  {
    title: "ID Thực Tập Sinh",
    dataIndex: "internId",
  },
  {
    title: "Ngày Phỏng Vấn",
    dataIndex: "dateInterview",
  },
  {
    title: "Thời Gian Phỏng Vấn",
    dataIndex: "timeInterview",
  },
  {
    title: "Họ và Tên",
    dataIndex: "fullName",
  },
  {
    title: "Ngày sinh",
    dataIndex: "dob",
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "phoneNumber",
  },
  {
    title: "Vị Trí",
    dataIndex: "position",
  },
  {
    title: "Trường",
    dataIndex: "school",
  },
  {
    title: "Địa Chỉ",
    dataIndex: "address",
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
    title: "Bình Luận",
    dataIndex: "comment",
    width: 90,
    render: renderCommentPopover,
  },
  {
    title: "Vai Trò",
    dataIndex: "role",
  },
  {
    title: "Dự Án",
    dataIndex: "project",
  },
  {
    title: "Nhóm Zalo",
    dataIndex: "groupZalo",
  },
  {
    title: "Cố Vấn",
    dataIndex: "mentor",
  },
  {
    title: "Trạng Thái",
    dataIndex: "status",
    width: 100,
    render: renderStatusSelect,
  },
  {
    title: "Hợp Đồng Thực Tập Sinh",
    dataIndex: "intershipContract",
    width: 100,
    render: renderInternshipContractSelect,
  },
  {
    title: "Tương Tác",
    width: 150,
    render: renderButtonGroup,
  },
];

const data = [
  {
    key: "1",
    internId: "INTRN001",
    dateInterview: "10 Dec 2024",
    timeInterview: "9:30:00 AM",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
    role: "Leader",
    project: "Intern System",
    groupZalo: "FE Intern System",
    mentor: "ABC",
  },
  {
    key: "2",
    internId: "INTRN002",
    dateInterview: "10 Dec 2024",
    timeInterview: "9:30:00 AM",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
    role: "Leader",
    project: "Intern System",
    groupZalo: "FE Intern System",
    mentor: "ABC",
  },
  {
    key: "3",
    internId: "INTRN002",
    dateInterview: "10 Dec 2024",
    timeInterview: "9:30:00 AM",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
    role: "Leader",
    project: "Intern System",
    groupZalo: "FE Intern System",
    mentor: "ABC",
  },
  {
    key: "4",
    internId: "INTRN002",
    dateInterview: "10 Dec 2024",
    timeInterview: "9:30:00 AM",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
    role: "Leader",
    project: "Intern System",
    groupZalo: "FE Intern System",
    mentor: "ABC",
  },
  {
    key: "5",
    internId: "INTRN002",
    dateInterview: "10 Dec 2024",
    timeInterview: "9:30:00 AM",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
    role: "Leader",
    project: "Intern System",
    groupZalo: "FE Intern System",
    mentor: "ABC",
  },
  {
    key: "6",
    internId: "INTRN002",
    dateInterview: "10 Dec 2024",
    timeInterview: "9:30:00 AM",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
    role: "Leader",
    project: "Intern System",
    groupZalo: "FE Intern System",
    mentor: "ABC",
  },
  {
    key: "7",
    internId: "INTRN002",
    dateInterview: "10 Dec 2024",
    timeInterview: "9:30:00 AM",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
    role: "Leader",
    project: "Intern System",
    groupZalo: "FE Intern System",
    mentor: "ABC",
  },
  {
    key: "8",
    internId: "INTRN002",
    dateInterview: "10 Dec 2024",
    timeInterview: "9:30:00 AM",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
    role: "Leader",
    project: "Intern System",
    groupZalo: "FE Intern System",
    mentor: "ABC",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    name: record.name,
  }),
};

const GroupListTable = () => {
  return (
    <>
      <Table
        tableLayout="auto"
        bordered
        size="small"
        scroll={{
          x: 2200,
          // y: 4000,
        }}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default GroupListTable;
