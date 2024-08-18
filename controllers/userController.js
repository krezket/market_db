const router = require('express').Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({})
        res.json(users);
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
        const newUser = await User.create(req.body);
        const token = jwt.sign(
            {
                username: newUser.username,
                userId: newUser.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );
        res.json({
            token,
            user: newUser
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
        await User.destroy({
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
