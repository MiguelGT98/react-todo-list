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
exports.all = (offset, limit) => {
  let data;
  return knex
    .from("products")
    .select("*")
    .offset(offset * limit)
    .limit(limit)
    .then(result => {
      data = result;
      return knex.from("products").count("id as count");
    })
    .then(result => {
      data.count = result;
      return data;
    });
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
    .update({ ...product, updated_at: new Date() });
};

exports.create = product => {
  return knex.from("products").insert({ ...product });
};
