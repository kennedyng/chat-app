import axios from "axios";
import { API_URL } from ".";

export const fetchAllChannels = async () => {
  const res = await axios.get(`${API_URL}/room/all/`);
  return res.data;
};

interface ChannelType {
  name: string;
  description: string;
  id: string;
  token: string;
}

export const createChannel = async (data: ChannelType) => {
  const headers = {
    Authorization: data.token,
  };

  const body = {
    name: data.name,
    description: data.description,
  };
  await axios.post(`${API_URL}/room/create`, body, { headers });
};
