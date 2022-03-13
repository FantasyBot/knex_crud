const knex = require('../knex');
const checkBase64 = require('../utils/checkBase64');
const USERS_TABLE = 'users';
const fs = require('fs');
const res = require('express/lib/response');

module.exports = {
  async getById(id) {
    const user = await knex(USERS_TABLE).select('*').where({ id }).first();
    if (user) {
      return user;
    }
    res.status(404);
    throw new Error('Can not get user!');
  },

  async getList() {
    const users = await knex(USERS_TABLE).select('*');
    if (!users) {
      res.status(404);
      throw new Error('Can not get users!');
    }
    return users;
  },

  async addItem(body) {
    const base64String = body?.avatar;
    if (!base64String) {
      res.status(400);
      throw new Error('User register failed! Upload base64..');
    }
    const checked = checkBase64(base64String);
    if (checked === 'failed') {
      res.status(400);
      throw new Error('User register failed');
    }

    await knex(USERS_TABLE).insert({ ...body, avatar: checked });
    res.status(201);
    return 'created';
  },

  async updateItem(data) {
    const dbData = await knex(USERS_TABLE).select('*').where({ id: data.id }).first();
    if (!dbData) {
      res.status(404);
      throw new Error('User not found');
    }
    const { username, email, avatar, age, phone } = dbData;

    if (data?.avatar) {
      const checked = checkBase64(data.avatar);
      if (checked === 'failed') {
        res.status(400);
        throw new Error('Invalid input type');
      }

      // Delete file in public dir...
      const filePath = `${process.cwd()}/src/public/avatars/${avatar}`;
      fs.unlinkSync(filePath);

      await knex(USERS_TABLE)
        .update({
          username: data?.username || username,
          email: data?.email || email,
          avatar: checked,
          age: data?.age || age,
          phone: data?.phone || phone,
        })
        .where({ id: data.id });
      res.status(200);
      return 'user updated';
    }

    await knex(USERS_TABLE)
      .update({
        username: data?.username || username,
        email: data?.email || email,
        avatar,
        age: data?.age || age,
        phone: data?.phone || phone,
      })
      .where({ id: data.id });

    res.status(200);
    return 'user updated';
  },

  async patchItem(data) {
    const dbData = await knex(USERS_TABLE).select('*').where({ id: data.id }).first();

    if (!dbData) {
      res.status(404);
      throw new Error('User not found');
    }
    const { avatar } = dbData;
    if (data?.avatar) {
      const checked = checkBase64(data.avatar);
      if (checked === 'failed') {
        res.status(400);
        throw new Error('Invalid input type');
      }
      // Delete file in public dir...
      const filePath = `${process.cwd()}/src/public/avatars/${avatar}`;
      fs.unlinkSync(filePath);

      await knex(USERS_TABLE)
        .update({ ...data, avatar: checked })
        .where({ id: data.id });

      res.status(200);
      return 'user updated';
    }
    await knex(USERS_TABLE).update(data).where({ id: data.id });
    res.status(200);
    return 'user updated';
  },

  async removeItem(id) {
    const dbData = await knex(USERS_TABLE).select('*').where({ id }).first();
    if (!dbData) {
      res.status(404);
      throw new Error('User not found');
    }
    const { avatar } = dbData;
    await knex(USERS_TABLE).where({ id }).del();

    // Delete file in public dir...
    const filePath = `${process.cwd()}/src/public/avatars/${avatar}`;
    fs.unlinkSync(filePath);

    res.status(200);
    return 'user deleted';
  },
};
