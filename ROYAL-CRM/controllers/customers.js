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

const customers = {
  // list: [],

  addCostumers: function (name, phone, email, country_id) {
    // const name = process.argv.slice(2);
    if (!name || name.length === 0) {
      throw `ERROR: name is empty`;
    }

    // this.list.push({
    //   name: name,
    //   id: this.list.length,
    // });

    pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr;
      const sql =
        "INSERT INTO customers(name,phone,email,country_id) VALUES (?,?,?,?)";

      connection.query(
        sql,
        [name, phone, email, country_id],
        function (sqlErr, result, fields) {
          if (sqlErr) throw sqlErr;
          console.log(fields);
          console.log(result);
        }
      );
    });
  },
  customersList: function (req, res) {
    // this.list.forEach((customer) => {
    //   console.log(`ok. name: ${customer.name} was created.`);
    // });

    pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr;
      const sql =
        "SELECT customers.name AS customer_name, customers.email,customers.phone,countries.name AS country_name FROM customers, countries WHERE customers.country_id=countries.id";

      connection.query(sql, function (sqlErr, result, fields) {
        if (sqlErr) throw sqlErr;

        return res.send(result);
      });
    });
  },
};

module.exports = customers;
