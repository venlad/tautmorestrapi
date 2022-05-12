const axios = require("axios");
const slugify = require("slugify");
const { uuid } = require("uuidv4");

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      const resSlug = await axios.put(
        `${process.env.URL}/api/subjects/${result.id}`,
        {
          data: {
            uid: uuid(),
          },
        }
      );
      console.log(resSlug.data);

      const res = await axios.post(
        "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/addSubject",
        {
          name: result?.title,
          internalSubjectId: result?.uid,
          internalGradeId: result?.grade?.uid,
          description: "description",
          logo: null,
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
        "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/editSubject",
        {
          internalSubjectId: result?.uid,
          name: result?.title,
          internalGradeId: result?.grade?.uid,
          description: "description",
          logo: null,
        }
      );
      console.log(res.data);

      const checkPublished = result?.publishedAt;
      if (checkPublished !== null) {
        const publishRes = await axios.post(
          "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/change-subject-status",
          {
            internalSubjectId: result?.uid,
            status: true,
          }
        );
        console.log(publishRes.data);
      } else if (checkPublished === null) {
        const publishRes = await axios.post(
          "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/change-subject-status",
          {
            internalSubjectId: result?.uid,
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

    try {
      const res = await axios.post(
        "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/delete-subject",
        {
          internalSubjectId: result?.uid,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  },
};
