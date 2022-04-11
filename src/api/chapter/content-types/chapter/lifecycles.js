
const axios = require("axios");
const slugify = require("slugify");

module.exports = {
  async afterCreate(event) {
    console.log(event);
    const { result } = event;

    // do something to the result;
    result.topic &&
      (await axios
        .put(`${process.env.URL}/api/chapters/${result.id}`, {
          data: {
            topic: result.topic.map((item) => {
              return {
                ...item,
                slug: item?.slug || slugify(item?.topicName, { lower: true }),
                subTopic: item.subTopic.map((sub) => {
                  return {
                    ...sub,
                    slug:
                      sub?.slug || slugify(sub.subTopicName, { lower: true }),
                  };
                }),
              };
            }),
          },
        })
        .then((res) => {
          if (res.status === 200) console.log("success");
        })
        .catch((err) => console.log(err)));
  },

  async afterUpdate(event) {
    const { result } = event;
    // do something to the result;
    result.topic &&
      (await axios
        .put(`${process.env.URL}/api/chapters/${result.id}`, {
          data: {
            topic: result.topic.map((item, i) => {
              return {
                ...item,
                topicNumber: `${result?.chapterNumber}.${i + 1}`,
                slug: item?.slug || slugify(item?.topicName, { lower: true }),
                subTopic: item.subTopic.map((sub, j) => {
                  console.log(sub)
                  return {
                    ...sub,
                    subTopicNumber: `${result?.chapterNumber}.${i + 1}.${
                      j + 1
                    }`,
                    slug:
                      sub?.slug || slugify(sub.subTopicName, { lower: true }),
                    section: sub.section.map((val, k) => {
                      return {
                        ...val,
                        serialNumber: `${k + 1}`,
                      };
                    }),
                    videoAndMedia: sub?.videoAndMedia.map((video, l) => {
                      return{
                        ...video,
                        videoUrl: video?.forMedia?.replace(/(\[.*?\])/g, "").replace("(","").replace(")","").replace("!","")
                      }
                    })
                  };
                }),
              };
            }),
          },
        })
        .then((res) => {
          if (res.status === 200) console.log("success");
        })
        .catch((err) => console.log(err.message)));
  },
};
