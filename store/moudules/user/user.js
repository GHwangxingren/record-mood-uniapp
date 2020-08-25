/**
 * ==========
 * 用户登录等操作
 * ==========
 */
import { initMutations } from "../../utils.js";

const getDefaultState = () => ({
  loginTip: false,
	isLogin: uni.getStorageSync("MARK_TOKEN") ? true : false,
	userInfo: uni.getStorageSync("USER_INFO") ? JSON.parse(uni.getStorageSync("USER_INFO")) : "",
	token: uni.getStorageSync("MARK_TOKEN") || "",
});

const mutations = {
	...initMutations(getDefaultState()),
	setToken(state, payload) {
		state.token = payload;
		uni.setStorageSync("MARK_TOKEN", payload);
	},
	setUserInfo(state, payload) {
		state.userInfo = payload;
		uni.setStorageSync("USER_INFO", JSON.stringify(payload));
	}
}

const user = {
	namespaced: true,
	state: getDefaultState(),
	mutations
};

export default user;