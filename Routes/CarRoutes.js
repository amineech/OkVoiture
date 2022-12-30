const express = require('express');
const router = express.Router();

// controller
const CarController = require('../Controllers/CarController');

router.post('/cars/create', CarController.addCar);

router.get('/cars/list', CarController.displayCars);

router.get('/cars/detail/:id', CarController.findCarById);

module.exports = router;