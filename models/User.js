const knex = require("../database/connection");
const bcrypt = require("bcrypt");

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.find = id => {
  return knex
    .select("*")
    .from("users")
    .where("id", id)
    .first();
};

/**
 * Encuentra al usuario que tenga el correo indicado
 */
exports.findByEmail = email => {
  return knex
    .select("*")
    .from("users")
    .where("email", email)
    .first();
};

/**
 * Crea al usuario con los datos definidos dentro del objeto user
 */
exports.create = user => {
  // Obtiene la contraseña definida por el usuario
  let pass = user.password;
  // Encripta la contraseña
  pass = bcrypt.hashSync(pass, 10);
  return knex("users").insert({
    name: user.name,
    email: user.email,
    password: pass
  });
};

exports.all = () => {
  return knex.select("*").from("users");
};

exports.generatePasswordLink = email => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return this.findByEmail(email)
    .then(user => {
      if (!user) {
        throw error("Email does not exist in the database.");
      }

      return knex("links").insert({
        email: email,
        valid_until: tomorrow
      });
    })
    .then(id => {
      return `/change-password/${id[0]}`;
    })
    .catch(error => {
      console.log(error);
    });
};

exports.validatePasswordLink = id => {
  return knex
    .select("*")
    .from("links")
    .where("id", id)
    .first()
    .then(result => {
      if (!result || new Date(result.valid_until) < new Date()) {
        return false;
      }

      return true;
    })
    .catch(error => {
      console.log(error);
    });
};

exports.changePassword = (id, user) => {
  return this.validatePasswordLink(id).then(valid => {
    if (valid) {
      // Obtiene la contraseña definida por el usuario
      let pass = user.password;
      // Encripta la contraseña
      pass = bcrypt.hashSync(pass, 10);
      return knex
        .select("*")
        .from("links")
        .where("id", id)
        .first()
        .then(link => {
          return knex("users")
            .where({ email: link.email })
            .update({ password: pass });
        })
        .then(result => {
          if (!result) {
            return false;
          }

          return true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
};

exports.uploadPhoto = (id, path) => {
  return knex("users")
    .where({ id: id })
    .update({ photo: "/" + path });
};
