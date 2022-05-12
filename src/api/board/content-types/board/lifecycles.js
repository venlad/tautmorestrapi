// const axios = require("axios");

// module.exports = {
//   async afterCreate(event) {
//     const { result } = event;
//     try {
//       const res = await axios.post(
//         "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/board/addBoard",
//         {
//           name: result.title,
//           internalBoardId: result.id,
//           description: "Board description",
//           logo: null,
//           type: "board",
//         }
//       );
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   async afterUpdate(event) {
//     const { result } = event;

//     try {
//       const res = await axios.post(
//         "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/board/editBoard",
//         {
//           internalBoardId: result?.id,
//           board: {
//             name: result?.title,
//             description: "Board description",
//             logo: "wsq",
//           },
//         }
//       );
//       console.log(res.data);

//       const checkPublished = result?.publishedAt;
//       if (checkPublished !== null) {
//         const publishRes = await axios.post(
//           "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/board/changeBoardStatus",
//           {
//             internalBoardId: result?.id,
//             status: true,
//           }
//         );
//         console.log(publishRes.data);
//       } else if (checkPublished === null) {
//         const publishRes = await axios.post(
//           "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/board/changeBoardStatus",
//           {
//             internalBoardId: result?.id,
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
//         "https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/board/deleteBoard",
//         {
//           internalBoardId: result?.id,
//         }
//       );
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };
