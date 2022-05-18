const express = require("express");
const router = express.Router();
const cm = require("../controllers/customers");
const productModule = require("../controllers/products");
const ordersModule = require("../controllers/orders");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("This is the HOME page, use /customers /products /orders");
});

/* Customers */
router.get("/customers-file", function (req, res, next) {
  const filePath = path.join(__dirname, "../client", "customers-home.html");
  res.sendFile(filePath);
});

router.get("/customers", cm.customersList);
router.post("/customers-add", cm.addCustomers);

// todo: delete customer
// router.delete("/customers", cm.deleteCustomer);

// todo: export all customers to file
router.get("/customers/export", cm.exportCustomers);

// todo: edit/update customer
// router.patch("/customers", cm.updateCustomer);

// todo: view more details of a customer
// router.get("/customer-details", cm.viewCustomerDetails);

// router.get("/customers", function (req, res, next) {
//   // customersModule.addCostumers("Lola", "052565656", "gl@gmail.com", 3);
//   customersModule.customersList(req, res);
// });

/* Products */
router.get("/products-file", function (req, res, next) {
  const filePath = path.join(__dirname, "../client", "products-home.html");
  res.sendFile(filePath);
});
router.get("/products", productModule.productList);
router.post("/products-add", productModule.addProduct);

router.get("/products/export", productModule.exportProducts);

// router.get("/products", function (req, res, next) {
//   // productModule.addProduct("MAC", "APPLE MAC M1", 1299);
//   productModule.productList(req, res);
// });

/* Orders */
router.get("/orders", ordersModule.ordersList);
router.get("/orders-add", ordersModule.addOrder);

// router.get("/orders", function (req, res, next) {
//   // ordersModule.addOrder(20, 6, 50, 120);
//   ordersModule.ordersList(req, res);
// });

module.exports = router;
