const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");

const { SECRET, ROUNDS } = require("../constants/index");

exports.createToken = (data) => {
	const token = jwt.sign(data, SECRET, { expiresIn: "1d" });

	return token;
};

exports.dateFormat = (value) => {
	return moment(value).format("DD MMM, YYYY");
};

exports.passwordEncrypt = (password) => {
	const salt = bcrypt.genSaltSync(ROUNDS);
	return bcrypt.hashSync(password, salt);
};

exports.paginateOptions = (req) => {
	let page = 1;
	let limit = 10;

	if (req.hasOwnProperty("query")) {
		if (req.query.hasOwnProperty("page")) page = parseInt(req.query.page);

		if (req.query.hasOwnProperty("limit")) limit = parseInt(req.query.limit);
	}

	return { page, limit };
};
