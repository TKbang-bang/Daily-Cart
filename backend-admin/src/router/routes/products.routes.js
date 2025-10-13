const {
  createProduct,
  getProducts,
  getProduct,
  UpdateProduct,
} = require("../../controllers/products.controller");
const { productsUpload } = require("../../utils/multer");

const productsRoutes = require("express").Router();

productsRoutes.post("/", productsUpload().single("image"), createProduct);
productsRoutes.put("/:id", UpdateProduct);
productsRoutes.get("/", getProducts);
productsRoutes.get("/:id", getProduct);

module.exports = productsRoutes;
