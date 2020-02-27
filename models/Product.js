// Obtiene la conexión con la base de datos
const knex = require("../database/connection");

// Crea un nuevo Producto (pero no lo almacena en la base)
exports.factory = (name, description, price) => {
  return {
    name: name,
    description: description,
    price: price
  };
};

// Obtiene todos los productos en la base
exports.all = () => {
  return knex.from("products").select("*");
};

exports.get = id => {
  return knex
    .from("products")
    .where("id", id)
    .first();
};

exports.delete = id => {
  return knex
    .from("products")
    .where("id", id)
    .del();
};

exports.update = (id, product) => {
  return knex
    .from("products")
    .where("id", id)
    .update({ ...product });
};
