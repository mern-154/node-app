const mongoose = require("mongoose");

const { DATABASE_URI } = require("../constants/index");

mongoose
	.connect(DATABASE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((err) => {
		console.log("Err: ", err.message);
	});
