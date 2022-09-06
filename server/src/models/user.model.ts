import instance from '../config/mongoose.config'
const Schema = instance.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
			min:5,
		},
		gender: {
			type: String,
			require: true,
		},
		profilePicture: {
			type: String,
			default: "",
		},
		dateOfBirth: {
			type: Date,
			require: true,
		},
		post: [
			{
				type: instance.Types.ObjectId,
				ref: "post",
			},
		],
		comment: [
			{
				type: instance.Types.ObjectId,
				ref: "comment",
			},
		],
	},
	{ timestamps: true }
);

const User = instance.model("user", userSchema);

module.exports = User;