import React from "react";
import { Button, Select, Popover, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ReportProcessModal from "../ReportProcess/ReportProcessModal";
import ViewInternModal from "../ViewIntern/ViewInternModal";

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

const renderReportProcessButton = (record) => (
  <ReportProcessModal record={record} />
);
const renderButton = (record) => <ViewInternModal record={record} />;

const columns = [
  {
    title: "ID Thực Tập Sinh",
    dataIndex: "internId",
  },
  {
    title: "Ngày Bắt Đầu",
    dataIndex: "startDate",
  },
  {
    title: "Ngày Kết Thúc",
    dataIndex: "finishDate",
  },
  {
    title: "Họ và Tên",
    dataIndex: "fullName",
  },
  {
    title: "Ngày Sinh",
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
    title: "Nhóm  Zalo",
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
    title: "Quá Trình Báo Cáo",
    width: 100,
    render: (record) => {
      return renderReportProcessButton(record);
    },
  },
  {
    title: "Tương Tác",
    width: 95,
    render: (record) => {
      return renderButton(record);
    },
  },
];

const data = [
  {
    key: "1",
    internId: "INTRN001",
    startDate: "10 Dec 2023",
    finishDate: "10 Jan 2024",
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
    startDate: "10 Dec 2023",
    finishDate: "10 Jan 2024",
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
    startDate: "10 Dec 2023",
    finishDate: "10 Jan 2024",
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
    startDate: "10 Dec 2023",
    finishDate: "10 Jan 2024",
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
    startDate: "10 Dec 2023",
    finishDate: "10 Jan 2024",
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
    startDate: "10 Dec 2023",
    finishDate: "10 Jan 2024",
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
    startDate: "10 Dec 2024",
    finishDate: "10 Jan 2024",
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
    startDate: "10 Dec 2023",
    finishDate: "10 Jan 2024",
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

const InternListTable = () => {
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

export default InternListTable;
