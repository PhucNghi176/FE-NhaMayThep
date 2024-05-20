import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Select, Space, Avatar, Typography } from "antd";
import ButtonGroup from "antd/es/button/button-group";
const {Title, Text} = Typography;

const cardData = [
    { title: "Card 1", content: "Click to view 1" },
    { title: "Card 2", content: "Click to view 2" },
    { title: "Card 3", content: "Click to view 3" },
    { title: "Card 4", content: "Click to view 4" },
    { title: "Card 5", content: "Click to view 5" },
  ];

  const members = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
    { id: 5, name: "User 5" },
    { id: 6, name: "User 6" },
  ];
const ListZalo = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 20,
                    marginTop: 20,
                }}
            >
                <Select
                    placeholder="Select Filter"
                    style={{ width: "20%", marginRight: 30 }}
                    className="selected"
                    options={[
                        {
                            value: 1,
                            label: "Đạt đã ở đây",
                        },
                    ]}
                ></Select>
            </div>

            <Space size={20} direction="vertical" style={{ width: "100%" }}>
                {cardData.map((card, index) => (
                    <Card
                        key={index}
                        className="default"
                        style={{
                            borderRadius: 30,
                            backgroundColor: "lightgray",
                            margin: "0 30px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    margin: 10,
                                    marginRight: 20,
                                }}
                            >
                                <Space
                                    direction="vertical"
                                    style={{ rowGap: 0, marginRight: 20 }}
                                >
                                    <Avatar.Group
                                        maxCount={2}
                                        style={{
                                            display: "flex",
                                        }}
                                    >
                                        {members.slice(0, 2).map((member) => (
                                            <Avatar
                                                key={member.id}
                                                icon={<UserOutlined />}
                                            />
                                        ))}
                                    </Avatar.Group>

                                    <Avatar.Group
                                        maxCount={1}
                                        style={{
                                            display: "flex",
                                        }}
                                    >
                                        {members.slice(2).map((member) => (
                                            <Avatar
                                                key={member.id}
                                                icon={<UserOutlined />}
                                            />
                                        ))}
                                    </Avatar.Group>
                                </Space>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Title level={4} style={{ fontWeight: 800 }}>
                                        {card.title}
                                    </Title>
                                    <Text style={{ fontWeight: 300 }}>
                                        {" "}
                                        {card.content}
                                    </Text>
                                </div>
                            </div>
                            <div>
                                <MoreOutlined 
                                    style={{
                                        margin: 30,
                                        fontSize: 25,
                                        fontWeight: 800,
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                ))}
                <div
                    className="buttonContainer"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingRight: "5px",
                        paddingBottom: "10px",
                    }}
                >
                    <ButtonGroup />
                </div>
            </Space>
        </div>
    )
}
export default ListZalo;