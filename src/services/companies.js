const knex = require('../knex');

const COMPANY_TABLE = 'companies';

module.exports = {
  async getById(id) {
    const item = await knex(COMPANY_TABLE).select('*').where({ id }).first();

    return item;
  },

  async getList() {
    const item = await knex(COMPANY_TABLE).select('*');

    return item;
  },

  async addItem(item) {
    return knex(COMPANY_TABLE).insert(item);
  },

  async updateItem(id, item) {
    return knex(COMPANY_TABLE)
      .update({
        name: item.name || null,
        address: item.address || null,
        type: item.type || null,
        employee: item.employee || null,
      })
      .where({ id });
  },

  async patchItem(id, item) {
    return knex(COMPANY_TABLE).update(item).where({ id });
  },

  async removeItem(id) {
    return knex(COMPANY_TABLE).where({ id }).del();
  },
};
