const express = require('express');
const router = express.Router();

const ProductService = require('./../services/product.service');
const ValidatorHandler = require('./../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema');

const service = new ProductService();

router.get('/', async (req, res) => {

  const products = await service.find();
  res.json(products);

});

router.get('/filter', async (req, res) => {

  console.log("I'm a filter");

})

router.get('/:id',
ValidatorHandler(getProductSchema, 'params'),
  async (req, res) => {

      const {id} = req.params;
      const product = await service.findOne(id);

      res.json(product);

  });

router.post('/',
  ValidatorHandler(createProductSchema, 'body')
  ,async (req, res) => {

    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json(newProduct);

});

router.patch('/:id',
ValidatorHandler(getProductSchema, 'params'),
ValidatorHandler(updateProductSchema, 'body'),
async (req, res, next) => {

  const {id} = req.params;
  const body = req.body;
  let product;

  try{

    product = await service.update(id, body);

  } catch (err) {

    next(err)

  }

  res.status(200).json(product);

});

router.delete('/:id', async (req, res) => {

    const {id} = req.params;

    let productDeleted = await service.delete(id);

    res.status(200).json(productDeleted);

});

module.exports = router;
