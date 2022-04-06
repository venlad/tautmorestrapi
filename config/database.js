const path = require("path");

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'sqlite',
//     connection: {
//       filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//     },
//     useNullAsDefault: true,
//   },
// });

postgres: module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: "ec2-34-231-63-30.compute-1.amazonaws.com",
      port: 5432,
      database: "d86i7lopjg49s2",
      user: "dkzgmcbcxwkvsq",
      password:
        "9986f1b04301851d89626dfcf35afd9e3a8828ccd0ec44a1ef0973013c1f28eb",
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});

// // postgres://dkzgmcbcxwkvsq:9986f1b04301851d89626dfcf35afd9e3a8828ccd0ec44a1ef0973013c1f28eb@ec2-34-231-63-30.compute-1.amazonaws.com:5432/d86i7lopjg49s2
// // // postgres://vdxycadlzygxmz:fcaa6fdeef2803fb09a614cd5dba7e9003872a06c5e71c7fd744426ca59d4f63@ec2-18-214-134-226.compute-1.amazonaws.com:5432/d34pkmr7t8sucd

// postgres://dthqgduemabmmw:43ed26d4f887fdb60c3f9de98d0cdbc3a2de8bb56749f7015b06fbe2982d33fb@ec2-52-30-67-143.eu-west-1.compute.amazonaws.com:5432/d22suhbtsg5hl9
