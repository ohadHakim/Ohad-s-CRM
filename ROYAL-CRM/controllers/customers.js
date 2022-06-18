const database = require("./database");
const joi = require("joi");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
const fileMgmt = require("../shared/fileMgmt");

module.exports = {
  addCustomers: async function (req, res, next) {
    const qs = req.body;
    const schema = joi.object({
      name: joi.string().required().min(2).max(200),
      phone: joi
        .string()
        .required()
        .regex(/^[0-9]\d{8,11}$/),
      email: joi
        .string()
        .required()
        .regex(/(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})/),
      country: joi.number().required(),
    });

    const { error } = schema.validate(qs);
    if (error) {
      res.send(`error adding customer: ${error}`);
      return;
    }

    const sql =
      "INSERT INTO customers(name,phone,email,country_id) VALUES (?,?,?,?);";

    try {
      const result = await database.getConnection(sql, [
        qs.name,
        qs.phone,
        qs.email,
        qs.country,
      ]); //[rows,fields]
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },
  customersList: async function (req, res, next) {
    const sql =
      "SELECT customers.name AS customer_name, customers.email,customers.phone,countries.name AS country_name FROM customers, countries WHERE customers.country_id=countries.id ORDER BY customers.name ASC";
    try {
      // const connection = await database.getConnection();
      const result = await database.getConnection(sql); //[rows,fields]
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },
  exportCustomers: async function (req, res, next) {
    const sql =
      "SELECT customers.name AS customer_name, customers.email,customers.phone,countries.name AS country_name FROM customers, countries WHERE customers.country_id=countries.id ORDER BY customers.name ASC ";

    fileMgmt.exportToFile(res, sql, "customers");
  },
  //todo: delete customer
  //sql: DROP
  deleteCustomer: async function (req, res, next) {},
};
