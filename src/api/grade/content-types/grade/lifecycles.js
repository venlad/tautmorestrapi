const axios = require("axios");
const { uuid } = require("uuidv4");

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    try {
      const refSlug = await axios.put(
        `${process.env.URL}/api/grades/${result.id}`,
        {
          data: {
            uid: uuid(),
          },
        }
      );
      console.log(refSlug.data);

      const res = await axios.post(
        "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/class/addClass",
        {
          name: result?.title,
          internalGradeId: result?.uid,
          internalBoardId: result?.board?.uid,
          division: [],
          description: "desc",
          school_id: null,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async afterUpdate(event) {
    const { result } = event;

    try {
      const res = await axios.post(
        "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/class/editClass",
        {
          internalGradeId: result?.uid,
          class: {
            name: result?.title,
            internalBoardId: result?.board?.uid,
            description: "hi",
            division: [],
            school: null,
          },
        }
      );
      console.log(res.data);

      const checkPublished = result?.publishedAt;
      if (checkPublished !== null) {
        const publishRes = await axios.post(
          "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/class/changeClassStatus",
          {
            internalGradeId: result?.uid,
            status: true,
          }
        );
        console.log(publishRes.data);
      } else if (checkPublished === null) {
        const publishRes = await axios.post(
          "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/class/changeClassStatus",
          {
            internalGradeId: result?.uid,
            status: false,
          }
        );
        console.log(publishRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async afterDelete(event) {
    const { result } = event;
    console.log(result);

    try {
      const res = await axios.post(
        "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/class/deleteClass",
        {
          internalGradeId: result?.uid,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  },
};
