"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_config_1 = __importDefault(require("../config/router.config"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
router_config_1.default.get("/view/:userId", user_controller_1.default.findById);
module.exports = router_config_1.default;
