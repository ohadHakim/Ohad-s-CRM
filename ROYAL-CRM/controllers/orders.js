const database = require("./database");

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

    // (req, res, next) {
    //   pool.getConnection(function (connErr, connection) {
    //     if (connErr) throw connErr;
    //     const sql = "SELECT * FROM orders";

    //     connection.query(sql, function (sqlErr, result, fields) {
    //       if (sqlErr) throw sqlErr;

    //       res.send(result);
    //     });
    //   });

    // this.orders.forEach((order) => {
    //   console.log(`ok. Order name: ${order.ordername}.`);
    // });
  },
};
