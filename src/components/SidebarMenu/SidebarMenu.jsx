import { Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import PropTypes from 'prop-types';
import "./sidebarMenu.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Link from "antd/es/typography/Link";

const SidebarMenu = ({ items }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const initialSelectedKeys = [currentPath];
  const allKeys = items.reduce((keys, item) => {
    // Thêm key của item vào mảng keys
    keys.push(item.key);
    // Nếu item có children, thêm keys của các children vào mảng keys
    if (item.children) {
      keys.push(...item.children.map((child) => child.key));
    }
    return keys;
  }, []);
  const initialOpenKeys = allKeys.filter((key) => currentPath.startsWith(key));

  const [selectedKeys, setSelectedKeys] = useState(initialSelectedKeys);
  const [openSubMenuKeys, setOpenSubMenuKeys] = useState(allKeys);

  useEffect(() => {
    const parentKeys = items.map((item) => item.key);
    setOpenSubMenuKeys([...initialOpenKeys, ...parentKeys]);
    setOpenSubMenuKeys(allKeys);

    // Lấy giá trị đã lưu trong localStorage khi component được mount
    const storedSelectedKeys = localStorage.getItem('selectedKeys');
    console.log('storedSelectedKeys:', storedSelectedKeys);

    if (storedSelectedKeys) {
      setSelectedKeys([storedSelectedKeys]);
    }
  }, []);

  const handleMenuClick = ({ key }) => {
    setSelectedKeys([key]);
    localStorage.setItem('selectedKeys', key);
    navigate(key);
  };

  const handleSubMenuOpenChange = (keys) => {
    setOpenSubMenuKeys(keys);
  };

  return (
    <>
      <Menu
        className="Menu custom-sidebar-menu"
        onClick={handleMenuClick}
        selectedKeys={selectedKeys}
        defaultSelectedKeys={['dashboard']}
        openKeys={openSubMenuKeys}
        onOpenChange={handleSubMenuOpenChange}
        mode="inline"
        items={items}

      >
        {items.map((item) =>
          // Kiểm tra xem nó có Menu con trong mảng items không
          item.children ? (
            // Nếu có Menu con, đoạn code này sẽ tạo thành một SubMenu
            // đoạn code lại sử dụng map để lặp qua các mục menu con 
            // và tạo các thành phần Menu.Item cho từng mục menu con.
            <SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child) => (

                <Menu.Item key={child.key}>
                  <Link to={child.key}>{child.label}</Link>
                </Menu.Item>

              ))}
            </SubMenu>
          ) : (
            //Nếu mục menu không có menu phụ, đoạn code sẽ tạo một thành phần Menu.Item đơn lẻ.
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>{item.label}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </>
  );
};

SidebarMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default SidebarMenu;
