const User = require("../models/User");
const { success } = require("../helpers/Response");
const { single } = require("../helpers/FileUpload");
const { USER_FOUND, USER_NOT_FOUND } = require("../lang/en/UserConstant");

exports.list = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		const users = await User.paginate({}, { page, limit });

		return success({ res, msg: USER_FOUND, data: users, status: 200 });
	} catch (err) {
		console.log(err);
		return success({ res, msg: err.message, data: {}, status: 500 });
	}
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
