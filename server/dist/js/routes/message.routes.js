"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_config_1 = __importDefault(require("../config/router.config"));
const MessageController = require("../controllers/message.controller");
router_config_1.default.post("/sendMessage", MessageController.sendMessage);
router_config_1.default.get("/allMessage/:conversationId", MessageController.getMessage);
module.exports = router_config_1.default;
