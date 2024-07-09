// main.js

// 导入全局样式文件
import './assets/main.css';

// 导入 Vue 及相关库
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router/index.js';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 创建 Vue 应用实例
const app = createApp(App);

// 使用 Pinia 和路由
app.use(router);
app.use(pinia);

app.use(ElementPlus);

// 挂载应用到 #app 元素
app.mount('#app');
