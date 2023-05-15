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
  const createdDays = new Set();

  data.map((message) =>
    createdDays.add(moment(message.createdAt).format("MMM Do YYYY"))
  );

  const groupedData = Array.from(createdDays).map((createdTime) => {
    return {
      createdTime: createdTime,
      messages: data.filter(
        (msg) => moment(msg.createdAt).format("MMM Do YYYY") === createdTime
      ),
    };
  });

  return groupedData;
};

export default groupByCreatedTime;
