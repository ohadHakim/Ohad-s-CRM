const database = require("./database");
const joi = require("joi");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
const fileMgmt = require("../shared/fileMgmt");

module.exports = {
  addProduct: async function (req, res, next) {
    const qs = req.body;
    const schema = joi.object({
      name: joi.string().required().min(2).max(200),
      description: joi.string().required().min(2).max(300),
      price: joi.string().required(),
    });
    const sql = "INSERT INTO products(name,description,price) VALUES (?,?,?)";

    try {
      const result = await database.getConnection(sql, [
        qs.name,
        qs.description,
        qs.price,
      ]); //[rows,fields]
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },
  productList: async function (req, res, next) {
    const sql = "SELECT * FROM products ORDER BY name ASC";

    try {
      const result = await database.getConnection(sql); //[rows,fields]
      res.json(result[0]);
    } catch (err) {
      console.log(err);
    }
  },
  exportProducts: async function (req, res, next) {
    const sql =
      "SELECT name,description,price FROM products ORDER BY name ASC ";
    fileMgmt.exportToFile(res, sql, "products");
  },
};
