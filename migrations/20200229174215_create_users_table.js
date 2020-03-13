exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 512).notNullable();
      table.timestamps(true, true);
      table
        .string("role", 255)
        .notNullable()
        .defaultsTo("user");
      table.string("photo", 255).notNullable();
    })
    .createTable("links", table => {
      table.increments("id");
      table.string("email", 255).notNullable();
      table.timestamp("valid_until").notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users").dropTable("links");
};
