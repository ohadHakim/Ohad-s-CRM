const database = require("./database");
const fileMgmt = require("../shared/fileMgmt");

module.exports = {
  addOrder: async function (req, res, next) {
    const qs = req.body;
    const customer = qs.customer;
    const product = qs.product;
    const price = qs.price;
    const quantity = qs.quantity;

    // customer_id, product_id, price, quantity
    if (!quantity || quantity <= 0) {
      throw `ERROR: quantity field is empty`;
    }
    const sql =
      "INSERT INTO orders(customer_id,product_id,price,quantity) VALUES (?,?,?,?)";

    try {
      const result = await database.getConnection(sql, [
        customer,
        product,
        price,
        quantity,
      ]); //[rows,fields]
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
    // pool.getConnection(function (connErr, connection) {
    //   if (connErr) throw connErr;
    //   const sql =
    //     "INSERT INTO orders(customer_id,product_id,price,quantity) VALUES (?,?,?,?)";

    //   connection.query(
    //     sql,
    //     [customer_id, product_id, price, quantity],
    //     function (sqlErr, result, fields) {
    //       if (sqlErr) throw sqlErr;

    //       console.log(result);
    //     }
    //   );
    // });
  },

  ordersList: async function (req, res, next) {
    const sql = "SELECT * FROM orders";

    try {
      // const connection = await database.getConnection();
      const result = await database.getConnection(sql); //[rows,fields]
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },

  exportOrders: function (req, res, next) {
    const sql =
      "SELECT orders.order_time, orders.price, orders.quantity, " +
      "orders.product_name, orders.product_desc, orders.product_image, " +
      "cust.name, cust.phone, cust.email FROM orders orders LEFT JOIN customers cust " +
      "ON orders.id = cust.id ORDER BY orders.id ASC;";

    fileMgmt.exportToFile(res, sql, "orders");
  },
};
