import { post,get ,put, del } from './http';

const api = {
    updateData(params) {
        return post('/admin/updateData', params);
    },
    getUserList(params) {
        return get('/admin/list', params);
    },
    changeUserList(params) {
        return put('/admin/user/info', params);
    },
    getCFList(params) {
        return get('/admin/cf/list', params);
    },
    deleteCFList(params) {
        return del('/admin/cf/del', params);
    }
};

export default api;
