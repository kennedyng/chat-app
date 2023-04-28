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
