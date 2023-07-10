const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("uncaught Exception! shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  // eslint-disable-next-line no-console
  console.log("DB connection successful!");
});

const app = require("./app");

const port = process.env.PORT;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandled Rejection! shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
