const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

<<<<<<< HEAD


const {ucWords, getImageURL, captializeBody } = require("../helpers/Common");
=======
const { ucWords, getImageURL } = require("../helpers/Common");
>>>>>>> ce049ebacf26880d117e7231854c9113bf1fc32a

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
<<<<<<< HEAD
			set: captializeBody,
=======
>>>>>>> ce049ebacf26880d117e7231854c9113bf1fc32a
		},
		coverImage: {
			type: String,
			get: (value) => getImageURL(value, "posts"),
			required: true,
		},
		status: {
			type: Boolean,
<<<<<<< HEAD
			// default:true
		},
		userId: {
			type: String,
			// required: true,

		},
		categoryId: {
			type: String,
			// required: true,
			
=======
			default: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			alias: "user",
			required: true,
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			alias: "category",
			required: true,
>>>>>>> ce049ebacf26880d117e7231854c9113bf1fc32a
		},
		tags: {
			type: Array,
			default: [],
		},
	},
	{
		versionKey: false,
		timestamps: true,
		toJSON: {
			transform(doc, res) {
				delete res._id;
				delete res.__v;
				delete res.userId;
				delete res.categoryId;
				delete res.createdAt;
				delete res.updatedAt;
			},
			getters: true,
		},
	}
).plugin(mongoosePaginate);

module.exports = mongoose.model("posts", postsSchema);
