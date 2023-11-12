import { useGoogleLogin } from "@react-oauth/google";
import React, { FC, useCallback, useEffect } from "react";
import { Button, Form, Input, Spin } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import useSessionStorage from "../../hooks/useSessionStorage";
import { FormLoginProps } from "../../api/auth/auth.interface";
import { actions, TStore } from "../../store";
import { useAppDispatch } from "../../hooks/storeHook";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/constant";
import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";
const Refreshed: FC = () => {
  const loading = useSelector((state: TStore) => state.auth.loading);
  const [, setRefreshToken] = useSessionStorage<string | null>("__token", null);
  const navigate = useNavigate();
  const [cookies] = useCookies();
  useEffect(() => {
    console.log(cookies.user);
    if (cookies.token && cookies.user && cookies.exp) {
      window.sessionStorage.setItem("expireTime", JSON.stringify(cookies.exp));
      window.sessionStorage.setItem("userInfo", JSON.stringify(cookies.user));
      setRefreshToken(cookies.token);
      navigate(ROUTES.home);
    } else {
      navigate(ROUTES.login);
    }
  }, [cookies, navigate, setRefreshToken]);
  return <></>;
};

export default Refreshed;
