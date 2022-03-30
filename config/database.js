const path = require('path');

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
      host: "ec2-18-214-134-226.compute-1.amazonaws.com",
      port: 5432,
      database: "d34pkmr7t8sucd",
      user: "vdxycadlzygxmz",
      password:
        "fcaa6fdeef2803fb09a614cd5dba7e9003872a06c5e71c7fd744426ca59d4f63",
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});


// postgres://vdxycadlzygxmz:fcaa6fdeef2803fb09a614cd5dba7e9003872a06c5e71c7fd744426ca59d4f63@ec2-18-214-134-226.compute-1.amazonaws.com:5432/d34pkmr7t8sucd