"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_config_1 = __importDefault(require("../config/mongoose.config"));
const Schema = mongoose_config_1.default.Schema;
const commentSchema = new Schema({
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
        type: mongoose_config_1.default.Types.ObjectId,
        ref: "user",
    },
    reply: {
        type: mongoose_config_1.default.Types.ObjectId,
        ref: "user",
    },
    likes: {
        type: Array,
        default: [],
    },
}, { timestamps: true });
const comment = mongoose_config_1.default.model("comment", commentSchema);
module.exports = comment;
