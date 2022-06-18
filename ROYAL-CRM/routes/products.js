const express = require("express");
const router = express.Router();
const productModule = require("../controllers/products");
const fileMgmt = require("../shared/fileMgmt");

router.get("/home", function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath("products-home.html");
  res.sendFile(filePath);
});
router.get("/", productModule.productList);
router.get("/export", productModule.exportProducts);
router.post("/", productModule.addProduct);

module.exports = router;
