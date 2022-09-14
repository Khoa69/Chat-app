"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_config_1 = __importDefault(require("../config/mongoose.config"));
const Schema = mongoose_config_1.default.Schema;
const MessageSchema = new Schema({
    conversationId: {
        type: mongoose_config_1.default.Types.ObjectId,
        ref: "conversation",
    },
    sender: {
        type: mongoose_config_1.default.Types.ObjectId,
        ref: "user",
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["IMAGE", "TEXT"],
        default: "TEXT"
    }
}, { timestamps: true });
module.exports = mongoose_config_1.default.model("Message", MessageSchema);
