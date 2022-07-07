const database = require("./database");
const joi = require("joi");
// const fs = require("fs");
// const path = require("path");
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
    const param = req.query; // get method
    //  const param = req.body;  // post method

    const schema = joi.object({
      column: joi
        .string()
        .valid("name", "email", "country_name")
        .default("name"),
      sort: joi.string().valid("ASC", "DESC").default("ASC"),
    });

    const { error, value } = schema.validate(param);

    if (error) {
      console.log(error);
      res.status(400).send("add failed");
      return;
    }

    const fieldsMap = new Map([
      ["name", "customers.name"],
      ["email", "customers.email"],
      ["country_name", "countries.name"],
    ]);
    const sql = `SELECT customers.name, customers.email,customers.phone,countries.name AS country_name FROM customers, countries WHERE customers.country_id=countries.id ORDER BY ${fieldsMap.get(
      value.column
    )} ${value.sort}`;
    try {
      const result = await database.getConnection(sql); //[rows,fields]
      // res.set("Access-Control-Allow-Origin", "*");
      res.json(result[0]);
    } catch (err) {
      console.log(err);
    }
  },
  exportCustomers: async function (req, res, next) {
    const sql =
      "SELECT customers.name, customers.email,customers.phone,countries.name AS country_name FROM customers, countries WHERE customers.country_id=countries.id ORDER BY customers.name ASC ";

    fileMgmt.exportToFile(res, sql, "customers");
  },
  findCustomer: async function (req, res, next) {
    const param = req.query;

    const schema = joi.object({
      search: joi.string().required().min(2),
    });

    const { error, value } = schema.validate(param);

    if (error) {
      res.status(400).send(`search error: ${error}`);
      throw error;
    }

    const searchQuery = `%${value.search}%`;

    const sql = `SELECT customers.id, customers.name, customers.phone, customers.email,   
        countries.id AS country_id, countries.name AS country_name, countries.country_code  
        FROM customers LEFT JOIN countries ON customers.country_id = countries.id 
        WHERE customers.name LIKE ? OR customers.email LIKE ? OR customers.country_id LIKE ? 
        ORDER BY customers.name ASC;`;

    try {
      const result = await database.getConnection(sql, [
        searchQuery,
        searchQuery,
        searchQuery,
      ]);

      // res.set("Access-Control-Allow-Origin", "*");
      res.json(result[0]);
    } catch (err) {
      res.status(400).send(`search error: ${err}`);
      // throw error;
    }
  },
};
