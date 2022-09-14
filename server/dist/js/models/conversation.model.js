"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_config_1 = __importDefault(require("../config/mongoose.config"));
const Schema = mongoose_config_1.default.Schema;
const ConversationSchema = new Schema({
    members: [
        {
            type: mongoose_config_1.default.Types.ObjectId,
            ref: "user",
        },
    ],
    type: {
        type: String,
        enum: ["GROUP", "PERSON"],
        default: "PERSON",
    },
    roomName: {
        type: String,
    }
}, { timestamps: true });
module.exports = mongoose_config_1.default.model("Conversation", ConversationSchema);
