const express = require('express');
const router = express.Router();
const productSchema = require('../models/product');

router.post('/products', (req, res) => {
  const newProduct = productSchema(req.body);
  newProduct
    .save()
    .then((data) => res.json({ success: data }))
    .catch((err) => res.json({ failure: err }));
});

router.get('/products', (req, res) => {
  productSchema
    .find()
    .then((data) => res.json({ success: data }))
    .catch((err) => res.json({ failure: err }));
});

router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  productSchema
    .findById(id)
    .then((data) => res.json({ success: data }))
    .catch((err) => res.json({ failure: err }));
});

router.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = req.body;
  productSchema
    .updateOne({ _id: id }, { $set: product })
    .then((data) => res.json({ success: data }))
    .catch((err) => res.json({ failure: err }));
});

router.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  productSchema
    .deleteOne({ _id: id })
    .then((data) => res.json({ success: data }))
    .catch((err) => res.json({ failure: err }));
});

module.exports = router;
