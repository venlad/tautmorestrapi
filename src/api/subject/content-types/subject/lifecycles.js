// const axios = require("axios");
// const slugify = require("slugify");

// module.exports = {
//   async afterCreate(event) {
//     const { result } = event;

//     try {
//       const res = await axios.post(
//         "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/addSubject",
//         {
//           name: result?.title,
//           internalSubjectId: result?.id,
//           internalGradeId: result?.grade?.id,
//           description: "description",
//           logo: null,
//         }
//       );
//       console.log(res.data);

//       const resSlug = await axios
//         .put(`${process.env.URL}/api/subjects/${result.id}`, {
//           data: {
//             commonSlug: result.commonSlug || slugify(result.title, { lower: true })
//           },
//         })
//         console.log(resSlug.data)
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   async afterUpdate(event) {
//     const { result } = event;

//     try {
//       const res = await axios.post(
//         "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/editSubject",
//         {
//           internalSubjectId: result?.id,
//           name: result?.title,
//           internalGradeId: result?.grade?.id,
//           description: "description",
//           logo: null,
//         }
//       );
//       console.log(res.data);

//       const checkPublished = result?.publishedAt;
//       if (checkPublished !== null) {
//         const publishRes = await axios.post(
//           "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/change-subject-status",
//           {
//             internalSubjectId: result?.id,
//             status: true,
//           }
//         );
//         console.log(publishRes.data);
//       } else if (checkPublished === null) {
//         const publishRes = await axios.post(
//           "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/change-subject-status",
//           {
//             internalSubjectId: result?.id,
//             status: false,
//           }
//         );
//         console.log(publishRes.data);
//       }
  
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   async afterDelete(event) {
//     const { result } = event;

//     try {
//       const res = await axios.post(
//         "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/delete-subject",
//         {
//           internalSubjectId: result?.id,
//         }
//       );
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };
