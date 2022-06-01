const axios = require('axios')

const http = baseurl => { 
    const instance = axios.create({
        baseURL: baseurl || '',
        timeout: 3000,
    });

    const post = async (url, body) => {
        try {
            const response = await axion.post(url, body);
            return response;
        } catch (error) {
            console.log(error)
            if (!err.response) return res.sendStatus(500);
            
            return res.sendStatus(401);
        };
    };

    return {post};
};

module.exports = http;