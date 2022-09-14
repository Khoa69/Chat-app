"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_config_1 = __importDefault(require("../config/router.config"));
const authController = require("../controllers/auth.controller");
const verifySignUp = require("../middlewares/verifySignUp");
const JoinSchemaValidation = require("../middlewares/validation.middlewares");
const { SignUpSchema } = require("../validations/auth.validation");
router_config_1.default.post("/register", [JoinSchemaValidation(SignUpSchema), verifySignUp.checkDuplicateEmail], authController.signup);
router_config_1.default.post("/login", authController.login);
module.exports = router_config_1.default;
