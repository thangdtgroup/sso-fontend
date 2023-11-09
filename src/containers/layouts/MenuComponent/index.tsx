import React, { useEffect, useState } from "react";
import {
  QrcodeOutlined,
  ContactsOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { listMenuComponents } from "../../../utils/constants";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("User", "user", <QrcodeOutlined />),
  getItem("Permission", "permission", <AuditOutlined />),
  getItem("Role", "role", <ContactsOutlined />),
];

const MenuComponent: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string>("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    if (window.location.pathname) {
      //selectedKeys
      let pn = window.location.pathname;
      if (pn.slice(-1) === "/") {
        pn = pn.slice(0, pn.length - 1);
      }
      const defaultSelectedkey = pn.length ? pn.slice(1, pn.length) : "";

      //openKeys
      const arr = defaultSelectedkey.split("/");
      const defaultSelectedKeys = listMenuComponents(arr[0]);

      setOpenKeys([defaultSelectedKeys]);
      setSelectedKeys(defaultSelectedkey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <Menu
      selectedKeys={[selectedKeys]}
      openKeys={openKeys}
      mode="inline"
      theme="dark"
      items={items}
      onClick={(value) => {
        setOpenKeys(value?.keyPath);
        setSelectedKeys(value?.key);
        navigate(value?.key);
      }}
      onOpenChange={(e) => {
        const latestOpenKey = e.find((key) => openKeys.indexOf(key) === -1);
        if (!latestOpenKey) {
          const cloneOpenKeys = [...openKeys];
          setOpenKeys(cloneOpenKeys.filter((it) => it === e[0]));
        } else {
          setOpenKeys([...openKeys, ...e]);
        }
      }}
    />
  );
};

export default MenuComponent;
