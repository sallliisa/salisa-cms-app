import express from "express";
import serveIndex from "serve-index";
import basicAuth from "express-basic-auth";
import crypto from "crypto-js";
import Logging from "./library/logger.js";
import bodyParser from "body-parser";
import { services } from "./services/webServices.js";
import { fileURLToPath } from "url";
import path from "path";
import { config } from "./config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/static", express.static(path.join(__dirname, "..", "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const articles = await services.getAllArticles();
  res.render("pages/index.ejs", { articles: articles.reverse() });
});

app.get("/articles/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  const article = await services.getArticle(articleId);
  res.render("pages/article.ejs", { article: article });
});

app.get("/newarticle", async (req, res) => {
  res.render("pages/newarticle.ejs");
});

app.post("/newarticle", async (req, res) => {
  await services.newArticle(req.body);
  res.send("Article posted");
});

app.use((req, res, next) => {
  res.status(404).render("pages/404.ejs");
});

app.listen(config.server.port, config.server.address, () => {
  Logging.info(`App started on ${config.server.address}:${config.server.port}`);
});
