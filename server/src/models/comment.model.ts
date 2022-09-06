import instance from '../config/mongoose.config'
const Schema = instance.Schema;

const commentSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		path: {
			type: String,
			default: null,
			index: true,
		},
		owner: {
			type: instance.Types.ObjectId,
			ref: "user",
		},
		reply: {
			type: instance.Types.ObjectId,
			ref: "user",
		},
		likes: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

const comment = instance.model("comment", commentSchema);

module.exports = comment;