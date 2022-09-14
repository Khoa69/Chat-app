"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_config_1 = __importDefault(require("../config/mongoose.config"));
const Schema = mongoose_config_1.default.Schema;
const userSchema = new Schema({
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
            type: mongoose_config_1.default.Types.ObjectId,
            ref: "post",
        },
    ],
    comment: [
        {
            type: mongoose_config_1.default.Types.ObjectId,
            ref: "comment",
        },
    ],
}, { timestamps: true });
const User = mongoose_config_1.default.model("user", userSchema);
module.exports = User;
