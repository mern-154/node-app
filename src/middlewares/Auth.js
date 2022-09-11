exports.auth = (req, res, next) => {
	let token = req.headers.authorization || "";

	if (!token) return res.status(401).json("You are Unauthorized!");

	token = token.replace("Bearer ", "");

	if (token === "123456") next();
	else return res.status(401).json("You are Unauthorized!");
};
