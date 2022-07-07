const express = require("express");
const router = express.Router();
const cm = require("../controllers/customers");
const fileMgmt = require("../shared/fileMgmt");

router.get("/home", function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath("customers-home.html");
  res.sendFile(filePath);
});

router.get("/", cm.customersList);
router.get("/find", cm.findCustomer);
router.get("/export", cm.exportCustomers);
router.post("/", cm.addCustomers);

// todo: delete customer
// router.delete("/customers", cm.deleteCustomer);

// todo: edit/update customer
// router.patch("/customers", cm.updateCustomer);

// todo: view more details of a customer
// router.get("/customer-details", cm.viewCustomerDetails);

module.exports = router;
