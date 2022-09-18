const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");

const { SECRET, ROUNDS } = require("../constants/index");
const { IMAGE_BASE_URL } = require("../constants");

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
