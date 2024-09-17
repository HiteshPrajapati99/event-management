import { API_POST, API_RES, API_URL } from "./config";

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): API_RES<{ id: number }> => {
  return API_POST(API_URL.login, { email, password });
};

export const register = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): API_RES<unknown> => {
  return API_POST(API_URL.register, { email, password,  });
};
