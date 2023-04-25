import axios from "axios";
const API_URL: string = import.meta.env.VITE_API_URL;

interface bodyType {
  email: string;
  password: string;
}

export const loginUser = (body: bodyType) =>
  axios.post(`http://localhost:3000/user/login/`, body);
