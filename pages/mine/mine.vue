<template>
	<view class="mine-container">
		<!-- 用户信息部分 -->
		<ml-myInfo :user-info="userInfo" :is-login="isLogin" :show-login="true" @change="handleMenu" />
		<!-- 相关操作部分 -->
		<view class="other-wrap">
			<view class="cu-form-group mainColor" @tap="handleRoute('timeLine')">
				<view class="title">时光穿梭</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="cu-form-group mainColor" @tap="handleRoute('infoEdit')">
				<view class="title">编辑资料</view>
				<text class="cuIcon-right"></text>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<button class="cu-form-group mainColor" @tap="makePhone">
				<view class="title">我的客服</view>
				<text class="cuIcon-right"></text>
			</button>
			<!-- #endif -->
			<view class="cu-form-group mainColor" @tap="handleMoney">
				<view class="title">赞赏作者</view>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<ml-loginTip />
	</view>
</template>

<script>
import { backToLogin, makePhone, preview } from "@/utils/common.js";
import { mapGetters, mapMutations } from "vuex";

export default {
	data() {
		return {
			makePhone,
			menuList: [
				{
					name: "喜欢",
					num: 20
				},
				{
					name: "关注",
					num: 8
				},
				{
					name: "粉丝",
					num: 1
				}
			]
		};
	},
	computed: {
		...mapGetters(["userInfo", "isLogin"]),
	},
	methods: {
		...mapMutations({
			setLoginTip: "user/setLoginTip"
		}),
		goLogin() {
			backToLogin();
		},
		handleRoute(path) {
			if (!this.isLogin) {
				this.setLoginTip(true);
				return;
			}
			
			uni.navigateTo({
				url: `/pages/mine/${path}`
			});
		},
		handleMoney() {
			let img = ["https://xing-picture.oss-cn-beijing.aliyuncs.com/reword_code.jpg"];
			
			preview(img, 0).then(res => {
				console.log(res)
			});
		},
		handleMenu(index) {
			switch (index) {
				case 0:
					uni.navigateTo({
						url: "./collect"
					});
					break;
				case 1:
					uni.navigateTo({
						url: './fans?type=' + 0
					});
					break;
				case 2:
					uni.navigateTo({
						url: './fans?type=' + 1
					});
					break;
			}
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
