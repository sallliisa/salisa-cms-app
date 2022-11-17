import { config } from "../config/config.js";
import NodeCache from "node-cache";
import got from "got";

const articleCache = new NodeCache({ stdTTL: config.cache.ttl });

export const services = {
  getAllArticles: async () => {
    const data = await got
      .get(`http://${config.api.address}:${config.api.port}/api/articles`)
      .json();
    return data.articles;
  },
  getArticle: async (articleId) => {
    if (articleCache.has(articleId)) {
      return articleCache.get(articleId);
    } else {
      const data = await got
        .get(
          `http://${config.api.address}:${config.api.port}/api/article/${articleId}`
        )
        .json();
      articleCache.set(articleId, data.article);
      return data.article;
    }
  },
  newArticle: async (data) => {
    await got.post(
      `http://${config.api.address}:${config.api.port}/api/newarticle/`,
      {
        json: data,
      }
    );
  },
  editArticle: async (articleId, data) => {
    await got.post(
      `http://${config.api.address}:${config.api.port}/api/editarticle/${articleId}`,
      {
        json: data,
      }
    );
  },
  deleteArticle: async (articleId) => {
    await got.delete(
      `http://${config.api.address}:${config.api.port}/api/deletearticle/${articleId}`
    );
  },
};
