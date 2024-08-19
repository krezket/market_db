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
            vendor: newVendor
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error creating vendor",
            err
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const vendorData = await Vendor.findOne({ where: {username: req.body.username} });
        if (!vendorData) {
            return res.status(403).json({ msg: "invalid login" });
        } else if ( !bcrypt.compareSync(req.body.password, vendorData.password)) {
            return res.status(403).json({ msg: "invalid login" });
        } else {
            const token = jwt.sign(
                {
                    username: vendorData.username,
                    vendorId: vendorData.id
                },
                process.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            );
            res.json({
                token,
                vendor: vendorData 
            });
        } 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error creating vendor",
            err
        });
    }
});

router.get("/auth/verifytoken", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const foundVendor = await Vendor.findByPk(data.vendorId);
        res.json(foundVendor);
    } catch (err) {
        console.log(err);
        res.status(403).json({ msg: "bad token", err });
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
            msg: "error deleting vendor",
            err
        });
    }
});

module.exports = router;
