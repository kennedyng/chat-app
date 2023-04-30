import axios from "axios";
import { API_URL } from ".";

export interface bodyType {
  email: string;
  password: string;
}

export const loginUser = async (body: bodyType): Promise<any> => {
  const res = await axios.post(`${API_URL}/user/login/`, body);
  return res.data;
};

export const registerUser = async (body: bodyType): Promise<any> => {
  const res = await axios.post(`${API_URL}/user/register/`, body);
  return res.data;
};

export const getUserProfile = async (token: string): Promise<any> => {
  const headers = {
    Authorization: token,
  };

  const res = await axios.get(`${API_URL}/user/profile`, {
    headers,
  });

  return res.data;
};
interface ProfileBodyType {
  token: string;
  name: string;
  img_url?: string;
}
export const editUserProfile = async (body: ProfileBodyType): Promise<any> => {
  const headers = {
    Authorization: body.token,
  };

  const res = await axios.patch(`${API_URL}/user/profile/edit`, body, {
    headers,
  });
  return res.data;
};
