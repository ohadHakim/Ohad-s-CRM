const mysql = require("mysql2");
const config = require("../config/dev");

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = {
  // products:[],

  addProduct: function (name, description, price) {
    // const productname = process.argv.slice(2);
    if (!name || name.length === 0) {
      throw `ERROR: product name is empty`;
    }

    // products.push({
    //   productname: productname,
    //   id: products.length,
    // });

    pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr;
      const sql = "INSERT INTO products(name,description,price) VALUES (?,?,?)";

      connection.query(
        sql,
        [name, description, price],
        function (sqlErr, result, fields) {
          if (sqlErr) throw sqlErr;

          console.log(result);
        }
      );
    });
  },
  productList: function (req, res) {
    pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr;
      const sql = "SELECT * FROM products";

      connection.query(sql, function (sqlErr, result, fields) {
        if (sqlErr) throw sqlErr;

        res.send(result);
      });
    });
  },

  // products.forEach((product) => {
  //   console.log(`ok. Product name: ${product.productname}.`);
  // });
};
