import { Request, Response, NextFunction} from "express";
const Message = require("../models/message.model.ts");
const response = require("../utils/response");

const MessageController = {
    sendMessage: async function (req :Request, res:Response , next:NextFunction) {
        try {
            const newMessage = new Message(req.body)
            const savedMessage = await newMessage.save();
            res.status(200).json(response({ savedMessage },{},1));
        } catch (error) {
            next(error);
        }
    },
    getMessage: async function (req :any, res:Response , next:NextFunction){
        try {
            
            const limit =req.query.limit|| 15;
            const page  =req.query.page||1;

            Message
            .find({
                conversationId: req.params.conversationId
            }) // find tất cả các data
            .skip(()=>((limit * page) - limit) ) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(limit)
            .exec((err: any, messages :any) => {
                Message.countDocuments((err:any, count:number) => { // đếm để tính có bao nhiêu trang
                if (err) return next(err);
                res.status(200).json(response({ messages, totalNumber:count},{},1));
              });
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MessageController;
