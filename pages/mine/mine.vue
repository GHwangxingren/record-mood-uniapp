<template>
	<view class="mine-container">
		<!-- 用户信息部分 -->
		<ml-myInfo :user-info="userInfo" :is-login="isLogin" :show-login="true" />
		<!-- 相关操作部分 -->
		<view class="other-wrap">
			<view class="cu-form-group mainColor" @tap="toTimeLine">
				<view class="title">碎碎念</view>
				<text class="cuIcon-right "></text>
			</view>
			<view class="cu-form-group mainColor" @tap="handleEdit">
				<view class="title">编辑资料</view>
				<text class="cuIcon-right"></text>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<button open-type="contact" class="cu-form-group mainColor">
				<view class="title">我的客服</view>
				<text class="cuIcon-right"></text>
			</button>
			<!-- #endif -->
			<view class="cu-form-group mainColor" @tap="handleMoney">
				<view class="title">赞赏作者</view>
				<text class="cuIcon-right"></text>
			</view>
		</view>
	</view>
</template>

<script>
import { backToLogin } from "@/utils/common.js";
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			menuList: [
				{
					name: '喜欢',
					num: 20
				},
				{
					name: '关注',
					num: 8
				},
				{
					name: '粉丝',
					num: 0
				}
			]
		};
	},
	computed: {
		...mapGetters(["userInfo", "isLogin"]),
	},
	methods: {
		goLogin() {
			backToLogin();
		}
	}
};
</script>

<style lang="scss" scoped>
.other-wrap {
	display: flex;
	flex-direction: column;

	.cu-form-group {
		width: 100%;
		border-bottom: 1px solid #ececec !important;

		&::after {
			border: none !important;
		}
	}
}
</style>
