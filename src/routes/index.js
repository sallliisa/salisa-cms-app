import express from "express";
import { services } from "../services/webServices.js";
import { articleRouter } from "./article.js";

export const routes = express.Router();

routes.use("/article", articleRouter);

routes.get("/", async (req, res) => {
  const articles = await services.getAllArticles();
  res.render("pages/index.ejs", { articles: articles.reverse() });
});

routes.get("/404", async (req, res) => {
  res.status(404).render("pages/404.ejs");
});
