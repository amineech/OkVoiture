const express = require('express');
const router = express.Router();

// controller
const ReservationController = require('../Controllers/ReservationController');

router.post('/reservations/add', ReservationController.addReservation);

router.get('/reservations/list', ReservationController.displayReservations);

router.post('/reservations/delete', ReservationController.deleteReservation);

router.get('/reservations/filter/:designation', ReservationController.findReservationsByDesignation);

module.exports = router;