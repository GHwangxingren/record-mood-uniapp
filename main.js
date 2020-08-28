import Vue from 'vue';
import App from './App';
// 挂载全局状态管理
import store from './store/index.js';
import sa from 'sa-sdk-miniprogram'; // 神策埋点包
Vue.prototype.$store = store

Vue.config.productionTip = false;

// 神策埋点
sa.setPara({
    name: 'sensors',
    server_url: '数据接收地址',
    // 全埋点控制开关
    autoTrack: false,
    // 自定义渠道追踪参数，如source_channel: ["custom_param"]
    source_channel: [],
    // 是否允许控制台打印查看埋点数据(建议开启查看)
    show_log: true,
    // 程序中是否使用批量发送数据功能(默认情况下，会每隔 6s 或者每采集 6 条数据后合并发送一次)
    batch_send: {
        send_timeout: 10000,
        max_length: 10
    },
    // 是否允许修改onShareAppMessage里return的path，用来增加(用户id，分享层级，当前的path)，在app onShow中自动获取这些参数来查看具体分享来源，层级等
    allow_amend_share_path: true
    });
    // init方法调用之前使用 registerApp() 方法设置公共属性。
    sa.registerApp({
    platformType: 'MP_Wechat', // 平台类型
    UserTag: '' // 用户标签
});
// sa.init(); // 埋点开关

// this.sensors.login(_data.districtId); // 可在登录后替换id
// this.sensors.registerApp({
//     UserTag: _data.entryMode + "" // 可在登录后替换用户标签
// });

App.mpType = 'app';

const app = new Vue({
    ...App
});

app.$mount();
