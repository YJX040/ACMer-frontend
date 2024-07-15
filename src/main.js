// main.js

// 导入全局样式文件
import './assets/main.css';

// 导入 Vue 及相关库
import { createApp } from 'vue';
import { createPinia } from 'pinia'; // 导入 Pinia 的 createPinia 方法
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // 导入 pinia-plugin-persistedstate 插件
import App from './App.vue';
import router from './router/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {useAuthStore} from './stores/auth.js';
// 创建 Pinia 实例
const pinia = createPinia();

// 使用 pinia-plugin-persistedstate 插件
pinia.use(piniaPluginPersistedstate);

// 创建 Vue 应用实例
const app = createApp(App);

// 使用 Pinia 和路由
app.use(router);
app.use(pinia);
app.use(ElementPlus);

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth) {
        if (!authStore.isAdmin) {
            next({ name: '404' });
        } else {
            next();
        }
    }
    next();
});

// 挂载应用到 #app 元素
app.mount('#app');
