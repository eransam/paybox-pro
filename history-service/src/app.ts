import dotenv from "dotenv";
import config from "./01-utils/config";
import express, { NextFunction, Request, Response } from "express";
import dal from "./04-dal/dal";
import expressRateLimit from "express-rate-limit";
import expressFileUpload from "express-fileupload";
import errorsHandler from "./02-middleware/errors-handler";
import logRequests from "./02-middleware/log-requests";
import sanitize from "./02-middleware/sanitize";
import payBoxController from "./06-controllers/payBox-controller";
import path from "path";

dotenv.config();
var cors = require("cors");
dal.connect();
const server = express();
server.use(cors());
if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "../public/")));
  server.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../public", "index.html"))
  );
} else {
  server.get("/", (req, res) => {
    res.send("API is running...");
  });
}
server.use(
  "/api",
  expressRateLimit({
    windowMs: 1000,
    max: 10,
    message: "Rate exceeded. Please try again soon",
  })
);
server.use(express.json());
server.use(expressFileUpload());
server.use(logRequests);
server.use(sanitize);
server.use("/api", payBoxController);
server.use(errorsHandler);
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on PORT ${port}...`));
