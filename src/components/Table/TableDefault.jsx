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

export const renderStatusSelect = () => (
  <Select defaultValue="accept">
    <Select.Option value="accept" style={{ color: "green" }}>
      Accept
    </Select.Option>
    <Select.Option value="reject" style={{ color: "red" }}>
      Reject
    </Select.Option>
    <Select.Option value="pending" style={{ color: "orange" }}>
      Pending
    </Select.Option>
  </Select>
);

const renderButtonGroup = () => (
  <div>
    <Button style={{ width: "50px", marginRight: "5px" }}>View</Button>
    <Button style={{ width: "80px" }}>Comment</Button>
  </div>
);

const columns = [
  {
    title: "Intern ID",
    dataIndex: "internId",
  },
  {
    title: "Date submitted",
    dataIndex: "dateSubmitted",
  },
  {
    title: "Full name",
    dataIndex: "fullName",
  },
  {
    title: "DoB",
    dataIndex: "dob",
  },
  {
    title: "Phone number",
    dataIndex: "phoneNumber",
  },
  {
    title: "Position",
    dataIndex: "position",
  },
  {
    title: "School",
    dataIndex: "school",
  },
  {
    title: "Address",
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
    title: "Comment",
    dataIndex: "comment",
    width: 90,
    render: renderCommentPopover,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 110,
    render: renderStatusSelect,
  },
  {
    title: "Buttons",
    dataIndex: "buttons",
    width: 150,
    render: renderButtonGroup,
  },
];

const data = [
  {
    key: "1",
    internId: "INTRN001",
    dateSubmitted: "10 Dec 2024",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
  },
  {
    key: "2",
    internId: "INTRN002",
    dateSubmitted: "10 Dec 2024",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
  },
  {
    key: "3",
    internId: "INTRN002",
    dateSubmitted: "10 Dec 2024",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
  },
  {
    key: "4",
    internId: "INTRN002",
    dateSubmitted: "10 Dec 2024",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
  },
  {
    key: "5",
    internId: "INTRN002",
    dateSubmitted: "10 Dec 2024",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
  },
  {
    key: "6",
    internId: "INTRN002",
    dateSubmitted: "10 Dec 2024",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
  },
  {
    key: "7",
    internId: "INTRN002",
    dateSubmitted: "10 Dec 2024",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
  },
  {
    key: "8",
    internId: "INTRN002",
    dateSubmitted: "10 Dec 2024",
    fullName: "John Doe",
    dob: "1995-03-21",
    phoneNumber: "+1234567890",
    position: "Software Engineer Intern",
    school: "MIT",
    address: "123 Main St, Anytown, CA",
    email: "john.doe@example.com",
    cv: "path/to/cv.pdf",
    comment: "Strong candidate with excellent coding skills.",
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

const TableDefault = () => {
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

export const tableColumns = columns;
export const tableData = data;
export default TableDefault;
