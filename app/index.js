const express = require("express");
const { param, validationResult } = require("express-validator");
const { Pool } = require("pg");
const app = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "cryptocurrency",
  password: "postgres",
  port: 5432,
});

module.exports = { pool };

app.use("/", require("./router/user"));
app.use("/admin", require("./router/admin"));
app.get("/test", (req, res) => {
  return res.send("HEllo");
});
app.listen(port, async () => {
  console.log(`app listening at http://localhost:${port}`);
});

module.exports = { app };
