import { useGoogleLogin } from "@react-oauth/google";
import React, { FC, useCallback } from "react";
import { Button, Form, Input, Spin } from "antd";
import axios from "axios";
import IcLogoGoogle from "../../assets/images/icons/ic_logo_google.svg";
import IcLogoMicrosoft from "../../assets/images/icons/ic_logo_microsoft.svg";
import IcLogoGithub from "../../assets/images/icons/ic_logo_github.svg";
import IcLogoApple from "../../assets/images/icons/ic_logo_apple.svg";
import IcLogoPasskey from "../../assets/images/icons/ic_logo_passkey.svg";
import { useDispatch, useSelector } from "react-redux";

import useSessionStorage from "../../hooks/useSessionStorage";
import { FormLoginProps } from "../../api/auth/auth.interface";
import { actions, TStore } from "../../store";
import { useAppDispatch } from "../../hooks/storeHook";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/constant";
import GoogleLoginAuth from "../auth/GoogleAuth";

const Login: FC = () => {
  const loading = useSelector((state: TStore) => state.auth.loading);
  const navigate = useNavigate();
  const [, setRefreshToken] = useSessionStorage<string | null>("__token", null);
  const dispatch = useAppDispatch();
  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse.access_token);
      // const userInfo = await axios
      //   .get("https://www.googleapis.com/oauth2/v3/userinfo", {
      //     headers: { Authorization: `Bearer ${codeResponse.access_token}` },
      //   })
      //   .then((res) => res.data);

      // console.log(userInfo);
      // axios
      //   .post('http://localhost:8000/api/v1/auth/login-google', {
      //     token: codeResponse.expires_in,
      //   })
      //   .then(function (response) {
      //     localStorage.setItem('AuthData', JSON.stringify(response));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  const onFinish = useCallback(
    (values: FormLoginProps) => {
      dispatch(
        actions.auth.loginAction({
          loginInfo: values,
          setRefreshToken,
        })
      );
    },
    [dispatch, setRefreshToken]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const navigateLink = useCallback(() => {
    navigate(ROUTES.register);
  }, [navigate]);

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-[100vh]">
          <Spin />
        </div>
      )}
      {!loading && (
        <div className="flex justify-center">
          <div className="flex max-w-xs m-20 justify-center flex-col gap-[0.65rem] w-full">
            <Form
              className="flex justify-center flex-col"
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
                className="max-w-full bg-[#f6f4f2]"
              >
                <Input
                  className="bg-[#f6f4f2] px-[0.75rem] py-[0.5rem] h-10"
                  placeholder="Enter your email..."
                />
              </Form.Item>
              <Form.Item<FieldType>
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                className="max-w-full bg-[#f6f4f2]"
              >
                <Input.Password
                  className="bg-[#f6f4f2] px-[0.75rem] py-[0.5rem] h-10"
                  placeholder="Enter your password..."
                />
              </Form.Item>

              <Button
                className="flex justify-center items-center px-[0.75rem] py-[0.5rem] bg-[#474645] text-white h-10"
                htmlType="submit"
              >
                Sign in
              </Button>
            </Form>

            <span className="flex justify-center items-center text-[#666] text-xs my-2">
              OR
            </span>
            <Button
              className="flex justify-center items-center px-[0.75rem] py-[0.5rem] h-10"
              onClick={() => navigateLink()}
            >
              Register
            </Button>
            <Button
              className="flex justify-center items-center shadow-3xl border-1 border-[#d8d6d4] border-solid px-[0.75rem] py-[0.5rem] h-10"
              onClick={() => googleLogin()}
            >
              <img className="mr-[0.75rem]" src={IcLogoGoogle} alt="" />
              <span className="text-sm">Sign in with Google</span>
            </Button>
            <Button
              className="flex justify-center items-center shadow-3xl border-1 border-[#d8d6d4] border-solid px-[0.75rem] py-[0.5rem] h-10"
              onClick={() => googleLogin()}
            >
              <img className="mr-[0.75rem]" src={IcLogoMicrosoft} alt="" />
              <span className="text-sm">Sign in with Microsoft</span>
            </Button>
            <Button
              className="flex justify-center items-center shadow-3xl border-1 border-[#d8d6d4] border-solid px-[0.75rem] py-[0.5rem] h-10"
              onClick={() => googleLogin()}
            >
              <img className="mr-[0.75rem]" src={IcLogoGithub} alt="" />
              <span className="text-sm">Sign in with Github</span>
            </Button>
            <Button
              className="flex justify-center items-center shadow-3xl border-1 border-[#d8d6d4] border-solid px-[0.75rem] py-[0.5rem] h-10"
              onClick={() => googleLogin()}
            >
              <img className="mr-[0.75rem]" src={IcLogoApple} alt="" />
              <span className="text-sm">Sign in with Apple</span>
            </Button>
            <Button
              className="flex justify-center items-center shadow-3xl border-1 border-[#d8d6d4] border-solid px-[0.75rem] py-[0.5rem] h-10"
              onClick={() => googleLogin()}
            >
              <img className="mr-[0.75rem]" src={IcLogoPasskey} alt="" />
              <span className="text-sm">Sign in with a passkey</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
