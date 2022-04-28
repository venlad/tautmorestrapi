// const path = require("path");

// module.exports = ({ env }) => ({
//   connection: {
//     client: "sqlite",
//     connection: {
//       filename: path.join(
//         __dirname,
//         "..",
//         env("DATABASE_FILENAME", ".tmp/data.db")
//       ),
//     },
//     useNullAsDefault: true,
//   },
// });

// for deployed version
postgres: module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "strapi"),
      password: env("DATABASE_PASSWORD", "strapi"),
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});

postgres://nyhuzoizxjrxqp:8eb51cb297f4560546cd5ed709ce3047b546513efb37c7cef11fe6941b91c60d@ec2-3-209-124-113.compute-1.amazonaws.com:5432/d6nah83gj0lh9c