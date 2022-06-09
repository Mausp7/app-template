
const jwt = require('jsonwebtoken');

const auth = ({block}) => (req, res, next) => {
        // console.log('Authenticating...');
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (error, user) => {
            if (error && block) return res.status(401).sendStatus(error);

            if (block && !user) return res.sendStatus(401);

            res.locals.user = user;
            next();
        });
        // console.log(`Authenticated, _id:  ${user}`);
        
    
    };

module.exports = auth;