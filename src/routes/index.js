const express = require("express");

const app = express();

const UserRoute = require("./UserRoutes");
const AuthRoute = require("./AuthRoutes");
const { auth } = require("../middlewares/Auth");

app.use("/user", UserRoute);
app.use("/auth", AuthRoute);

module.exports = app;
