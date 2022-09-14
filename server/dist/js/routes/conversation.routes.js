"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_config_1 = __importDefault(require("../config/router.config"));
const ConversationController = require("../controllers/conversation.controller");
router_config_1.default.post("/create", ConversationController.create);
router_config_1.default.get("/:userId", ConversationController.findByUserId);
module.exports = router_config_1.default;
