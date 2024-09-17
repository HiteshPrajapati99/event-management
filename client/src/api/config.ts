import Axios, { AxiosError } from "axios";

const baseURL = "http://localhost:3000/api/";

const imageURL = "http://localhost:3000/";

export const API_URL = {
  baseURL,
  imageURL,

  login: "user/login",
  register: "user/register",

  createEvent: "event/create",
  getAllEvent: "event/get-all",
  updateEvent: "event/update",
};

const axios = Axios.create({ baseURL });

export type API_RES<T> = Promise<{
  s: boolean;
  m: string;
  r: T extends undefined ? any : T;
}>;

export const API_POST = async function (
  url: string,
  formData: FormData | Record<string, unknown>,
  params?: Record<string, unknown>
) {
  try {
    const userId = localStorage.getItem("auth_user") || "";

    const { data } = await axios.post(url, formData, {
      headers: { userId },
      params: params,
    });

    return data;
  } catch (error) {
    return {
      s: 0,
      m: "Invalid Token",
    };
  }
};

export const API_GET = async function (
  url: string,
  params?: Record<string, unknown>
) {
  try {
    const userId = localStorage.getItem("auth_user") || "";

    const { data } = await axios.get(url, {
      params,
      headers: { userId },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return (
        error.response?.data || {
          s: 0,
          m: "opps! something went wrong.",
        }
      );
    } else {
      return {
        s: 0,
        m: "opps! something went wrong.",
      };
    }
  }
};
