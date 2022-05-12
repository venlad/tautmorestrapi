const axios = require("axios");
const slugify = require("slugify");

module.exports = {
  async afterCreate(event) {
    console.log(event);
    const { result } = event;

    try {
      const res = await axios.post(
        "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/addChapter",
        {
          name: result?.title,
          internalSubjectId: result?.subject?.id,
          internalChapterId: result?.id,
          index: result?.chapterNumber,
          description: "dummy description for test subject chapter-3",
          moduleType: result?.module?.name,
        }
      );
      console.log(res.data);

      const topicsRes = await axios.put(
        `${process.env.URL}/api/chapters/${result.id}`,
        {
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
        }
      );

      console.log(topicsRes);
    } catch (error) {
      console.log(error);
    }
  },

  async afterUpdate(event) {
    const { result } = event;

    try {
      const res = await axios.post(
        "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/editChapter",
        {
          name: result?.title,
          internalSubjectId: result?.subject?.id,
          internalChapterId: result?.id,
          index: result?.chapterNumber,
          description: "dummy description for test subject chapter-3",
          moduleType: result?.module?.name,
        }
      );
      console.log(res.data);

      const checkPublished = result?.publishedAt;
      if (checkPublished !== null) {
        const publishRes = await axios.post(
          "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/change-chapter-status",
          {
            internalChapterId: result?.id,
            status: true,
          }
        );
        console.log(publishRes.data);
      } else if (checkPublished === null) {
        const publishRes = await axios.post(
          "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/change-chapter-status",
          {
            internalChapterId: result?.id,
            status: false,
          }
        );
        console.log(publishRes.data);
      }

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
    } catch (error) {
      console.log(error.message);
    }
  },

  async afterDelete(event) {
    const { result } = event;

    try {
      const res = await axios.post(
        "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/delete-chapter",
        {
          internalChapterId: result?.id,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  },
};
