import {
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Typography } from "antd";
const { Text } = Typography;

const UserAvatar = () => {

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LockOutlined />}>
        Change password
      </Menu.Item>
      <Menu.Item key="2" icon={<UserSwitchOutlined />}>
        User information
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<LogoutOutlined />}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ marginRight: 50 }}>
      <span>
        <Avatar
          icon={<UserOutlined />}
          style={{
            marginRight: "6px",
            marginBottom: 12,
            backgroundColor: "#FF4500",
          }}
        ></Avatar>
        <Dropdown
          arrow={{
            pointAtCenter: true,
          }}
          overlay={menu}
          placement="bottom"
        >
          <span>
            <Text style={{ fontWeight: "bold", cursor: "pointer" }}>Admin</Text>
          </span>
        </Dropdown>
      </span>
    </div>
  );
};

export default UserAvatar;
