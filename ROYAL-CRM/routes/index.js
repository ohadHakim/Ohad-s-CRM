const express = require("express");
const router = express.Router();
const ordersModule = require("../controllers/orders");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("This is the HOME page, use /customers/home /products/home /orders");
});

router.get("/chat", function (req, res, next) {
  const filePath = path.join(__dirname, "../client", "chat.html");
  res.sendFile(filePath);
});

/* Orders */
router.get("/orders", ordersModule.ordersList);
router.get("/orders-add", ordersModule.addOrder);

module.exports = router;
