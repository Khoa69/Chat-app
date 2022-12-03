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
const Message = require("../models/message.model.ts");
const response = require("../utils/response");
const MessageController = {
    sendMessage: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = new Message(req.body);
                const savedMessage = yield newMessage.save();
                res.status(200).json(response({ savedMessage }, {}, 1));
            }
            catch (error) {
                next(error);
            }
        });
    },
    getMessage: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = req.query.limit || 15;
                const page = req.query.page || 1;
                console.log(page);
                Message
                    .find({
                    conversationId: req.params.conversationId
                }) // find tất cả các data
                    .sort({ createdAt: -1 })
                    .skip((limit * page) - limit) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                    .limit(limit)
                    .exec((err, messages) => {
                    Message.countDocuments({ conversationId: req.params.conversationId }, (err, count) => {
                        if (err)
                            return next(err);
                        res.status(200).json(response({ messages: messages.reverse(), totalNumber: count }, {}, 1));
                    });
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
};
module.exports = MessageController;
