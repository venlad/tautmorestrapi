// const axios = require("axios");

// module.exports = {
//   async afterCreate(event) {
//     const { result } = event;
//     try {
//       const res = await axios.post(
//         "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/class/addClass",
//         {
//           name: result?.title,
//           internalGradeId: result?.id,
//           internalBoardId: result?.board?.id,
//           division: [],
//           description: "desc",
//           school_id: null,
//         }
//       );
//       console.log(res.data);

//       const refSlug = await axios.put(
//         `${process.env.URL}/api/grades/${result.id}`,
//         {
//           data: {
//             refName: `${result?.title} ( ${result?.board?.title} )`,
//           },
//         }
//       );
//       console.log(refSlug.data);
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   async afterUpdate(event) {
//     const { result } = event;

//     try {
//       const res = await axios.post(
//         "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/class/editClass",
//         {
//           internalGradeId: result?.id,
//           class: {
//             name: result?.title,
//             internalBoardId: result?.board?.id,
//             description: "hi",
//             division: [],
//             school: null,
//           },
//         }
//       );
//       console.log(res.data);

//       const checkPublished = result?.publishedAt;
//       if (checkPublished !== null) {
//         const publishRes = await axios.post(
//           "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/class/changeClassStatus",
//           {
//             internalGradeId: result?.id,
//             status: true,
//           }
//         );
//         console.log(publishRes.data);
//       } else if (checkPublished === null) {
//         const publishRes = await axios.post(
//           "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/class/changeClassStatus",
//           {
//             internalGradeId: result?.id,
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
//     console.log(result);

//     try {
//       const res = await axios.post(
//         "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/class/deleteClass",
//         {
//           internalGradeId: result?.id,
//         }
//       );
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };
