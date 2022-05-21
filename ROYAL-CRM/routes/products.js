const express = require("express");
const router = express.Router();
const productModule = require("../controllers/products");
const path = require("path");

router.get("/home", function (req, res, next) {
  const filePath = path.join(__dirname, "../client", "products-home.html");
  res.sendFile(filePath);
});
router.get("/", productModule.productList);
router.get("/export", productModule.exportProducts);
router.post("/", productModule.addProduct);

module.exports = router;
