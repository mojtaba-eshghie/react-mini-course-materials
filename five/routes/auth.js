const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');

const auth = require('../middleware/auth')

// @route   GET api/auth
// @desc    Get logged-in user 
// @acceess Private 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.msg);
        res.status(500).send('Server Error'); 
    }
});

// @route   POST api/auth
// @desc    Authenticates the user and gets a token
// @acceess Public 
router.post('/', [
    check('email', 'you must include a valid email').isEmail(),
    check('password', 'password is required').exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                msg: 'Invalid Credentials'
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            // The username and password do not match
            return res.status(400).json({ msg: 'invalid credentials...'});
        } else {
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
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error...');
    }
});

module.exports = router;