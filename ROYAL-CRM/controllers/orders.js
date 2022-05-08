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
  // orders: [],

  addOrder: function (customer_id, product_id, price, quantity) {
    // const ordername = process.argv.slice(2);
    if (!quantity || quantity <= 0) {
      throw `ERROR: quantity field is empty`;
    }

    // this.orders.push({
    //   ordername: ordername,
    //   id: this.orders.length,
    // });
    pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr;
      const sql =
        "INSERT INTO orders(customer_id,product_id,price,quantity) VALUES (?,?,?,?)";

      connection.query(
        sql,
        [customer_id, product_id, price, quantity],
        function (sqlErr, result, fields) {
          if (sqlErr) throw sqlErr;

          console.log(result);
        }
      );
    });
  },

  ordersList: function (req, res) {
    pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr;
      const sql = "SELECT * FROM orders";

      connection.query(sql, function (sqlErr, result, fields) {
        if (sqlErr) throw sqlErr;

        res.send(result);
      });
    });
    // this.orders.forEach((order) => {
    //   console.log(`ok. Order name: ${order.ordername}.`);
    // });
  },
};
