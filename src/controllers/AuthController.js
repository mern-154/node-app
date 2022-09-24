const bcrypt = require("bcryptjs");

const UserModel = require("../models/User");
const { success } = require("../helpers/Response");
const { single } = require("../helpers/FileUpload");
const { USER_FOUND } = require("../lang/en/UserConstant");
const { createToken, passwordEncrypt } = require("../helpers/Common");

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		let user = await UserModel.findOne({ email });

		if (Object.keys(user).length === 0) return success({ res, msg: "Emial not found!", data: {}, status: 404 });

		const isPassMatched = await bcrypt.compare(password, user.password);

		if (!isPassMatched) return success({ res, msg: "Password not matched!", data: {}, status: 401 });

		const token = createToken({ name: `${user.fname} ${user.lname}`, email: user.email });

		delete user.password;
		user.token = token;

		return success({ res, msg: "You are loggedin successfully.", data: user, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: {}, status: 500 });
	}
};

exports.register = async (req, res) => {
	try {
		single(req, res, "profileImage", "users");

		const password = passwordEncrypt(req.body.password);

		const data = await new UserModel({ ...req.body, password, isAdmin: false }).save();

		return success({ res, msg: USER_FOUND, data, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: {}, status: 500 });
	}
};
