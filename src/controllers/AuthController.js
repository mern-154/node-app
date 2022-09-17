const { User } = require("../models/User");
const { success } = require("../helpers/Response");
const { single } = require("../helpers/FileUpload");
const { createToken } = require("../helpers/Common");
const { USER_FOUND, USER_NOT_FOUND } = require("../lang/en/UserConstant");

exports.login = (req, res) => {
	const { email, password } = req.body;

	const user = User.filter((ele) => ele.email === email);

	if (user.length === 0) return success({ res, msg: "Emial not found!", data: {}, status: 404 });

	if (password !== "123456") return success({ res, msg: "Password not matched!", data: {}, status: 401 });

	const token = createToken({ name: user[0].name, email: user[0].email });

	const data = { ...user[0], token };

	return success({ res, msg: "You are loggedin successfully.", data, status: 200 });
};

exports.details = (req, res) => {
	const data = User.filter((ele) => ele.id === parseInt(req.params.id));

	if (data.length === 0) return success({ res, msg: USER_NOT_FOUND, data: {}, status: 404 });

	return success({ res, msg: USER_FOUND, data: data[0], status: 200 });
};

exports.update = (req, res) => {
	return res.json(`User ID is ${req.params.id}`);
};

exports.destroy = (req, res) => {
	return res.json(`Deleting User ID is ${req.params.id}`);
};

exports.save = (req, res) => {
	single(req, res, "profile_image", "users");
	console.log("User", req.body);

	return res.json("User created");
};
