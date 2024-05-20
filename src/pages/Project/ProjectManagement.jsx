import { Avatar, Button, Card, Col, Modal, Row, Typography } from "antd";
const { Title, Text } = Typography;

import UserAvatar from "../../components/Header/UserAvatar";
import { FolderOutlined, PlusOutlined } from "@ant-design/icons";
import SearchTable from "../../components/SearchTable/searchTable";
import { useState } from "react";
import AddModalContent from "../../components/Modal/addModalContent";

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

const ProjectManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <SearchTable />
        </div>
        <div>
          <Button
            size="small"
            className="addBtn"
            type="primary"
            icon={<PlusOutlined />}
            style={{marginBottom:'10px'}}
            onClick={showModal}
          >
            Add new project
          </Button>
        </div>
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
                  <Row style={{ lineHeight: 2, margin: 4 }}>
                    <Title level={5} style={{ margin: "4px 4px 4px 0" }}>
                      Leader:
                    </Title>
                    <Avatar
                      icon={<UserAvatar />}
                      style={{ justifyContent: "center" }}
                    ></Avatar>
                  </Row>
                  <Row style={{ lineHeight: 2, margin: 4 }}>
                    <Title level={5} style={{ margin: "4px 4px 4px 0" }}>
                      Mentor:
                    </Title>
                    <Avatar icon={<UserAvatar />}></Avatar>
                  </Row>
                  <Row style={{ margin: 4 }}>
                    <Title level={5} style={{ marginRight: 4 }}>
                      Zalo:{" "}
                    </Title>{" "}
                    <Text style={{ marginTop: 1 }}>{card.groupZalo}</Text>
                  </Row>

                  <Row gutter={50}>
                    <Col span={12} style={{ color: "green" }}>
                      Start date: {card.startDate}
                    </Col>
                    <Col span={12} style={{ color: "red" }}>
                      End date: {card.endDate}
                    </Col>
                  </Row>

                  <Row style={{ marginTop: 20 }}>
                    <Col span={12}>{card.ava}</Col>
                    <Col span={12}>
                      <Button
                        style={{ float: "right" }}
                        type="text"
                        icon={<FolderOutlined />}
                      >
                        14 issues
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="addModal">
          <Modal
            title="Add a project"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={690}
          >
            <AddModalContent />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ProjectManagement;
