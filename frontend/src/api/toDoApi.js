import axios from 'axios';

export const toDoApi = () => { 
    const instance = axios.create({
        baseURL: 'http://localhost:4000/api',
        timeout: 3000,
    });

    const post = async (path, data) => {
        try {
            const response = await instance.post(path, data, {headers: {
                authorization: localStorage.getItem("tokenJWT")
            }}
);
            return response;
        } catch (error) {
            if (!error.response) return error;
            //console.log(error.response)
            return error.response;
        };
    };
    const get = async (path, data) => {
        try {
            const response = await instance.get(path, data);
            
            return response;
        } catch (error) {
            if (!error.response) return error;
            //console.log(error.response)
            return error.response;
        };
    };

    return {post, get, _instance: instance};
};
