import instance from '../config/mongoose.config'
const Schema = instance.Schema;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		Image: {
			type: String,
			default: "",
		},
		description: {
			type: String,
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		likes: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

const post = instance.model("post", postSchema);

module.exports = post;