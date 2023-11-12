import { AxiosResponse } from "axios";
import { requestWithoutJwt } from "../request";
import { FormLoginProps, LoginResponse } from "./auth.interface";

export const loginRequest = (
  params: FormLoginProps
): Promise<AxiosResponse<LoginResponse>> => {
  return requestWithoutJwt.post<LoginResponse>("/auth/login", params);
};

export const registerRequest = (
  params: FormLoginProps
): Promise<AxiosResponse<LoginResponse>> => {
  return requestWithoutJwt.post<LoginResponse>("/auth/register", params);
};

export const loginGoogleRequest = (): Promise<AxiosResponse<LoginResponse>> => {
  return requestWithoutJwt.get<LoginResponse>("/auth/google");
};
