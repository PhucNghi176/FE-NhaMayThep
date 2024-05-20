import React from 'react';
import { Input, DatePicker, Typography } from 'antd';
import { renderStatusSelect } from '../Table/TableDefault';

const modalAddStyle = {
  display: 'flex',
  margin: '15px 0',
};

const inputStyle = {
  width: '200px',
};

const AddModalContent = () => {
  return (
    <>
      <div style={modalAddStyle}>
        <div>
          <Typography.Title level={5}>Project Title </Typography.Title>
          <Input style={inputStyle} />
        </div>
        <div style={{ margin: '0 20px' }}>
          <Typography.Title level={5}>Position</Typography.Title>
          <Input style={inputStyle} />
        </div>
        <div>
          <Typography.Title level={5}>Technology</Typography.Title>
          <Input style={inputStyle} />
        </div>
      </div>

      <div style={modalAddStyle}>
        <div>
          <Typography.Title level={5}>Leader</Typography.Title>
          <Input style={inputStyle} />
        </div>
        <div style={{ margin: '0 20px' }}>
          <Typography.Title level={5}>Sub Leader</Typography.Title>
          <Input style={inputStyle} />
        </div>
        <div>
          <Typography.Title level={5}>Mentor</Typography.Title>
          <Input style={inputStyle} />
        </div>
      </div>

      <div style={modalAddStyle}>
        <div>
          <Typography.Title level={5}>Start</Typography.Title>
          <DatePicker style={inputStyle} />
        </div>
        <div style={{ margin: '0 20px' }}>
          <Typography.Title level={5}>End</Typography.Title>
          <DatePicker style={inputStyle} />
        </div>
        <div>
          <Typography.Title level={5}>Zalo</Typography.Title>
          <Input style={inputStyle} />
        </div>
      </div>

      <div style={{ marginTop: '25px' }}>
        <Typography.Title level={5}>Status</Typography.Title>
        {renderStatusSelect()}
      </div>
    </>
  );
};

export default AddModalContent;
