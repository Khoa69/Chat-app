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
const User = require("../models/user.model.ts");
const response = require("../utils/response");
const UserController = {
    findById: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findById(req.params.userId);
                res.status(200).json(response({ user }, {}, 1));
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.default = UserController;
