const CategoryModel = require("../models/Category");
const { paginateOptions } = require("../helpers/Common");
const { CATEGORY_FOUND } = require("../lang/en/CategoryConstant");
const { paginationResponse, success } = require("../helpers/Response");

exports.list = async (req, res) => {
	try {
		const categories = await CategoryModel.paginate({}, paginateOptions(req.query));

		return paginationResponse({ res, msg: CATEGORY_FOUND, data: categories, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: err, status: 500 });
	}
};

exports.create = async (req, res) => {
	try {
		const category = await new CategoryModel(req.body).save();

		return success({ res, msg: "Category created successfully.", data: category, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: err, status: 500 });
	}
};

exports.update = async (req, res) => {
	try {
		let category = await CategoryModel.findById(req.params.id);

		if (!category) return success({ res, msg: "Category not found!", status: 404 });

		category = await CategoryModel.updateOne({ _id: req.params.id }, { $set: req.body });

		return success({ res, msg: "Category updated successfully.", data: {}, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: err, status: 500 });
	}
};

exports.destroy = async (req, res) => {
	try {
		let category = await CategoryModel.findById(req.params.id);

		if (!category) return success({ res, msg: "Category not found!", status: 404 });

		await CategoryModel.deleteOne({ _id: req.params.id });

		return success({ res, msg: "Category deleted successfully.", data: {}, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: err, status: 500 });
	}
};

exports.detail = async (req, res) => {
	try {
		const category = await CategoryModel.findById(req.params.id);

		if (!category) return success({ res, msg: "Category not found!", status: 404 });

		return success({ res, msg: "Category found successfully.", data: category, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: err, status: 500 });
	}
};
