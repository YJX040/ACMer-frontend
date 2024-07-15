import { post,get ,put, del } from './http';

const api = {
    login(params) {
        return post('/user/login', params);
    },
    register(params) {
        return post('/user/register', params);
    },
    getUserInfo(params) {
        return get('/user/info', params);
    },
    changeUserInfo(params) {
        return put('/user/info', params);
    },
    addSubAccount(params) {
        return post('/user/cf/add', params);
    },
    deleteSubAccount(params) {
        return del('/user/cf/delete', params);
    },
    setMainAccount(params) {
        return post('/user/cf/setMain', params);
    },
    getUserList(params) {
        return get('/user/list', params);
    },
    getUserInfoById(params) {
        return get(`/user/info/${params}`);
    }
};

export default api;