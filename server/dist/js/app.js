"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const logger = require("morgan");
const cors_1 = __importDefault(require("cors"));
const default_config_1 = __importDefault(require("./config/default.config"));
const socket_config_1 = __importDefault(require("./config/socket.config"));
const { trim_all } = require("request_trimmer");
const database_config_1 = __importDefault(require("./config/database.config"));
const helmet_1 = __importDefault(require("helmet"));
const { errorConverter, handleError, handleNotFound, } = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(logger("dev"));
app.use(trim_all);
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const httpServer = (0, http_1.createServer)(app);
//connect db
(0, database_config_1.default)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true,
    },
});
app.use("/api", require("./routes/index.routes.ts"));
app.use(errorConverter);
app.use(handleError);
app.use(handleNotFound);
httpServer.listen(default_config_1.default.port, () => {
    console.log(`http://localhost:${default_config_1.default.port}`);
    (0, socket_config_1.default)({ io });
});
