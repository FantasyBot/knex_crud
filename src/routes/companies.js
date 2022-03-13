const express = require('express');

const { getById, getList, addItem, updateItem, patchItem, removeItem } = require('../services/companies');

const router = express.Router();

const PREFIX = '/companies';

router.get('/:id', async (req, res) => {
  const company = await getById(req.params.id);

  if (!company) {
    res.sendStatus(404);
    return;
  }

  res.send(company);
});

router.get('/', async (req, res) => {
  const companies = await getList();

  res.send(companies);
});

router.post('/', async (req, res) => {
  await addItem(req.body);

  res.sendStatus(201);
});

router.put('/:id', async (req, res) => {
  await updateItem(req.params.id, req.body);

  res.sendStatus(200);
});

router.patch('/:id', async (req, res) => {
  await patchItem(req.params.id, req.body);

  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  await removeItem(req.params.id);

  res.sendStatus(200);
});

module.exports = [PREFIX, router];
