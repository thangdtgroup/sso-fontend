import { useCallback, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  message,
  Space,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import MenuComponent from "./MenuComponent";
import Navbar from "./navbar/navbar";
import { actions, TStore, useSelector } from "../../store";
import { useAppDispatch } from "../../hooks/storeHook";
import useSessionStorage from "../../hooks/useSessionStorage";
const Default = () => {
  const userInfo = useSelector((state: TStore) => state.auth.userInfo);
  const [refreshToken, setRefreshToken] = useSessionStorage<string | null>(
    "__token",
    null
  );

  const [collapsed, setcollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChangeCollapsed = useCallback(() => {
    setcollapsed(!collapsed);
  }, [collapsed]);
  const items: MenuProps["items"] = useMemo(() => {
    return [
      {
        label: <p className="text-xl">{userInfo?.username || ""}</p>,
        key: "0",
      },
      {
        type: "divider",
      },
      {
        label: "User Profile",
        key: "1",
      },
      {
        label: "Logout",
        key: "2",
      },
    ];
  }, [userInfo?.username]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "2") {
      setRefreshToken("");
      dispatch(actions.auth.logoutAction());
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <Layout className="h-[100vh]">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <MenuComponent />
        </Sider>
        <Layout>
          <Header className="bg-[#fff] pl-0 py-0 pr-5 flex justify-between items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => handleChangeCollapsed()}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Dropdown menu={menuProps} trigger={["click"]}>
              <div className="flex gap-2 items-center cursor-pointer">
                <p className="font-bold">{userInfo?.username}</p>
                <Avatar
                  className="cus"
                  // onClick={() => e.preventDefault()}
                  size={40}
                  icon={<UserOutlined />}
                />
              </div>
            </Dropdown>
          </Header>
          <Content className="my-6 mx-4 p-6 min-h-[280px] bg-[#fff]">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Default;
