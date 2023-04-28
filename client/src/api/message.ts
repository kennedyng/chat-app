import axios from "axios";
import { API_URL } from ".";

interface MessageType {
  token: string;
  roomId: string | number;
  message: string;
}

export const addMessage = async (data: MessageType): Promise<any> => {
  const headers = {
    Authorization: data.token,
  };

  const res = await axios.post(
    `${API_URL}/room/message/create`,
    { message: data.message, roomId: data.roomId },
    {
      headers,
    }
  );

  return res.data;
};
