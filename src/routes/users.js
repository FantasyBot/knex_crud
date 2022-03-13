const express = require('express');

const router = express.Router();

const { getById, getList, addItem, updateItem, patchItem, removeItem } = require('../services/users');
const catchAsync = require('../utils/catchAsync');
const PREFIX = '/user';

router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const user = await getById(id);

    res.json({ status: 'success', info: user });
  }),
);

router.get(
  '/',
  catchAsync(async (req, res) => {
    const users = await getList();
    res.json({ status: 'success', info: users });
  }),
);

router.post(
  '/',
  catchAsync(async (req, res) => {
    const result = await addItem(req.body);

    res.json({ status: 'success', info: result });
  }),
);

router.put(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await updateItem({ ...req.body, id });

    res.json({ status: 'success', info: result });
  }),
);

router.patch(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await patchItem({ ...req.body, id });

    res.json({ status: 'success', info: result });
  }),
);

router.delete(
  '/:id',
  catchAsync(async (req, res, next) => {
    const result = await removeItem(req.params.id);

    res.json({ status: 'success', info: result });
  }),
);

module.exports = [PREFIX, router];
