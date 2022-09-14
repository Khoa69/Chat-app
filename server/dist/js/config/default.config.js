"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 3001,
    mongo_url: process.env.MONGODB_URL,
    token_secret: process.env.ACCESS_TOKEN_SECRET,
    token_life: process.env.ACCESS_TOKEN_LIFE,
};
