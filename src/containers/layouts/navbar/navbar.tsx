import { MenuFoldOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { FC, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/storeHook";
import useScreenDetect from "../../../hooks/useScreenDetect";
import useSessionStorage from "../../../hooks/useSessionStorage";
import { actions } from "../../../store";
import classes from "./navbar.module.scss";
import Logo from "../../../assets/images/images.png";
interface Props {
  handleChangeCollapsed?: () => void;
}

const Navbar: FC<Props> = ({ handleChangeCollapsed }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentWidthScreen } = useScreenDetect();
  const [refreshToken, setRefreshToken] = useSessionStorage<string | null>(
    "__token",
    null
  );

  const handleLogout = useCallback(async () => {
    setRefreshToken("");
    dispatch(actions.auth.logoutAction());
  }, [dispatch, setRefreshToken]);

  const renderUserMenu = useMemo(() => {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <Link style={{ textDecoration: "none" }} to={"user-profile"}>
            My Profile
          </Link>
        ),
      },
      {
        key: "2",
        label: <div onClick={handleLogout}>Logout</div>,
      },
    ];
    if (!refreshToken) {
      return null;
    }

    return (
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <img className="w-3 h-3 rounded-full object-cover" src={""} alt="" />
      </Dropdown>
    );
  }, [handleLogout, refreshToken]);

  const handleChangeCollapsedStart = useCallback(() => {
    if (currentWidthScreen < 1200 && handleChangeCollapsed) {
      handleChangeCollapsed();
    }
  }, [currentWidthScreen, handleChangeCollapsed]);

  return (
    <div className="flex items-center justify-between fixed h-16 top-0 left-0 right-0 z-10 bg-[#fff]">
      <div className={classes.logo} onClick={() => navigate("/")}>
        <img src={""} alt="logo" />
      </div>
      <div className={classes.layoutPageHeaderMain}>
        <MenuFoldOutlined
          className={classes.iconExpandMenu}
          onClick={handleChangeCollapsedStart}
        />
        <div className="flex items-center">
          {/* <Select options={languageOptions} onChange={handleChange} /> */}
          {renderUserMenu}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
