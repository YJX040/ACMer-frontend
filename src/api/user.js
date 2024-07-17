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
        // console.log(pt);
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
    },
    getRating(params) {
        return get('/user/rating/contests', params);
    },
    getUserRating(params) {
        return get(`/user/rating/contests/${params}`);
    },
    getWeeklyData(params) {
        return get('/user/submissions/weekly', params);
    },
    getUserSubmissions(params) {
        return get('/user/submission', params);
    },
    getUserSubmissionsById(params) {
        return get(`/user/submission/${params.id}`, params);
    }
};

export default api;
