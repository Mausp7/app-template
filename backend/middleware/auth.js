const auth = ({block}) => (req, res, next) => {
        console.log('Authenticating...');
        const userId = req.headers.authorization;
        res.locals.userId = userId;
        console.log(`Authenticated, _id:  ${userId}`);
        if (block && !res.locals.userId) return res.sendStatus(401);
    
        next();
    };

module.exports = auth;