const jwt = require("jsonwebtoken");

const { SECRET } = require("../constants/index");
const { success } = require("../helpers/Response");
const { User } = require("../models/User");

exports.auth = (req, res, next) => {
	let token = req.headers.authorization || "";

	if (!token) return success({ res, msg: "You are Unauthorized!", data: {}, status: 401 });

	token = token.replace("Bearer ", "");

	try {
		const { email } = jwt.verify(token, SECRET);

		const user = User.filter((ele) => ele.email === email);

		if (user.length > 0) {
			req.user = user[0];
			next();
		} else return success({ res, msg: "You are Unauthorized!", data: {}, status: 401 });
	} catch (err) {
		return success({ res, msg: err.message, data: {}, status: 500 });
	}
};
