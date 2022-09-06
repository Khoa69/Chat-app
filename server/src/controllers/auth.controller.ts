import defaultConfig from "../config/default.config";
import { Request, Response, NextFunction} from "express";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const response = require("../utils/response");
const User = require("../models/user.model.ts");

const AuthController = {
    signup: async function (req :Request, res:Response , next:NextFunction) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPass,
            });
            const user = await newUser.save();
            res.status(200).json(response({ user },{},1));
        } catch (err) {
            next(err);
        }
    },
    login : async function (req: Request, res: Response, next:NextFunction) {
        try {
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(400).json(response({},{ message: "Wrong account!" },0));
    
            const validate = await bcrypt.compare(req.body.password, user.password);
            !validate && res.status(400).json(response({},{ message: "Wrong account!" },0));
    
            const token = jwt.sign({ _id: user._id.toString() }, defaultConfig.token_secret, {
                expiresIn: defaultConfig.token_life,
            });
            res.status(200).json(response({
                user: user,
                id: user._id,
                email: user.email,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth,
                profilePicture: user.profilePicture,
                accessToken: token,
            },{},1));
        } catch (err) {
            next(err);
        }
    },
};

module.exports = AuthController;