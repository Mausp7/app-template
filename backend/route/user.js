const router = require('express').Router();
const User = require('../model/user')

router.post('/login', async (req, res) => {
    console.log(req.params)
    const user = new User ({
        username: req.body.username,
        googleId: "2312",

    });

    console.log(user)

    user.save(() => {
        res.send(user);
    });

    /* 
    Receive Google code -> get google token -> get googleId
    googleID exists ? send jwt token : create user and send jwt token
     */
});

module.exports = router;