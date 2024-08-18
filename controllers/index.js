const router = require('express').Router();

const vendorController = require('./vendorController');
const userController = require('./userController');
const shopController = require('./shopController');
const merchandiseController = require('./merchandiseController');

router.use('/vendors', vendorController);
router.use('/users', userController);
router.use('/shops', shopController);
router.use('/merchandise', merchandiseController);

module.exports = router;
