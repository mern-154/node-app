const express = require("express");

const app = express();

const UserRoute = require("./UserRoutes");
const AuthRoute = require("./AuthRoutes");
const CategoryRoute = require("./CategoryRoutes");
const PostsRoute = require("./PostsRoutes");

const { auth } = require("../middlewares/Auth");

app.use("/user", UserRoute);
app.use("/auth", AuthRoute);
app.use("/category", auth, CategoryRoute);
app.use("/posts", PostsRoute);


module.exports = app;
