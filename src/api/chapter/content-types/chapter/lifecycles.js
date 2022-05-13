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

  // async beforeUpdate(event) {
  //   const { data } = await axios.get(
  //     `${process.env.URL}/api/chapters/${event?.params?.where?.id}?populate=*`
  //   );
  //   const topicLength = data?.data?.attributes?.topic?.length + 1;

  //   if (topicLength < event?.params?.data?.topic?.length) {
  //     throw new ForbiddenError("Save One Topic First");
  //   }
  // },

  async afterUpdate(event) {
    const { result } = event;

    const { data } = await axios.get(
      `${process.env.URL}/api/chapters/${result?.id}?populate=*`
    );
    const topicUid = uuid();

    try {
      //for chapter
      // const res = await axios.post(
      //   "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/editChapter",
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

      // const checkPublished = result?.publishedAt;
      // if (checkPublished !== null) {
      //   const publishRes = await axios.post(
      //     "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/change-chapter-status",
      //     {
      //       internalChapterId: result?.uid,
      //       status: true,
      //     }
      //   );
      //   console.log(publishRes.data);
      // } else if (checkPublished === null) {
      //   const publishRes = await axios.post(
      //     "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/change-chapter-status",
      //     {
      //       internalChapterId: result?.uid,
      //       status: false,
      //     }
      //   );
      //   console.log(publishRes.data);
      // }

      //to create topic
      const findTopic = data?.data?.attributes?.topic.find(
        (item) => item?.uid === null
      );

      console.log(
        data?.data?.attributes?.topic.find((item) => item?.uid === null)
      );

      if (findTopic?.uid === null) {
        const res = await axios.post(
          "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/concepts/addConcept",
          {
            name: findTopic?.topicName,
            internalConceptId: topicUid,
            internalSubjectId: result?.subject?.uid,
            internalChapterId: result?.uid,
            index: result?.chapterNumber,
            description: "dummy description for test subject chapter-3",
          }
        );

        console.log(res.data);

        result.topic &&
          (await axios
            .put(`${process.env.URL}/api/chapters/${result.id}`, {
              data: {
                topic: result.topic.map((item, i) => {
                  return {
                    ...item,
                    topicNumber: `${result?.chapterNumber}.${i + 1}`,
                    slug:
                      item?.slug || slugify(item?.topicName, { lower: true }),
                    uid: item?.uid || topicUid,
                    subTopic: item.subTopic.map((sub, j) => {
                      return {
                        ...sub,
                        subTopicNumber: `${result?.chapterNumber}.${i + 1}.${
                          j + 1
                        }`,
                        slug:
                          sub?.slug ||
                          slugify(sub.subTopicName, { lower: true }),
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

        console.log("ADDED");
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
