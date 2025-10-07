const ServerError = require("../Errors/errorClas");
const { creatingProduct } = require("../services/products.service");

const createProduct = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const { name, description, category, price, stock, tags } = req.body;

    await creatingProduct({
      name,
      description,
      category,
      price,
      stock,
      tags: JSON.parse(tags),
      filename,
    });

    return res.status(200).json({ message: "Product created" });
  } catch (error) {
    console.log(error);
    return next(new ServerError(error.message, 500));
  }
};

module.exports = { createProduct };
