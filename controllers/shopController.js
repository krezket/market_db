const router = require('express').Router();
const { Shop, Merchandise } = require('../models');

// GET ALL SHOPS
router.get('/', async (req, res) => {
    try {
        const shops = await Shop.findAll({
            include: [
                {
                    model: Merchandise,
                    as: 'merchandise'
                },
            ]
        })
        res.json(shops);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error",
            err
        })
    }
});  

// CREATE A SHOP
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const newShop = await Shop.create(req.body);
        res.json({
            shop: newShop
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error creating shop",
            err
        });
    }
});

// DELETE A SHOP
router.delete('/:id', async (req, res) => {
    try {
        await Shop.destroy({
            where: {id: req.params.id}
        });
        res.status(200).json({
            msg: "Deleted"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error deleting shop",
            err
        });
    }
});

module.exports = router;

