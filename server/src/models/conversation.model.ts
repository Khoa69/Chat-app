import instance from '../config/mongoose.config'
const Schema = instance.Schema;

const ConversationSchema = new Schema(
    {
      members:  [
        {
          type: instance.Types.ObjectId,
          ref: "user",
        },
      ],
    },
    { timestamps: true }
  );
  
  module.exports = instance.model("Conversation", ConversationSchema);