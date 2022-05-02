const axios = require("axios");
const slugify = require("slugify");

module.exports = {
  async afterCreate(event) {
    console.log(event);
    const { result } = event;

    const gradeID = result?.subject?.grade?.id;
    const boardID = result?.subject?.grade?.board?.id;
    const gradeRes = await axios.get(
      `${process.env.URL}/api/grades/${gradeID}`
    );
    const boardRes = await axios.get(
      `${process.env.URL}/api/boards/${boardID}`
    );

    // do something to the result;

    try {
      // const res = await axios.post(
      //   "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/chapters/addChapter",
      //   {
      //     name: result?.title,
      //     internalSubjectId: result?.subject?.id,
      //     internalChapterId: result?.id,
      //     index: result?.chapterNumber,
      //     description: "dummy description for test subject chapter-3",
      //   }
      // );
      // console.log(res.data);

      const topicsRes = await axios.put(
        `${process.env.URL}/api/chapters/${result.id}`,
        {
          data: {
            grade: gradeRes?.data?.data,
            board: boardRes?.data?.data,
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
    // do something to the result;
    const gradeID = result?.subject?.grade?.id;
    const boardID = result?.subject?.grade?.board?.id;
    const gradeRes = await axios.get(
      `${process.env.URL}/api/grades/${gradeID}`
    );
    const boardRes = await axios.get(
      `${process.env.URL}/api/boards/${boardID}`
    );

    result.topic &&
      (await axios
        .put(`${process.env.URL}/api/chapters/${result.id}`, {
          data: {
            grade: gradeRes?.data?.data,
            board: boardRes?.data?.data,
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
                    videoAndMedia: sub?.videoAndMedia.map((video) => {
                      return {
                        ...video,
                        videoUrl:
                          video?.videoUrl ||
                          video.forMedia
                            .replace(/(\[.*?\])/g, "")
                            .replace("(", "")
                            .replace(")", "")
                            .replace("!", ""),
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
  },
};
