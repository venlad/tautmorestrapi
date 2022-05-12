const axios = require("axios");
const slugify = require("slugify");
const { uuid } = require("uuidv4");
const { ForbiddenError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate(event) {
    console.log(event.params.data.topic);

    if (event?.params?.data?.topic?.length > 0) {
      throw new ForbiddenError("Save the chapter");
    }
  },
  async afterCreate(event) {
    const { result } = event;

    try {
      console.log("running");
      const topicsRes = await axios.put(
        `${process.env.URL}/api/chapters/${result.id}`,
        {
          data: {
            uid: uuid(),
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

      // if (result?.topic.length > 0) {
      //   throw new Error("Save chapter first");
      // }

      // const res = await axios.post(
      //   "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/addChapter",
      //   {
      //     name: result?.title,
      //     internalSubjectId: result?.subject?.uid,
      //     internalChapterId: result?.uid,
      //     index: result?.chapterNumber,
      //     description: "dummy description for test subject chapter-3",
      //     moduleType: result?.module?.name,
      //   }
      // );
      // console.log(res.data);

      console.log(topicsRes);
    } catch (error) {
      console.log(error);
    }
  },

  async afterUpdate(event) {
    const { result } = event;

    try {
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

      const res = await axios.post(
        "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/editChapter",
        {
          name: result?.title,
          internalSubjectId: result?.subject?.uid,
          internalChapterId: result?.uid,
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
            internalChapterId: result?.uid,
            status: true,
          }
        );
        console.log(publishRes.data);
      } else if (checkPublished === null) {
        const publishRes = await axios.post(
          "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/change-chapter-status",
          {
            internalChapterId: result?.uid,
            status: false,
          }
        );
        console.log(publishRes.data);
      }
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
          internalChapterId: result?.uid,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  },
};
