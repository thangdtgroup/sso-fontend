import { useGoogleLogin } from "@react-oauth/google";
import React, { FC, useCallback } from "react";
import { Button, Form, Input, Spin } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import useSessionStorage from "../../hooks/useSessionStorage";
import { FormLoginProps } from "../../api/auth/auth.interface";
import { actions, TStore } from "../../store";
import { useAppDispatch } from "../../hooks/storeHook";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/constant";

const Register: FC = () => {
  const loading = useSelector((state: TStore) => state.auth.loading);
  const [, setRefreshToken] = useSessionStorage<string | null>("__token", null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  const onFinish = useCallback(
    (values: FormLoginProps) => {
      dispatch(actions.auth.registerAction(values));
    },
    [dispatch]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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
                Register
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
