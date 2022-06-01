require('dotenv').config();
const router = require('express').Router();
const User = require('../models/user');
const httpModule = require('../utils/http');
const http = httpModule('');
const jwt = require('jsonwebtoken');

const config = {
    google: {
        clientId : "",
        clientSecret: "secret",
        redirectURI: "",
        tokenEndpoint: "",
        grantType: "authorization code",
    },
};

router.post('/login', async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const code = req.body.code;
    const provider = req.body.provider;

    if (!code || !provider) return res.sendStatus(400);
    if (!Object.keys(config).includes(provider)) return res.sendStatus(400);

    const response = await http.post(config[provider].tokenEndpoint, {
        "code": code,
        "client_id": config[provider].clientId,
        "client_secret": config[provider].clientSecret,
        "redirect_uri": config[provider].redirectUri,
        "grant_type": "authorization_code",
    });

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);

    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);

    const user = await User.findOneAndUpdate({[`providers.${provider}`]: decoded.sub}, {
        providers: {
            [provider]: decoded.sub,
        }
    }, {upsert: true}, (err, doc) => {
        if (err) return res.status(500).json({error: err});
    });

    const token = jwt.sign({"userId": user._id, "providers": user.providers}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.json(token);
});

module.exports = router;