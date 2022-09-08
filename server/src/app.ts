import express from "express";
import {createServer} from "http"
import {Server} from "socket.io";
const logger = require("morgan");
import cors from "cors";
import config from "./config/default.config";
import socket from "./config/socket.config";
const { trim_all } = require("request_trimmer");
import connect from "./config/database.config";
import helmet from "helmet";
const {
    errorConverter,
    handleError,
    handleNotFound,
} = require("./middlewares/error.middleware");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(trim_all);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);

//connect db
connect();


const io = new Server(httpServer, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

app.use("/api", require("./routes/index.routes.ts"));

app.use(errorConverter);
app.use(handleError);
app.use(handleNotFound);

httpServer.listen(config.port,() => {
  console.log(`http://localhost:${config.port}`);

//   socket({io});
});
