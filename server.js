const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const dotenvExpand = require("dotenv-expand");
const fileupload = require("express-fileupload");

const app = express();
dotenvExpand.expand(dotenv.config());

app.use(express.json());
app.use(fileupload({ createParentPath: true }));
app.use(express.static(path.join(__dirname, "public/uploads")));

require("./src/config/Connection");

const Routes = require("./src/routes/index");
const { PORT, SERVER } = require("./src/constants");

app.get("/", (req, res) => {
	return res.json("Welcome!");
});

app.use("/", Routes);

app.listen(PORT, () => {
	console.log(`Server is running on ${SERVER}`);
});
