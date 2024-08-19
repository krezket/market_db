const router = require('express').Router();
const { User, Vendor, Merchandise } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Vendor,
                    as: 'subscriptions'
                },
                {
                    model: Merchandise,
                    as: 'basket',
                },
            ]
        })
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error",
            err
        })
    }
});  
router.get("/:id", async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Vendor,
                    as: 'subscriptions'
                },
                {
                    model: Merchandise,
                    as: 'basket',
                },
            ]
        });

        if (!userData) {
            return res.status(404).json({ msg: "no such user" });
        }

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "womp womp", err });
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

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            return res.status(403).json({ msg: "invalid login" });
        } else if (!bcrypt.compareSync(req.body.password, userData.password)) {
            return res.status(403).json({ msg: "invalid login" });
        } else {
            const token = jwt.sign(
                {
                    username: userData.username,
                    userId: userData.id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            );
            res.json({
                token,
                user: userData
            });
        } 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "error creating user",
            err
        });
    }
});

router.get("/auth/verifytoken", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await User.findByPk(data.userId);
        res.json(foundUser);
    } catch (err) {
        console.log(err);
        res.status(403).json({ msg: "bad token", err });
    }
});

router.put('/subscribe/:id', async (req, res) => {
    const userId = req.params.id;
    const vendorId = req.body.subscribe_id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found"})
        }
        
        const vendor = await Vendor.findByPk(vendorId);
        if (!vendor) {
            return res.status(404).json({ msg: "Vendor not found"})
        }

        await user.addSubscription(vendor);

        await vendor.addSubscriber(user);

        res.json({ msg: 'Subscription added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});
router.put('/unsubscribe/:id', async (req, res) => {
    const userId = req.params.id;
    const vendorId = req.body.subscribe_id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found"})
        }
        
        const vendor = await Vendor.findByPk(vendorId);
        if (!vendor) {
            return res.status(404).json({ msg: "Vendor not found"})
        }

        await user.removeSubscription(vendor);

        await vendor.removeSubscriber(user);

        res.json({ msg: 'Subscription removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/addmerch/:id', async (req, res) => {
    const userId = req.params.id;
    const merchId = req.body.merch_id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found"})
        }
        
        const merch = await Merchandise.findByPk(merchId);
        if (!merch) {
            return res.status(404).json({ msg: "Merch not found"})
        }

        await user.addBasket(merch);

        res.json({ msg: 'Merch added to basket' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});
router.put('/removemerch/:id', async (req, res) => {
    const userId = req.params.id;
    const merchId = req.body.merch_id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found"})
        }
        
        const merch = await Merchandise.findByPk(merchId);
        if (!merch) {
            return res.status(404).json({ msg: "Merch not found"})
        }

        await user.removeBasket(merch);

        res.json({ msg: 'Merch removed from basket' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
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
