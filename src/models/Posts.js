const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");



const {ucWords, getImageURL, captializeBody } = require("../helpers/Common");

const postsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			// required: true,
			set: ucWords,
		},
		body: {
			type: String,
			required: true,
			set: captializeBody,
		},
		coverImage: {
			type: String,
			get: (value) => getImageURL(value, "posts"),
			required: true,

		},
		status: {
			type: Boolean,
			// default:true
		},
		userId: {
			type: String,
			// required: true,

		},
		categoryId: {
			type: String,
			// required: true,
			
		},
		tags:{
			type:Array,
		}
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



module.exports = mongoose.model("posts", postsSchema);
