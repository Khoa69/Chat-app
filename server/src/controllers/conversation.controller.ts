import { Request, Response, NextFunction } from "express";
const Conversation = require("../models/conversation.model.ts");
const response = require("../utils/response");

const ConversationController = {
  create: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const newConversation = new Conversation({
        members: req.body.members,
      });
      const savedConversation = await newConversation.save();
      res.status(200).json(response({ savedConversation }, {}, 1));
    } catch (error) {
      next(error);
    }
  },
  findByUserId: async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const conversations = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(response({ conversations }, {}, 1));
    } catch (error) {
      next(error);
    }
  },
  findOrCreate: async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const conversations = await Conversation.findOne({
        members: { $all: [...req.body.members] },
      });
      console.log(conversations);

      if (conversations == null) {
        const newConversation = new Conversation({
          members: req.body.members,
        });
        const savedConversation = await newConversation.save();
        return res
          .status(200)
          .json(response({ conversations: savedConversation }, {}, 1));
      }
      res.status(200).json(response({ conversations }, {}, 1));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ConversationController;
