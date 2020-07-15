const mongoose = require("mongoose");
const express = require("express");
const app = express();

const users = require("./routes/users");
const address = require("./routes/address");

app.use(express.json());
app.use("/api/users", users);
app.use("/api/address", address);

mongoose
  .connect("mongodb://localhost/testing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DataBase....."))
  .catch((ex) => console.log(ex.message));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});
