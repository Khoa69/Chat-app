import { Request, Response, NextFunction} from "express";
const Conversation = require("../models/conversation.model.ts");
const response = require("../utils/response");

const ConversationController = {
    create: async function (req :Request, res:Response , next:NextFunction) {
        try {
            const newConversation = new Conversation({
                members: req.body.members,
            })
            const savedConversation = await newConversation.save();
            res.status(200).json(response({ savedConversation },{},1));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ConversationController;
