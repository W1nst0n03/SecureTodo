const express = require('express');
const router = express.Router();
const User = require('../models/user');
require('dotenv');

//Delete existing user
router.delete('/delete/:id', async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id);

    res.json({result});
});

//Add new user
router.post('/new', async (req, res) => {
    try {
        //salting password
        const user = new User({
            email: req.body.email,
            username: req.body.username
        }); 
        const response = await user.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//Get user from email
router.get('/email/:email', async (req, res) => {
    try {
        const user = await User.find({email: req.params.email});
        res.json(user);
    } catch(err) {
        res.json(err);
    }
});

module.exports = router;
