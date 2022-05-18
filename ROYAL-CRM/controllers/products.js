const database = require("./database");
const joi = require("joi");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");

module.exports = {
  addProduct: async function (req, res, next) {
    const qs = req.body;
    const schema = joi.object({
      name: joi.string().required().min(2).max(200),
      description: joi.string().required(),
      price: joi
        .string()
        .required()
        .regex(/^[0-9]\d{8,11}$/),
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
      // const connection = await database.getConnection();
      const result = await database.getConnection(sql); //[rows,fields]
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }

    // database.pool.getConnection(function (connErr, connection) {
    //   if (connErr) throw connErr;

    //   connection.query(sql, function (sqlErr, result, fields) {
    //     if (sqlErr) throw sqlErr;

    //     res.send(result);
    //   });
    // });
  },
  exportProducts: async function (req, res, next) {
    const sql =
      "SELECT name,description,price FROM products ORDER BY name ASC ";

    try {
      const result = await database.getConnection(sql);
      const now = new Date().getTime();
      const filePath = path.join(__dirname, "../files", `products-${now}.txt`);
      const stream = fs.createWriteStream(filePath);

      stream.on("open", function () {
        stream.write(JSON.stringify(result[0]));
        stream.end();
      });

      stream.on("finish", function () {
        res.send(`Success. File at: ${filePath}`);
      });
    } catch (err) {
      throw err;
    }
  },
};
