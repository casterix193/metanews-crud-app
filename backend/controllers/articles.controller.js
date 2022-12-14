import Article from "../models/Article";

export const getArticles = async (req, res) => {
  try {
    const { category } = req.query || {};

    const filter = category ? { category: category } : {};
    const articles = await Article.find(filter);
    res.status(200).json(articles);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Error While Fetching Data" });
  }
};

export async function getArticle(req, res) {
  try {
    const { articleId } = req.query || {};

    const article = await Article.findById(articleId);
    if (!article) {
      return res
        .status(404)
        .json({ error: "Article was not found with given Id" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Cannot get the Article...!" });
  }
}

export const createArticle = async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: "Please provide form Data" });
    }

    const article = await Article.create(data);
    return res.status(200).json(article);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export async function updateArticle(req, res) {
  try {
    const { articleId } = req.query || {};
    const data = req.body;

    if (!articleId || !data) {
      res
        .status(400)
        .json({ error: "Please provide valid data to update article" });
    }

    const article = await Article.findByIdAndUpdate(articleId, data);
    res.status(200).json(article);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Error While Updating the Data...!" });
  }
}

export async function deleteArticle(req, res) {
  try {
    const { articleId } = req.query || {};

    const article = await Article.findByIdAndDelete(articleId);
    return res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: "Error While Deleting the Article...!" });
  }
}
