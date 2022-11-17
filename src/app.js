import express from "express";
import Logging from "./library/logger.js";
import { fileURLToPath } from "url";
import path from "path";
import { config } from "./config/config.js";
import { routes } from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/static", express.static(path.join(__dirname, "..", "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.listen(config.server.port, config.server.address, () => {
  Logging.info(`App started on ${config.server.address}:${config.server.port}`);
});
