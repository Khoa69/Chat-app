"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const default_1 = __importDefault(require("./config/default"));
const socket_1 = __importDefault(require("./config/socket"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true,
    },
});
app.get('/', (_, res) => res.send("tes"));
httpServer.listen(default_1.default.port, () => {
    console.log(`http://localhost:${default_1.default.port}`);
    (0, socket_1.default)({ io });
});
