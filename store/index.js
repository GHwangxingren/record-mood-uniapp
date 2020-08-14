import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
const path = require('path')

Vue.use(Vuex);
const files = require.context("./moudules", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  let name = path.basename(key, ".js")
  modules[name] = files(key).default || files(key)
});

export default new Vuex.Store({
  modules,
  getters
});
