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
Object.defineProperty(exports, "__esModule", { value: true });
const Conversation = require("../models/conversation.model.ts");
const response = require("../utils/response");
const ConversationController = {
    create: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newConversation = new Conversation({
                    members: req.body.members,
                });
                const savedConversation = yield newConversation.save();
                res.status(200).json(response({ savedConversation }, {}, 1));
            }
            catch (error) {
                next(error);
            }
        });
    },
    findByUserId: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversations = yield Conversation.find({
                    members: { $in: [req.params.userId] },
                });
                res.status(200).json(response({ conversations }, {}, 1));
            }
            catch (error) {
                next(error);
            }
        });
    }
};
module.exports = ConversationController;
