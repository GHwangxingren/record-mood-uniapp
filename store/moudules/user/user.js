/**
 * ==========
 * 用户登录等操作
 * ==========
 */
import { initMutations } from "../../utils.js";

const getDefaultState = () => ({
  loginTip: true,
	token: uni.getStorageSync("MARK_TOKEN"),
});

const user = {
	namespaced: true,
	state: getDefaultState(),
	mutations: initMutations(getDefaultState()),
	actions: {
	
	}
};

export default user;