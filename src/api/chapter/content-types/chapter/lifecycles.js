const axios = require("axios");

const STRAPI_URL = "http://localhost:1337";

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text

  return str;
}

module.exports = {
  async afterCreate(event) {
    const { result, params } = event;

    // do something to the result;
    await axios
      .put(`http://localhost:1337/api/chapters/${result.id}`, {
        data: {
          topic: result.topic.map((item) => {
            return {
              topicName: item?.topicName,
              topicDescription: item?.topicDescription,
              slug: string_to_slug(item.topicName),
              subTopic: item.subTopic.map((sub) => {
                return {
                  subTopicName: sub?.subTopicName,
                  subTopicDescription: sub?.subTopicDescription,
                  slug: string_to_slug(sub.subTopicName),
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
    const { result, params } = event;

    // do something to the result;
    await axios
      .put(`http://localhost:1337/api/chapters/${result.id}`, {
        data: {
          topic: result.topic.map((item) => {
            return {
              topicName: item?.topicName,
              topicDescription: item?.topicDescription,
              slug: string_to_slug(item.topicName),
              subTopic: item.subTopic.map((sub) => {
                return {
                  subTopicName: sub?.subTopicName,
                  subTopicDescription: sub?.subTopicDescription,
                  slug: string_to_slug(sub.subTopicName),
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
