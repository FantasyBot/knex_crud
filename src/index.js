const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const logger = require('./logger');
const companies = require('./routes/companies');
const users = require('./routes/users');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const { PORT } = process.env;
const app = express();

// base middlewares
app.use(bodyParser.json({ limit: '100mb' }));

// routing
app.use(...companies);
app.use(...users);

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, `./public/avatars/${req.params.id}`));
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.log(`Example app listening at http://localhost:${PORT}`);
});
