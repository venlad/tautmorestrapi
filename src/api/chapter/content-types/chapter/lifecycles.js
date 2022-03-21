const axios = require("axios");
const slugify = require("slugify");

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // do something to the result;
    await axios
      .put(`http://localhost:1337/api/chapters/${result.id}`, {
        data: {
          topic: result.topic.map((item) => {
            return {
              ...item,
              slug: item?.slug || slugify(item?.topicName, { lower: true }),
              subTopic: item.subTopic.map((sub) => {
                return {
                  ...sub,
                  slug: sub?.slug || slugify(sub.subTopicName, { lower: true }),
                };
              }),
            };
          }),
        },
      })
      .then((res) => {
        if (res.status === 200) console.log("success");
      })
      .catch((err) => console.log(err.message));
  },

  async afterUpdate(event) {
    const { result } = event;

    // do something to the result;
    await axios
      .put(`http://localhost:1337/api/chapters/${result.id}`, {
        data: {
          topic: result.topic.map((item) => {
            return {
              ...item,
              slug: item?.slug || slugify(item?.topicName, { lower: true }),
              subTopic: item.subTopic.map((sub) => {
                return {
                  ...sub,
                  slug: sub?.slug || slugify(sub.subTopicName, { lower: true }),
                };
              }),
            };
          }),
        },
      })
      .then((res) => {
        if (res.status === 200) console.log("success");
      })
      .catch((err) => console.log(err.message));
  },
};
