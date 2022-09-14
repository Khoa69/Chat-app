"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_config_1 = __importDefault(require("../config/mongoose.config"));
const Schema = mongoose_config_1.default.Schema;
const postSchema = new Schema({
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
}, { timestamps: true });
const post = mongoose_config_1.default.model("post", postSchema);
module.exports = post;
