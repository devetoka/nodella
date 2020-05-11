const express = require('express');
const router = express.Router();
const RouteServiceProvider = require('../ServiceProviders/RouteServiceProvider');
const routeManager = new RouteServiceProvider();

router.all('*', routeManager.router);

module.exports = router;