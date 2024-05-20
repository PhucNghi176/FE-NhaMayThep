import { Avatar, Button, Card, Col, Modal, Row, Typography } from "antd";
import React, { useState } from "react";
import UserAvatar from "../../components/Header/UserAvatar";
import { FolderOutlined } from "@ant-design/icons";
import PositionModal from "../../components/Modal/positionModal";

const { Title, Text } = Typography;
const cardData = [
  {
    title: "Card 1 Title",
    position: "position for Card 1",
    tech: "BE,FE",
    groupZalo: 1,
    startDate: "05 Jan 2023",
    endDate: "05 Jan 2023",
    ava: (
      <Avatar.Group maxCount={2}>
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
      </Avatar.Group>
    ),
  },
  {
    title: "Card 1 Title",
    position: "position for Card 1",
    tech: "BE,FE",
    groupZalo: 1,
    startDate: "05 Jan 2023",
    endDate: "05 Jan 2023",
    ava: (
      <Avatar.Group maxCount={2}>
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
      </Avatar.Group>
    ),
  },
  {
    title: "Card 1 Title",
    position: "position for Card 1",
    tech: "BE,FE",
    groupZalo: 1,
    startDate: "05 Jan 2023",
    endDate: "05 Jan 2023",
    ava: (
      <Avatar.Group maxCount={2}>
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
      </Avatar.Group>
    ),
  },
  {
    title: "Card 1 Title",
    position: "position for Card 1",
    tech: "BE,FE",

    groupZalo: 1,
    startDate: "05 Jan 2023",
    endDate: "05 Jan 2023",
    ava: (
      <Avatar.Group maxCount={2}>
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
      </Avatar.Group>
    ),
  },
  {
    title: "Card 1 Title",
    position: "position for Card 1",
    tech: "BE,FE",

    groupZalo: 1,
    startDate: "05 Jan 2023",
    endDate: "05 Jan 2023",
    ava: (
      <Avatar.Group maxCount={2}>
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
      </Avatar.Group>
    ),
  },
  {
    title: "Card 1 Title",
    position: "position for Card 1",
    tech: "BE,FE",

    groupZalo: 1,
    startDate: "05 Jan 2023",
    endDate: "05 Jan 2023",
    ava: (
      <Avatar.Group maxCount={2}>
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
        <Avatar icon={<UserAvatar />} />
      </Avatar.Group>
    ),
  },
];


const PositionManager = () => {
    
const [isModalOpen, setIsModalOpen] = useState(false);

const handleShowModal = () => setIsModalOpen(true);
const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div>
      <Row gutter={[20, 18]}>
        {cardData.map((card, index) => (
          <Col span={8} key={index}>
            <Card title={card.title} bordered={false} hoverable>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Row style={{ margin: 4 }}>
                  <Title level={5} style={{ marginRight: 4 }}>
                    Position:{" "}
                  </Title>
                  <Text>{card.position}</Text>
                </Row>
                <Row style={{ margin: 4 }}>
                  <Title level={5} style={{ marginRight: 4 }}>
                    Technology:
                  </Title>{" "}
                  <Text style={{ marginTop: 2 }}>{card.tech}</Text>{" "}
                </Row>
                <Row style={{ margin: 4 }}>
                  <Title level={5} style={{ marginRight: 4 }}>
                    Zalo:{" "}
                  </Title>{" "}
                  <Text style={{ marginTop: 1 }}>{card.groupZalo}</Text>
                </Row>

                <Row gutter={70} style={{ marginTop: 20 }}>
                  <Col span={12}>{card.ava}</Col>
                  <Col span={12}> 
                    <Button type="text" icon={<FolderOutlined />} onClick={handleShowModal}>
                      More Details
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <div>
      <Modal
        title="More Details"
        open={isModalOpen}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        width={1000}
      >
        <PositionModal/>
      </Modal>
      </div>
    </div>
  );
};

export default PositionManager;
