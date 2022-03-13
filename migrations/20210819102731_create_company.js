exports.up = async (knex) => {
  await knex.schema.createTable('companies', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('address').notNullable();
    table.string('type');
    table.integer('employee');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('companies');
};
