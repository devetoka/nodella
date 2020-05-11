const express = require('express');

const userRouter = express.Router();

//users

userRouter.get('/users', (req,res) => {
    res.send('users');
});

module.exports = userRouter;

