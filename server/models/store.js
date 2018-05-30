const mongoose = require('mongoose');
const config = require('../config/database');

// Store Schema
const StoreScheme = mongoose.Schema({
  
    name: {
      type: String
    },
    image: {
      type: String
    },
    price: {
      type: Number
    },
    category: {
      id: {
        type: Number
      },
      name: {
        type: String
      }
    },
    brand: {
      type: String
    }

});

const Store = module.exports = mongoose.model('Store', StoreScheme);



