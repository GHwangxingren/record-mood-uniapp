/**
 * ==========
 * 路由记录
 * ==========
 */
import { initMutations } from "../../utils.js";

const getDefaultState = () => ({
  currentPage: ""
});

const route = {
	namespaced: true,
	state: getDefaultState(),
	mutations: initMutations(getDefaultState()),
};

export default route;