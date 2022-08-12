import got from "got";

export const services = {
  getAllArticles: async () => {
    const data = await got.get(`http://127.0.0.1:8000/api/articles`).json();
    return data.articles;
  },
  getArticle: async (articleId) => {
    const data = await got
      .get(`http://127.0.0.1:8000/api/article/${articleId}`)
      .json();
    return data.article;
  },
  newArticle: async (data) => {
    await got.post(`http://127.0.0.1:8000/api/newarticle/`, {
      json: data,
    });
  },
};
