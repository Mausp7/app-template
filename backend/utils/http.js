const axios = require('axios')

const http = baseurl => { 
    const instance = axios.create({
        baseURL: baseurl || '',
        timeout: 3000,
    });

    const post = async (...params) => {
        try {
            const response = await instance.post(...params);
            return response;
        } catch (error) {
            if (!error.response) return error;
            console.log(error.response)
            return error.response;
        };
    };
    const get = async (...params) => {
        try {
            const response = await instance.get(...params);
            
            return response;
        } catch (error) {
            if (!error.response) return error;
            //console.log(error.response)
            return error.response;
        };
    };

    return {post, get};
};

module.exports = http;