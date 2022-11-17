import express from "express";
import { services } from "../services/webServices.js";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { marked } from "marked";
const dompurify = DOMPurify(new JSDOM().window);

export const articleRouter = express.Router();

articleRouter.get("/new", async (req, res) => {
  res.render("pages/newarticle.ejs");
});

articleRouter.post("/new", async (req, res) => {
  await services.newArticle(req.body);
  res.send("Article posted");
});

articleRouter.get("/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  const article = await services.getArticle(articleId);
  if (!article) {
    res.redirect("/404");
  }
  article.content = dompurify.sanitize(marked(article.content));
  res.render("pages/article.ejs", { article: article });
});

articleRouter.get("/edit/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  const article = await services.getArticle(articleId);
  if (!article) {
    res.redirect("/404");
  }
  res.render("pages/editarticle.ejs", { article: article });
});

articleRouter.post("/edit/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  await services.editArticle(articleId, req.body);
  res.send("Article edited");
});

articleRouter.get("/delete/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  await services.deleteArticle(articleId);
  res.redirect("/");
});
