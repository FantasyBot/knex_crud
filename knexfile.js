require('dotenv').config();

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;

module.exports = {
  client: 'pg',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
