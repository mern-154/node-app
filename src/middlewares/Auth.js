const jwt = require("jsonwebtoken");

const { SECRET } = require("../constants/index");
const { success } = require("../helpers/Response");
const UserModel = require("../models/User");

exports.auth = async (req, res, next) => {
	let token = req.headers.authorization || "";

	if (!token) return success({ res, msg: "You are Unauthorized!", data: {}, status: 401 });

	token = token.replace("Bearer ", "");

	try {
		const { email } = jwt.verify(token, SECRET);

		const user = await UserModel.findOne({ email });

		if (!user) return success({ res, msg: "You are Unauthorized!", data: {}, status: 401 });

		req.user = JSON.parse(JSON.stringify(user));
		next();
	} catch (err) {
		return success({ res, msg: err.message, data: {}, status: 500 });
	}
};
