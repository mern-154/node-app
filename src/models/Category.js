const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { ucWords } = require("../helpers/Common");

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			set: ucWords,
		},
		status: {
			type: Boolean,
			default: true,
		},
		description: {
			type: String,
			default: "",
		},
	},
	{
		versionKey: false,
		timestamps: true,
		toJSON: {
			transform(doc, res) {
				delete res._id;
				delete res.__v;
				delete res.createdAt;
				delete res.updatedAt;
			},
			getters: true,
		},
	}
).plugin(mongoosePaginate);

module.exports = mongoose.model("Category", categorySchema);
