const logger = ('../utils/logger');

const errorHandler  = (err, req, res, next) => { 
    clg(err)
    logger.error(new Error("render error"), err.toString());
    //console.log(err);
    //res.status(500).json("Something went wrong...");
};

module.exports = errorHandler;