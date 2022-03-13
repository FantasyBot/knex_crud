exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('avatar');
    table.integer('age');
    table.string('phone');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
