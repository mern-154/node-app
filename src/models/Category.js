const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
		description: {
			type: String,
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
