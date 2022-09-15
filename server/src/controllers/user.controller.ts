const User = require("../models/user.model.ts");
import { Request, Response, NextFunction} from "express";
const response = require("../utils/response");

const UserController = {
    findById: async function (req :Request, res:Response , next:NextFunction) {
        try {
            const user = await User.findById(req.params.userId);
            
            res.status(200).json(response({ user },{},1));

        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
