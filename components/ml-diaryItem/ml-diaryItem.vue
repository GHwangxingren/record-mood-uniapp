<template>
	<view :class="['card-item', radius ? 'radius' : '']">
		<view class="item-head">
			<view class="ih-left">
				<view class="img-avatar flex-center">
					<image :src="item.avatarUrl" mode="widthFix" class="img"></image>
				</view>
				<view class="head-name">{{ item.nickName }}</view>
			</view>
			<view class="ih-time">{{ item.createTime }}</view>
		</view>
		<view class="item-content" @tap="diaryDetail(item.id)">
			<!-- 文字 -->
			<view class="ic-title">{{ item.title }}</view>
			<!-- 图片 -->
			<view class="ic-img-box">
				<view v-if="item.imgList.length === 1" class="img-one">
					<block v-for="(img, index) in item.imgList" :key="index">
						<image class="img" :src="img.url" mode="widthFix" @tap.stop="previewImage(item.imgList, index)"></image>
					</block>
				</view>
				<view v-if="item.imgList.length > 1" class="img-list">
					<view class="img-box" v-for="(img, index) in item.imgList" :key="index">
						<image class="img" :src="img.url" mode="widthFix" @tap.stop="previewImage(item.imgList, index)"></image>
					</view>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="ic-button">
				<view class="btn-item flex-center">
					<image class="img" src="/static/img/diary/img_say.png" mode="widthFix"></image>
					<text>{{ item.commentNum }}</text>
				</view>
				<view class="btn-item flex-center" @tap.stop="handleLike">
					<image class="img" :src="!item.isLike ? '/static/img/diary/img_zan.png' : '/static/img/diary/img_zan_1.png'" mode="widthFix"></image>
					<text>{{ item.likeNum }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { preview } from "@/utils/common.js";
	
	export default {
		props: {
			obj: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				item: this.obj
			};
		},
		methods: {
			// 去详情
			diaryDetail(id) {
				uni.navigateTo({
					url: "`pages/diary/detailid=${id}`"
				})
			},
			// 点赞
			handleLike() {
				if (this.item.isLike) {
					this.item.likeNum--;
				} else {
					this.item.likeNum++;
				}
				
				this.item.isLike = !this.item.isLike;
			},
			// 预览图片
			previewImage(imgList, index) {
				if (!imgList.length) return;
				
				let imgs = imgList.map(item => item.url);
				
				preview(imgs, index);
			}
		}
	}
</script>

<style lang="scss" scoped>
.radius {
	border-radius: 16rpx;
}

.card-item {
	padding: 20rpx 30rpx 0rpx;
	background-color: var(--white-color);
	box-shadow: 0 20rpx 40rpx 0 rgba(0, 0, 0, 0.1);
	
	.item-head{
		@include flex-box(space-between);
		width: 100%;
		
		.ih-left {
			@include flex-box("");
			
			.img-avatar {
				overflow: hidden;
				width: 80rpx;
				height: 80rpx;
				border-radius: 505;
			}
			
			.head-name {
				padding-left: 40rpx;
				color: var(--666-color);
				font-size: 32rpx;
			}
		}
		
		.ih-time {
			color: var(--999-color);
		}
	}
	
	.item-content {
		.ic-title {
			padding: 40rpx 0;
			font-size: 30rpx;
			color: var(--main-color);
		}
		
		.ic-img-box {
			.img-one {
				@extend %flex-align-center;
				overflow: hidden;
				width: 100%;
				max-height: 400rpx;
				border-radius: 10rpx;
			}
			
			.img-list {
				display: flex;
				flex-flow: row wrap;
				
				.img-box {
					@include flex-box();
					overflow: hidden;
					flex: 0 0 31%;
					margin: 0 1% 2%;
					overflow: hidden;
					height: 200rpx;
					border-radius: 10rpx;
					background-color: #ececec;

					.img {
						width: 100%;
					}
				}
			}
		}
		
		.ic-button {
			display: flex;
			padding: 20rpx 0;
			
			.btn-item {
				flex: 1;
				color: var(--main-color);
				
				.img {
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
}
</style>
