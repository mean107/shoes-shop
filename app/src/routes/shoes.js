const express = require('express');
const Shoe = require('../models/Shoe');

const router = express.Router();

router.get('/', async (req, res) => {
  const shoes = await Shoe.find().sort({ createdAt: -1 });
  res.json(shoes);
});

router.post('/', async (req, res) => {
  try {
    const shoe = await Shoe.create({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      size: req.body.size,
      status: req.body.status
    });

    res.status(201).json(shoe);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const shoe = await Shoe.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        size: req.body.size,
        status: req.body.status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!shoe) {
      return res.status(404).json({
        message: 'Shoe not found'
      });
    }

    res.json(shoe);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const shoe = await Shoe.findByIdAndDelete(req.params.id);

    if (!shoe) {
      return res.status(404).json({
        message: 'Shoe not found'
      });
    }

    res.json({
      message: 'Shoe deleted'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;