const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const shoeRoutes = require('./routes/shoes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shoes_shop';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/shoes', shoeRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'shoes-shop-api'
  });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Shoes Shop app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });