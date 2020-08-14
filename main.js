import Vue from 'vue';
import App from './App';
// 挂载全局状态管理
import store from './store/index.js';
Vue.prototype.$store = store

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});

app.$mount();
