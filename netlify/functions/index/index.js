import postRoutes from '../routes/postRoutes.js';
import dalleRoutes from '../routes/dalleRoutes.js';

const mongoose = require('mongoose');
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();

mongoose
  .set('strictQuery', true)
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());

app.use('/.netlify/functions/index/v1/post', postRoutes);
app.use('/.netlify/functions/index/v1/dalle', dalleRoutes);

app.get('/.netlify/functions/index', async (req, res) => {
  res.send('hello from server');
});

module.exports = app;
module.exports.handler = serverless(app);
