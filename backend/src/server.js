const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRouter = require('./routes/products');

const server = express();
const port = 4000;

server.use(cors());
server.use(express.json());
server.use('/api', productRouter);

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(`Error: ${err}`));

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(port, () => console.log(`Server running on port ${port}`));
