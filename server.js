const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const dotenvExpand = require("dotenv-expand");
const fileupload = require("express-fileupload");

const app = express();
dotenvExpand.expand(dotenv.config());

const PORT = process.env.PORT || 5500;
const SERVER = process.env.SERVER || "";

app.use(express.json());
app.use(fileupload({ createParentPath: true }));
app.use(express.static(path.join(__dirname, "public/uploads")));

const UserRoute = require("./src/routes/UserRoutes");

app.get("/", (req, res) => {
	return res.json("Welcome!");
});

app.use("/user", UserRoute);

app.listen(PORT, () => {
	console.log(`Server is running on ${SERVER}`);
});
