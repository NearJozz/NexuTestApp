// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const Model = require('../models/car');
const Brand = require('../models/brand');

// Obtener todas las marcas
router.get('/brands', async (req, res) => {
  try {
      const brands = await Brand.find({})
      console.log(brands)
      res.json(brands);
  } catch (err) {
      res.status(500).send(err);
  }
});

// GET /brands/:id/models
router.get('/brands/:id/models', async (req, res) => {
  try {
      const brand = await Brand.findById(req.params.id);
      if (!brand) {
          return res.status(404).send('Brand not found');
      }
      const models = await Model.find({ brand_name: brand.name });
      res.json(models);
  } catch (err) {
      res.status(500).send(err);
  }
});

// POST /brands
router.post('/brands', async (req, res) => {
  try {
      const brand = new Brand(req.body);
      await brand.save();
      res.status(201).json(brand);
  } catch (err) {
      res.status(400).send(err);
  }
});

// POST /brands/:id/models
router.post('/brands/:id/models', async (req, res) => {
  try {
      const brand = await Brand.findById(req.params.id);
      if (!brand) {
          return res.status(404).send('Brand not found');
      }

      const modelExists = await Model.findOne({ name: req.body.name, brand_name: brand.name });
      if (modelExists) {
          return res.status(400).send('Model name must be unique within the brand');
      }
      let input={
        name: req.body.name,
        brand_name: brand.name,
      }
      if(req.body.average_price!=undefined){
        console.log(req.body.average_price)
        if(parseFloat(req.body.average_price)>100000){
          input.average_price=parseFloat(req.body.average_price)
        }else{
          return res.status(400).send('average_price must be greater than 100,000');
        }
      }
      const model = new Model({ ...input });
      await model.save();
      res.status(201).json(model);
  } catch (err) {
      res.status(400).send(err);
  }
});

// PUT /models/:id
router.put('/models/:id', async (req, res) => {
  try {
      if(req.params.average_price!=undefined){
        if(parseFloat(req.params.average_price)<100000){
          return res.status(404).send('Average price must be greater than 100,000');
        }
      }
      const model = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!model) {
          return res.status(404).send('Model not found');
      }
      res.json(model);
  } catch (err) {
      res.status(400).send(err);
  }
});

// GET /models
router.get('/models/:greater?/:lower?', async (req, res) => {
  try {
      let queryBuild={}
      if(req.query.greater!=undefined ||req.query.lower!=undefined ){
        queryBuild.average_price={}
        if(req.query.greater!=undefined ){
          queryBuild.average_price['$gt']=parseFloat(req.query.greater)
        }
        if(req.query.lower!=undefined ){
          queryBuild.average_price['$lt']=parseFloat(req.query.lower)
        }
      }
      console.log(queryBuild)
      const models = await Model.find(queryBuild);
      res.json(models);
  } catch (err) {
      res.status(500).send(err);
  }
});

module.exports = router;