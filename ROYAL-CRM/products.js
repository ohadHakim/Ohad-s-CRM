const products = [];

function addProduct() {
  const productname = process.argv.slice(2);
  if (!productname || productname.length === 0) {
    throw `ERROR: product name is empty`;
  }

  products.push({
    productname: productname,
  });

  products.forEach((product) => {
    console.log(`ok. Product name: ${product.productname}.`);
  });
}

addProduct();
