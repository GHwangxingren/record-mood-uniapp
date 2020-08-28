<template>
	<view class="fans-wrap">
		<template v-if="fansList.length">
			<view class="fans-item" v-for="(item, index) in fansList" :key="index">
				<view class="left-wrap">
					<view class="img-wrap flex-center margin-right" @tap="toOthers">
						<image :src="item.avatar" mode="widthFix" class="avatar"></image>
					</view>
					<text>{{ item.name }}</text>
				</view>
				<view :class="['right-btn main-btn', item.isFollow ? 'active-btn' : '']" @tap="handleLike(index)">{{ item.isFollow ? '已关注' : '关注' }}</view>
			</view>
		</template>
		<template v-else>
			<ml-empty />
		</template>
		<ml-loginTip />
	</view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
	data() {
		return {
			fansList: []
		};
	},
	computed: {
		...mapGetters(["isLogin"]),
	},
	onLoad(options) {
		if (options && options.type && options.type == 0) {
			this.fansList = [
				{
					id: 1,
					avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg',
					name: '小不点',
					isFollow: false
				},
				{
					id: 2,
					avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771555881,3104139652&fm=26&gp=0.jpg',
					name: '牛牛',
					isFollow: true
				},
				{
					id: 3,
					avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771555881,3104139652&fm=26&gp=0.jpg',
					name: '牛牛',
					isFollow: true
				},
				{
					id: 4,
					avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771555881,3104139652&fm=26&gp=0.jpg',
					name: 'ddd',
					isFollow: true
				},
			];
			uni.setNavigationBarTitle({
				title: '关注'
			});
		} else {
			uni.setNavigationBarTitle({
				title: '粉丝'
			});
		}
		
		console.log(this.fansList)
	},
	methods: {
		...mapMutations({
			setLoginTip: "user/setLoginTip"
		}),
		toOthers() {
			uni.navigateTo({
				url: './other'
			});
		},
		handleLike(i) {
			if (!this.isLogin) {
				this.setLoginTip(true);
				return;
			}
			
			this.fansList[i].isFollow = !this.fansList[i].isFollow;
		}
	}
};
</script>

<style lang="scss" scoped>
.fans-wrap {
	.fans-item {
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #ffffff;
		border-bottom: 1rpx solid #ececec;

		.left-wrap {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: var(--main-color);

			.img-wrap {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				overflow: hidden;
				border: 1rpx solid #ececec;

				.avatar {
					width: 100%;
					height: 100rpx;
				}
			}
		}

		.right-btn {
			width: 170rpx;
		}
	}
}
</style>
