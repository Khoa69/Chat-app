import instance from '../config/mongoose.config'
const Schema = instance.Schema;

const MessageSchema = new Schema(
  {
    conversationId: {
      type: instance.Types.ObjectId,
			ref: "conversation",
    },
    sender: {
			type: instance.Types.ObjectId,
			ref: "user",
		},
    content: {
      type: String,
			required: true,
    },
    type:{
      type: String,
      enum : ["IMAGE","TEXT"],
      default: "TEXT"
    }
  },
  { timestamps: true }
);

module.exports = instance.model("Message", MessageSchema);