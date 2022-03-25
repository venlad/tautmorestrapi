const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});


// postgres: module.exports = ({ env }) => ({
//   connection: {
//     client: "postgres",
//     connection: {
//       host: "ec2-52-201-124-168.compute-1.amazonaws.com",
//       port: 5432,
//       database: "d716h515rqcb1r",
//       user: "ymsiuqqqkdadvd",
//       password:
//         "0774a87650635b40302d8c7ac8700a67a588c3fdc35dc06db659c62837bdd73f",
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     },
//     debug: false,
//   },
// });



// postgres://ymsiuqqqkdadvd:0774a87650635b40302d8c7ac8700a67a588c3fdc35dc06db659c62837bdd73f@ec2-52-201-124-168.compute-1.amazonaws.com:5432/d716h515rqcb1r