import axios from 'axios';
import { ElMessage } from 'element-plus'; // 使用 Element Plus 的消息组件
import { useAuthStore } from '@/stores/auth'; // 导入 Pinia 的 Auth Store

const http = axios.create({
    baseURL: '/api',
    // baseURL: 'https://acmer.leezekee.top/api',
    timeout: 10000,
});

http.interceptors.request.use(
    config => {
        const authStore = useAuthStore();
        config.headers.Authorization = authStore.getToken;
        // console.log('config:', config); 
        return config;
    },
    error => {
        console.warn(error);
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    response => {
        // 检查响应是否包含数据
        console.log('response:', response);
        if (!response || !response.data) {
            throw new Error('Empty response or missing data');
        }
        const { code, message, token } = response.data;
        if (code === 20021) {
            if (token) {
                const authStore = useAuthStore();
                authStore.token = token; // 存储 token 到 Pinia
                authStore.setToken(token);
            }
            return response;
        } else if (code === 20046) {
            ElMessage.error(message); // 使用 ElMessage 进行错误提示
            const authStore = useAuthStore();
            authStore.logout(); // 登出
            return Promise.reject(new Error(message || '请求失败'));
        } else {
            ElMessage.error(message || '请求失败'); // 使用 ElMessage 进行错误提示
            return Promise.reject(new Error(message || '请求失败'));
        }
    },
    error => {
        // 处理请求错误
        const response = error.response;
        const message = response && response.data ? response.data.message : error.message;
        
        if (response && response.status === 401) {
            ElMessage.error('请先登录'); // 使用 ElMessage 进行错误提示
        } else {
            ElMessage.error(message); // 其他错误提示
        }

        return Promise.reject(new Error(message));
    }
);

function post(url, params = {}) {
    return http({
        url,
        method: 'post',
        data: params,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });
}

function get(url, params = {}) {
    return http({
        url,
        method: 'get',
        params,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });
}

function del(url, params = {}) {
    return http({
        url,
        method: 'delete',
        params,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });
}

function put(url, params = {}) {
    return http({
        url,
        method: 'put',
        data: params,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });
}

function postMultipart(url, params = {}) {
    return http({
        url,
        method: 'post',
        data: params,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data; boundary=' + new Date().getTime()
        }
    });
}

export {
    http,
    post,
    get,
    del,
    put,
    postMultipart
};
