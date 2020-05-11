const express = require('express');

const adminRouter = express.Router();

//users

adminRouter.get('/admins', (req,res) => {
    res.send('admins');
});

module.exports = adminRouter;

