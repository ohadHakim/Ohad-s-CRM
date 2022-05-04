module.exports = {
  orders: [],

  addOrder: function () {
    const ordername = process.argv.slice(2);
    if (!ordername || ordername.length === 0) {
      throw `ERROR: order name is empty`;
    }

    this.orders.push({
      ordername: ordername,
      id: this.orders.length,
    });
  },
  ordersList: function () {
    this.orders.forEach((order) => {
      console.log(`ok. Order name: ${order.ordername}.`);
    });
  },
};
