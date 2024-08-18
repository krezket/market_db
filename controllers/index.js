const router = require('express').Router();

const vendorController = require('./vendorController');

router.use('/vendors', vendorController);

module.exports = router;
