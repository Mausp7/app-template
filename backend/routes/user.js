require('dotenv').config();
const router = require('express').Router();
const User = require('../models/user');
const httpModule = require('../utils/http');
const http = httpModule('');
const jwt = require('jsonwebtoken');

const config = {
    google: { //https://accounts.google.com/o/oauth2/v2/auth?client_id=423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com&response_type=code&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&prompt=select_account&flowName=GeneralOAuthFlow
        clientId : "423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com",
        clientSecret: "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",
        redirectUri: "http://localhost:3000/callback",
        tokenEndpoint: "https://oauth2.googleapis.com/token",
        grantType: "authorization code",
        userTokenEndpoint: null,
        userId: null

    },
    github: { //https://github.com/login/oauth/authorize?client_id=758b2d68f96a29a72f44&response_type=code&scope=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fredirect&prompt=select_account&flowName=GeneralOAuthFlow
        clientId : "758b2d68f96a29a72f44",
        clientSecret: "23383634d7829012811d7688d01b64f077c6aad9",
        redirectUri: "http://localhost:3000/redirect",
        tokenEndpoint: "https://github.com/login/oauth/access_token",
        grantType: "authorization code",
        userTokenEndpoint: "https://api.github.com/user",
        userId: "id"
    }
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
        //"scope": config[provider].scope
    }, {
        headers: {
            "Accept": "application/json",
        }
    });

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);

    const onlyOauth = !response.data.id_token;
    let openId;
    if (onlyOauth) {
        const userResponse = await http.get(config[provider].userTokenEndpoint, {
            headers: {
                Authorization: `Bearer ${response.data.access_token}`
            }
        });
        if (!userResponse) return res.sendStatus(500);
        if (userResponse.status !== 200) return res.sendStatus(401);
        // console.log(userResponse.data)    
        openId = userResponse.data[config[provider].userId];
    } else {
        const decoded = jwt.decode(response.data.id_token);
        if (!decoded) return res.sendStatus(500);
        console.log(decoded)
        // openId = decoded.sub
    };

    // console.log(openId)

    const user = await User.findOneAndUpdate({[`providers.${provider}`]: openId}, {
        providers: {
            [provider]: openId,
        }
    }, {upsert: true, new: true});

    const token = jwt.sign({"userId": user._id, "providers": user.providers}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.json(token);
});

module.exports = router;