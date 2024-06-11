const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

const indexRouter = require("./routes/index");
const userRouter = require("./routes/userRouter");

const db = require("./config/mongoose-config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("server is running");
});
