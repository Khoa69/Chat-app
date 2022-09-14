"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_config_1 = __importDefault(require("../config/default.config"));
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const response = require("../utils/response");
const User = require("../models/user.model.ts");
const AuthController = {
    signup: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt.genSalt(10);
                const hashedPass = yield bcrypt.hash(req.body.password, salt);
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPass,
                });
                const user = yield newUser.save();
                res.status(200).json(response({ user }, {}, 1));
            }
            catch (err) {
                next(err);
            }
        });
    },
    login: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ email: req.body.email });
                !user && res.status(400).json(response({}, { message: "Wrong account!" }, 0));
                const validate = yield bcrypt.compare(req.body.password, user.password);
                !validate && res.status(400).json(response({}, { message: "Wrong account!" }, 0));
                const token = jwt.sign({ _id: user._id.toString() }, default_config_1.default.token_secret, {
                    expiresIn: default_config_1.default.token_life,
                });
                res.status(200).json(response({
                    user: user,
                    id: user._id,
                    email: user.email,
                    gender: user.gender,
                    dateOfBirth: user.dateOfBirth,
                    profilePicture: user.profilePicture,
                    accessToken: token,
                }, {}, 1));
            }
            catch (err) {
                next(err);
            }
        });
    },
};
module.exports = AuthController;
