const express = require("express");
const router = express.Router();
const ordersModule = require("../controllers/orders");
const mwAuth = require("../middleware/auth");
const auth = require("../controllers/auth");
const fileMgmt = require("../shared/fileMgmt");

/* Authentication*/
router.options("*", function (req, res, next) {
  res.send();
});

router.get("/signin", function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath("signin.html");
  res.sendFile(filePath);
});

router.post("/login", auth.login);

router.get("/logout", mwAuth, function (req, res, next) {
  return res
    .clearCookie("access_token")
    .status(200)
    .send("Successfully logged out.");
});

/* GET home page. */
router.get("/", mwAuth, function (req, res, next) {
  res.send("This is the HOME page, use /customers/home /products/home /orders");
});

/* Chat */
router.get("/chat", mwAuth, function (req, res, next) {
  const filePath = fileMgmt.getHtmlFileName("chat.html");
  res.sendFile(filePath);
});

/* Orders */
router.get("/orders", ordersModule.ordersList);
router.get("/orders-add", ordersModule.addOrder);

module.exports = router;
