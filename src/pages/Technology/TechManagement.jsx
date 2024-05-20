import React, { useState } from 'react';
import { Tabs, Card, Col, Row, Button, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import QuestionModalContent from '../../components/Modal/questionModalContent';

const { TabPane } = Tabs;



const TechManagement = () => {
    
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleEditOk = () => {
    setIsEditModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };
  const onChange = (key) => {
    console.log(key);
  };
  
  const items = [
    { key: '1', label: 'Tab 1' },
    { key: '2', label: 'Tab 2' },
    { key: '3', label: 'Tab 3' },
  ];
  
  const generateCards = (tabKey) => (
      [1, 2, 3].map((cardKey) => (
        <Col span={8} key={`col-${tabKey}-${cardKey}`}>
          <Card key={`card-${tabKey}-${cardKey}`} title={`Card ${cardKey}`} hoverable>
            <Button style={{ float: 'right' }} type='text' icon={<QuestionCircleOutlined />} onClick={showEditModal}>Show question</Button>
          </Card>
        </Col>
      ))
    );
    
    const updatedItems = items.map((item) => ({
      ...item,
      children: (
        <Row key={`row-${item.key}`} gutter={16}>
          {generateCards(item.key)}
        </Row>
      ),
    }));
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        {updatedItems.map((item) => (
          <TabPane key={item.key} tab={item.label}>
            {item.children}
          </TabPane>
        ))}
      </Tabs>
      <div className="questionModal">
        <Modal
          open={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
          width={720}
        >
          <QuestionModalContent/>
        </Modal>
      </div>
    </div>
  );
};

export default TechManagement;
