const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRouter = require('./routes/products');

const server = express();
const port = 4000;

server.listen(port, () => console.log(`Server running on port ${port}`));

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(`Error: ${err}`));

server.use(express.json());
server.use('/api', productRouter);
