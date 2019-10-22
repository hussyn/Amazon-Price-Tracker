const { checkLoggedIn } = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/User');
const express = require('express');
const router = express.Router();

router.get('/current', checkLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    // validate the request body first
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });

    //find an existing user
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ msg: 'User already registered.' });
    user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    user.password = await bcrypt.hash(user.password, 10);

    try {
        await user.save();
    } catch (err) {
        console.log(err.message);
        return res.status(400).send({ msg: err.message });
    }

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        _id: user._id,
        username: user.username,
        email: user.email
    });
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ msg: 'Invalid username or password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({ msg: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(password, user.password, isPasswordValid);
    if (!isPasswordValid) {
        return res.status(400).send({ msg: 'Invalid username or password' });
    }

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        _id: user._id,
        username: user.username,
        email: user.email
    });
});

module.exports = router;