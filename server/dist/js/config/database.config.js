"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_config_1 = __importDefault(require("./default.config"));
const mongoose = require("mongoose");
const connect = () => mongoose
    .connect(default_config_1.default.mongo_url)
    .then(() => console.log(`connect success`))
    .catch((err) => console.log(`cant connect`, err));
exports.default = connect;
