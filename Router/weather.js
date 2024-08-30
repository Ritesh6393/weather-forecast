const express = require('express');

const { getWeather } = require('../controllers/weatherController');

const router = express.Router();

// Define the route for getting weather information
router.get('/weather', getWeather);

module.exports = router;
