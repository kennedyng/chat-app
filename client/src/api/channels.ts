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
  return await axios.post(`${API_URL}/room/create`, body, { headers });
};

interface JoinChannelType {
  token: string;
  roomId: string | number;
}

export const joinChannel = async (data: JoinChannelType) => {
  const headers = {
    Authorization: data.token,
  };

  return await axios.post(
    `${API_URL}/room/join/${data.roomId}`,
    {},
    {
      headers,
    }
  );
};
interface ChannelDataType {
  roomId: string | number;
  token: string;
}

export const getChannelData = async (data: ChannelDataType) => {
  const headers = {
    Authorization: data.token,
  };

  const res = await axios.get(`${API_URL}/room/one/${data.roomId}`, {
    headers,
  });
  return res.data;
};
