const CategoryModel = require("../models/Category");
const { paginateOptions } = require("../helpers/Common");
const { single } = require("../helpers/FileUpload");
const { success, paginationResponse } = require("../helpers/Response");
const { POST_FOUND, POST_NOT_FOUND, POST_UPDATED, POST_DELETED, POST_CREATED } = require("../lang/en/PostsConstant");
const PostsModel = require("../models/Posts");

exports.list = async (req, res) => {
	try {
		const postsData = await PostsModel.paginate({}, { ...paginateOptions, populate: ["userId", "categoryId"] });

		return paginationResponse({ res, msg: POST_FOUND, data: postsData, status: 200 });
	} catch (error) {
		return success({ res, msg: error.message, data: {}, status: 500 });
	}
};

exports.create = async (req, res) => {
	try {
		single(req, res, "coverImage", "posts");

		const category = await CategoryModel.findById(req.body.categoryId);

		if (!category) return success({ res, msg: "Category not found!", status: 404 });

		const postsData = await new PostsModel({ ...req.body, userId: req.user.id }).save();

		return success({ res, msg: POST_CREATED, data: postsData, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: err, status: 500 });
	}
};

exports.update = async (req, res) => {
	try {
		let postsData = await PostsModel.findById(req.params.id);

		if (!postsData) return success({ res, msg: POST_NOT_FOUND, status: 404 });

		postsData = await PostsModel.updateOne({ _id: req.params.id }, { $set: req.body });

		return success({ res, msg: POST_UPDATED, data: postsData, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: err, status: 500 });
	}
};

exports.destroy = async (req, res) => {
	try {
		let postsData = await PostsModel.findById(req.params.id);

		if (!postsData) return success({ res, msg: POST_NOT_FOUND, status: 404 });

		await PostsModel.deleteOne({ _id: req.params.id });

		return success({ res, msg: POST_DELETED, data: postsData, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: err, status: 500 });
	}
};

exports.detail = async (req, res) => {
	try {
		const postsData = await PostsModel.findById(req.params.id);

		if (!postsData) return success({ res, msg: POST_NOT_FOUND, status: 404 });

		return success({ res, msg: POST_FOUND, data: postsData, status: 200 });
	} catch (err) {
		return success({ res, msg: err.message, data: err, status: 500 });
	}
};
