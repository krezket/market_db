const router = require('express').Router();
const { Merchandise } = require('../models');

// GET ALL MERCHANDISE
router.get('/', async (req, res) => {
    try {
        const merchandise = await Merchandise.findAll({})
        res.json(merchandise);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error",
            err
        })
    }
});  

// CREATE MERCHANDISE
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const newMerchandise = await Merchandise.create(req.body);
        res.json({
            merchandise: newMerchandise
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error creating merchandise",
            err
        });
    }
});

// DELETE MERCHANDISE
router.delete('/:id', async (req, res) => {
    try {
        await Merchandise.destroy({
            where: {id: req.params.id}
        });
        res.status(200).json({
            msg: "Deleted"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error deleting merchandise",
            err
        });
    }
});

module.exports = router;


