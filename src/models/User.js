const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { IMAGE_BASE_URL } = require("../constants");
const { dateFormat } = require("../helpers/Common");

const ucWords = (value) => {
	let newWord = value.split("");
	newWord = [newWord[0].toUpperCase(), ...newWord.slice(1)].join("");

	return newWord;
};

const userSchema = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: true,
			set: ucWords,
		},
		lname: {
			type: String,
			required: true,
			set: ucWords,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		profileImage: {
			type: String,
			get: (value) => {
				return `${IMAGE_BASE_URL}/users/${value}`;
			},
		},
		dob: {
			type: Date,
			get: dateFormat,
		},
		isAdmin: {
			type: Boolean,
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

userSchema.virtual("token");

module.exports = mongoose.model("User", userSchema);
