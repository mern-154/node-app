const jwt = require("jsonwebtoken");
const { SECRET } = require("../constants/AuthConstant");

exports.createToken = (data) => {
	const token = jwt.sign(data, SECRET, { expiresIn: "1d" });

	return token;
};
