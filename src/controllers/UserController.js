const { User } = require("../models/User");
const { success } = require("../helpers/Response");
const { USER_FOUND, USER_NOT_FOUND } = require("../lang/en/UserConstant");
const { uploads } = require("../helpers/FileUpload");

exports.list = (req, res) => {
	const data = [...User];

	return success({ res, msg: USER_FOUND, data, status: 200 });
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
	uploads(req, res, "profile_image", "users");
	console.log("User", req.body);

	return res.json("User created");
};
