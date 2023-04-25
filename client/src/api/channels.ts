import axios from "axios";
import { API_URL } from ".";

export const fetchAllChannels = async () => {
  const res = await axios.get(`${API_URL}/room/all/`);

  return res.data;
};
