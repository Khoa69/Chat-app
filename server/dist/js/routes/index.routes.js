"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_config_1 = __importDefault(require("../config/router.config"));
const auth = require('./auth.routes');
const conversation = require('./conversation.routes');
const message = require('./message.routes');
const userRoutes = [
    { path: "/auth", route: auth },
    { path: "/conversation", route: conversation },
    { path: "/message", route: message },
];
userRoutes.forEach((route) => {
    router_config_1.default.use(route.path, route.route);
});
module.exports = router_config_1.default;
