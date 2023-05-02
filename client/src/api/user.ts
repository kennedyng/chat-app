import { FormatBoldRounded } from "@mui/icons-material";
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
  profilePic?: any;
}
export const editUserProfile = async (body: ProfileBodyType): Promise<any> => {
  const headers = {
    Authorization: body.token,
    "Content-Type": "multipart/form-data",
  };

  const formData = new FormData();
  formData.append("profile_pic", body.profilePic);
  formData.append("name", body.name);

  const res = await axios.post(`${API_URL}/user/profile/edit`, formData, {
    headers,
  });
  return res.data;
};

// export const createUserProfilePic = async (data: {
//   token: string;
//   profilePic: any;
// }): Promise<any> => {
//   const headers = {
//     "Content-Type": "multipart/form-data",
//     Authorization: data.token,
//   };

//   const formData = new FormData();
//   formData.append("file", data.profilePic);

//   const res = await axios.post(`${API_URL}/user/profile/upload`, formData, {
//     headers,
//   });
//   return res.data;
// };
