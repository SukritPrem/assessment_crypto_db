const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", require("./router/user"));
app.use("/admin", require("./router/admin"));

app.listen(port, async () => {
  console.log(`app listening at http://localhost:${port}`);
});

module.exports = { app };
