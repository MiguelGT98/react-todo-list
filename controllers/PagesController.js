// Importa el modelo de productos
let ProductModel = require("../models/Product");

// Reglas para la respuesta para la petición "/"
exports.homepage = (req, res) => {
  ProductModel.all(req.query.page || 0, 5).then(data => {
    // Guardamos los productos en una variable
    let products = data;
    const n = products.count[0].count;
    const current = req.query.page !== undefined ? parseInt(req.query.page) : 0;
    const count = [];
    for (let i = 0; i < Math.ceil(n / 5); i++) {
      if (current !== i) count.push(i);
    }

    delete products.count;

    // Formateamos price en cada producto
    products = products.map(product => {
      const price = product.price;
      delete product.price;
      return {
        ...product,
        price: Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN"
        }).format(price)
      };
    });
    // Enviamos los datos a la vista
    res.render("pages/homepage", {
      products: products,
      count,
      current
    });
  });
};

// Reglas para la respuesta para la petición "/product/:id"
exports.product = (req, res) => {
  ProductModel.get(req.params.id).then(data => {
    // Guardamos los productos en una variable
    let product = data;
    // Formateamos price en cada producto
    product.price = Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(product.price);
    // Enviamos los datos a la vista
    res.render("pages/product", {
      ...product
    });
  });
};

// Reglas para la respuesta para la petición "/product/:id/edit"
exports.editProduct = (req, res) => {
  ProductModel.get(req.params.id).then(data => {
    // Guardamos los productos en una variable
    let product = data;
    res.render("pages/editProduct", {
      ...product
    });
  });
};

exports.postProduct = (req, res) => {
  if (req.body.delete === "true") {
    const id = req.body.id;

    ProductModel.delete(id).then(data => {
      return res.redirect("/");
    });
  } else if (req.body.edit === "true") {
    const product = req.body;
    const id = req.body.id;
    delete product.edit;
    delete product.id;

    ProductModel.update(id, product)
      .then(data => {
        return ProductModel.all();
      })
      .then(data => {
        return res.redirect("/");
      });
  }
};

exports.newProduct = (req, res) => {
  // Enviamos los datos a la vista
  res.render("pages/newProduct");
};

exports.postNewProduct = (req, res) => {
  const product = req.body;

  ProductModel.create(product)
    .then(data => {
      return ProductModel.all();
    })
    .then(data => {
      return res.redirect("/");
    });
};

// Reglas para la respuesta para la petición "/about"
exports.about = (req, res) => {
  res.send("About us");
};
