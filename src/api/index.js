import { post } from './http';

const api = {
    login(params) {
        return post('/user/login', params);
    },
    register(params) {
        return post('/user/register', params);
    }
};

export default api;
