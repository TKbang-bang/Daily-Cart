const {
  createProduct,
  getProducts,
} = require("../../controllers/products.controller");
const { productsUpload } = require("../../utils/multer");

const productsRoutes = require("express").Router();

productsRoutes.post("/", productsUpload().single("image"), createProduct);
productsRoutes.get("/", getProducts);

module.exports = productsRoutes;
