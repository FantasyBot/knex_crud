const knexConfigs = require('../knexfile');
const knex = require('knex')(knexConfigs);

module.exports = knex;
