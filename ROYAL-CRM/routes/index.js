const express = require("express");
const router = express.Router();
const customersModule = require("../controllers/customers");
const productModule = require("../controllers/products");
const ordersModule = require("../controllers/orders");

/* GET home page. */
router.get("/", function (req, res, next) {
  // customersModule.addCostumers("Lola", "052565656", "gl@gmail.com", 3);
  customersModule.customersList(req, res);
});

router.get("/products", function (req, res, next) {
  productModule.addProduct("MAC", "APPLE MAC M1", 1299);
  productModule.productList(req, res);
});

router.get("/orders", function (req, res, next) {
  ordersModule.addOrder(20, 6, 50, 120);
  ordersModule.ordersList(req, res);
});
module.exports = router;
