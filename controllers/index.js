const router = require('express').Router();

const vendorController = require('./vendorController');
const userController = require('./userController');
const shopController = require('./shopController');

router.use('/vendors', vendorController);
router.use('/users', userController);
router.use('/shops', shopController);

module.exports = router;
