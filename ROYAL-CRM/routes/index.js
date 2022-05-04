const express = require("express");
const router = express.Router();
const customersModule = require("../customers");

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" });
  customersModule.addCostumers("Lola", "052565656", "gl@gmail.com", 1);
  customersModule.customersList(req, res);
});

module.exports = router;
