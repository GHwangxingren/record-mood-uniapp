import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
const path = require('path')

Vue.use(Vuex);
const files = require.context("./moudules", true, /\.js$/);
const modules = {};

// 自动注册方法1
files.keys().forEach(key => {
  let name = path.basename(key, ".js");
  modules[name] = files(key).default || files(key)
});

// 自动注册方法2
// const modules = files.keys().reduce((routes, key) => (routes[key.replace(/(\.\/|\/index\.js$)/g, "")] = files(key).default) && routes, {});

export default new Vuex.Store({
  modules,
  getters
});
