const { paginateOptions } = require("../helpers/Common");
const { paginationResponse, success } = require("../helpers/Response");
const { CATEGORY_FOUND } = require("../lang/en/CategoryConstant");
const CategoryModel = require("../models/Category");

exports.list = async (req, res) => {
	try {
		const categories = await CategoryModel.paginate({}, paginateOptions(req.query));

		console.log("first", categories);
		return paginationResponse({ res, msg: CATEGORY_FOUND, data: categories, status: 200 });
	} catch (err) {
		console.log("Err", err);
		return success({ res, msg: err.message, data: err, status: 500 });
	}
};
