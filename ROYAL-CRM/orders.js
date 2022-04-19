const orders = [];

function addOrder() {
  const ordername = process.argv.slice(2);
  if (!ordername || ordername.length === 0) {
    throw `ERROR: order name is empty`;
  }

  orders.push({
    ordername: ordername,
  });

  orders.forEach((order) => {
    console.log(`ok. Order name: ${order.ordername}.`);
  });
}

addOrder();
