import axios from "axios";
import { API_URL } from ".";

interface bodyType {
  email: string;
  password: string;
}

export const loginUser = (body: bodyType) =>
  axios.post(`${API_URL}/user/login/`, body);
