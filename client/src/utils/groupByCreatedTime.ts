import moment from "moment";

interface DataType {
  User: {
    profile: {
      id?: number | string;
      img_url?: string | null;
      name?: string;
      userId: number | null;
      completed: boolean;
    };
  };

  createdAt: string;
  message: string;
  roomId?: number;
  userId?: number;
}

const groupByCreatedTime = (data: DataType[]) => {
  const chats = new Map();
  data.map((chat: DataType) => {
    const createdTime = moment(chat.createdAt).format("MMM Do YYYY");
    if (chats.has(createdTime)) {
      chats.set(createdTime, [...chats.get(createdTime), chat]);
    } else {
      chats.set(createdTime, [chat]);
    }
  });

  return Array.from(chats);
};

export default groupByCreatedTime;
