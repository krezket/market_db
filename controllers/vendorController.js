const router = require('express').Router();
const { Vendor, User, Shop } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const vendors = await Vendor.findAll({
            include: [
                {
                    model: Shop,
                    as: 'shop'
                },
                {
                    model: User,
                    as: 'subscribers'
                },
            ]
        })
        res.json(vendors);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error",
            err
        })
    }
});  

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const newVendor = await Vendor.create(req.body);
        const token = jwt.sign(
            {
                username: newVendor.username,
                vendorId: newVendor.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );
        res.json({
            token,
            user: newVendor
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error creating user",
            err
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Vendor.destroy({
            where: {id: req.params.id}
        });
        res.status(200).json({
            msg: "Deleted"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error deleting user",
            err
        });
    }
});

module.exports = router;
