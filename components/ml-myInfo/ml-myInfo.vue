<template>
	<view class="info-wrap">
		<view class="top-box flex-center"><image :src="avatarUrl" mode="widthFix" class="filter"></image></view>
		<view class="mine-top">
			<view class="avatar-wrap">
				<view class="avatar flex-center"><image :src="avatarUrl" mode="widthFix" class="img"></image></view>
				<view
					v-if="userInfo.gender !== undefined"
					class="cu-tag badge ycShake"
					:class="userInfo.gender == 0 ? 'cuIcon-female bg-pink' : 'cuIcon-male bg-blue'"
				></view>
				<view v-if="showLogin && !isLogin" class="login-text" @tap="goLogin">请登录</view>
				<view v-else class="name">
					<p>{{ userInfo.nickName }}</p>
					<p class="motto">哪有人会是一张白纸啊，大家都是带着爱与恨、往事与阴影活着。有的人藏得深有的人藏不住而已</p>
				</view>
			</view>
		</view>
		<view class="top-menu">
			<view class="menu-box flex-center" v-for="(item, index) in menuList" :key="index" @tap="handleMenu(index)">
				<text class="title">{{ userInfo ? item.num : '*' }}</text>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { backToLogin } from "@/utils/common.js";
	import { mapMutations } from "vuex";
	
	export default {
		props: {
			// 动态传入的信息，包括自己和他人
			userInfo: [Object, String],
			// 是否登录
			isLogin: {
				type: Boolean,
				default: false
			},
			// 是否需要登录，区分引用页面
			showLogin: {
				type: Boolean,
				default: false
			}
		},
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
			avatarUrl() {
				if (this.userInfo.avatarUrl) {
					return this.userInfo.avatarUrl;
				}
				
				return "https://xing-picture.oss-cn-beijing.aliyuncs.com/avator.png";
			}
		},
		methods: {
			...mapMutations({
				setLoginTip: "user/setLoginTip"
			}),
			goLogin() {
				backToLogin();
			},
			handleMenu(index) {
				if (!this.isLogin && this.showLogin) {
					this.setLoginTip(true);
					return;
				}
				
				this.$emit("change", index);
			}
		}
	}
</script>

<style lang="scss">
.info-wrap {
	position: relative;
	margin-bottom: 100rpx;

	.top-box {
		position: absolute;
		top: 0;
		width: 100%;
		height: 400rpx;
		overflow: hidden;
		border-radius: 0 0px 100rpx 100rpx;

		.filter {
			width: 100%;
			filter: brightness(0.8) blur(10rpx);
		}
	}

	.mine-top {
		position: relative;
		@include flex-box();
		flex-direction: column;
		padding: 40rpx 20rpx;
		border-radius: 0 0px 100rpx 100rpx;
		height: 400rpx;

		.avatar-wrap {
			position: relative;
			@include flex-box("");
			width: 100%;
			padding: 0 40rpx 20rpx;

			.cu-tag {
				top: 0;
				left: 110rpx;
			}

			.avatar {
				position: relative;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;

				.img {
					width: 100%;
					height: 100rpx;
					overflow: hidden;
					border-radius: 50%;
				}
			}

			.name {
				width: 520rpx;
				overflow: hidden;
				font-size: 36rpx;
				color: var(--white-color);
				padding-left: 40rpx;

				.motto {
					@extend %text-overflow;
					font-size: 24rpx;
					padding: 20rpx 0;
				}
			}
			
			.login-text {
				padding-left: 40rpx;
				font-size: 40rpx;
				font-weight: var(--font-wight-6);
				color: var(--black-color);
				letter-spacing: 6rpx;
			}
		}

		.fans-item {
			display: flex;
			align-items: center;
			width: 100%;

			.item {
				display: flex;
				flex-direction: column;
				flex: 1;
				color: var(--white-color);
				text-align: center;
				font-size: 32rpx;

				.title {
					font-size: 32rpx;
					font-family: aliM;
					padding-top: 20rpx;
				}
			}
		}
	}

	.top-menu {
		@include flex-box(space-around);
		position: absolute;
		right: 40rpx;
		left: 40rpx;
		bottom: -80rpx;
		height: 180rpx;
		padding: 40rpx;
		color: var(--main-color);
		background-color: var(--white-color);
		border-radius: 16rpx;
		line-height: 46rpx;
		text-align: left;
		font-size: 28rpx;

		.menu-box {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 24rpx;

			.title {
				color: var(--active-color);
				font-size: 48rpx;
				padding-bottom: 20rpx;
			}
		}
	}
}
</style>
