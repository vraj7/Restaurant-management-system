const express = require('express');
const router = express.Router();

const restController = require('./../controllers/restaurant');

router.route('/')
    .get(restController.getAllRestaurants)
    .post(restController.postRestaurants);

module.exports = router;
