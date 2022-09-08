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
      type: {
        type: String,
        enum : ["GROUP","PERSON"],
        default: "PERSON",
      },
      roomName:{
        type: String,
      }
    },
    { timestamps: true }
  );
  
module.exports = instance.model("Conversation", ConversationSchema);