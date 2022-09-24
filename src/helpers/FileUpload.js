const { UPLOAD_PATH } = require("../constants");

exports.single = (req, res, key, folder) => {
	const file = req.files[key];
	const fileName = `${new Date().getTime()}.${file.name.split(".").pop()}`;
	const uploadPath = `${UPLOAD_PATH}/${folder}/${fileName}`;

	file.mv(uploadPath, function (err) {
		if (err) return res.status(500).send(err);
	});

	req.body[key] = fileName;
};
