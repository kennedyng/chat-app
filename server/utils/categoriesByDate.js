const moment = require("moment");

module.exports = {
  categoriesByDate: (data) => {
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
  },
};
