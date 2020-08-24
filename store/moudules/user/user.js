/**
 * ==========
 * 用户登录等操作
 * ==========
 */
import { initMutations } from "../../utils.js";

const getDefaultState = () => ({
  loginTip: uni.getStorageSync("USER_INFO") ? false : true,
	userInfo: uni.getStorageSync("USER_INFO") ? JSON.parse(uni.getStorageSync("USER_INFO")) : "",
	token: uni.getStorageSync("MARK_TOKEN") || "",
});

const mutations = {
	...initMutations(getDefaultState()),
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