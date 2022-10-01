exports.success = ({ res, data = [], status = 200, msg }) => {
	let success = true;

	if (typeof data === "Array" && data.length === 0) success = false;
	else if (Object.keys(data).length === 0) success = false;

	return res.status(status).json({
		success,
		msg,
		data,
	});
};

exports.paginationResponse = ({ res, data = [], status = 200, msg }) => {
	let success = true;

	if (Object.keys(data).length === 0) success = false;

	const { docs, ...rest } = data;

	return res.status(status).json({
		success,
		msg,
		data: [...docs],
		...rest,
	});
};
