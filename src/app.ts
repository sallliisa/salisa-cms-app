import express from "express";
import serveIndex from "serve-index";
import basicAuth from "express-basic-auth";
import crypto from "crypto-js";
import got from "got";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/pages/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const articles: any = await got
  .get("http://127.0.0.1:3000/api/articles")
  .json();
console.log(articles.articles[0]);
