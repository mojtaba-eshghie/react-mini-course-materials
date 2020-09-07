const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');

// @route   POST api/users
// @desc    Register a user
// @acceess Public 
router.post('/', [
    // let's add the validation to the second argument
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more characters').isLength({
        min: 6
    })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
    
        const { name, email, password } = req.body;
        try {
            // check if this user does not exist (if exists emit an error)
            let user = await User.findOne({
                email
            })
            if (user) {
                res.status(400).json({msg:'user already exists'});
            }


            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 72000
            }, (err, token) => {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        token
                    });
                }
            })

            //res.send('user saved in the db');
        } catch (error) {
            console.log(error);
            res.status(500).send('server error: ' + error);
        }
    }
);

module.exports = router;