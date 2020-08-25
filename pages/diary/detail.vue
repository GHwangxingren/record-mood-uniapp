<template>
	<view class="detail-content">
		<!-- 头部信息 -->
		<view class="detail-head">
			<view class="left-info">
				<view class="l-avator flex-center">
					<image class="img" :src="detail.avatarUrl" mode="widthFix"></image>
				</view>
				<view class="l-nickname">{{ detail.nickName }}</view>
			</view>
			<view
				:class="[
					'follow-btn flex-center', 
					detail.followed ? 'followed' : ''
				]" 
				@tap="handleFllow(detail.id)"
			>
				{{ !detail.followed ? "关注ta" : "取消关注" }}
			</view>
		</view>
		
		<!-- 图片banner -->
		<view class="swiper-wrap">
			<swiper class="swiper-box" @change="swiperChange">
				<swiper-item
					v-for="(img, idx) in detail.imgList" 
					:key="idx" 
					class="item-swiper flex-center"
					@tap="previewImage(detail.imgList, idx)"
				>
					<image class="img" :src="img.url" mode="widthFix"></image>
				</swiper-item>
			</swiper>
			<div class="custom-indicator flex-center">{{ current+1 }} / {{ detail.imgList.length }}</div>
		</view>
		
		<!-- 文字内容 -->
		<view class="detail-text">{{ detail.title }}</view>
		<view class="detail-time">{{ detail.createTime }}</view>
		
		<!-- 评论内容 -->
		<view class="comment-wrap">
			<view class="scroll-wrap">
				<view class="top-num padding-tb">共{{ commentList.length }}条评论</view>
				<template v-if="commentList.length">
					<view class="comment-item margin-bottom-lg" v-for="(item, index) in commentList" :key="index">
						<view class="left-avatar">
							<image class="img" :src="item.avatarUrl" mode="widthFix"></image>
						</view>
						<view class="right-box">
							<view class="right-mine">
								<view class="right-top">
									<p class="title">
										{{ item.nickName }}
										<text class="author">作者</text>
									</p>
									<text class="time">{{item.time}}</text>
								</view>
								<p class="content">{{ item.content }}</p>
							</view>
							<!-- 子评论 -->
							<template v-if="item.children && item.children.length">
								<view class="comment-item margin-top-sm" v-for="(child,idx) in item.children" :key="idx">
									<view class="left-avatar margin-right-sm">
										<image :src="child.avatarUrl" mode="widthFix" class="img"></image>
									</view>
									<view class="right-mine">
										<view class="right-top">
											<view class="reply">
												<p class="title text-overflow">{{ child.nickName }}</p>
												<text class="padding-lr-xs">回复</text>
												<p class="title active text-overflow">{{ item.nickName }}</p>
											</view>
											<text class="time">{{child.time}}</text>
										</view>
										<p class="content">{{ child.content }}</p>
									</view>
								</view>
							</template>
						</view>
					</view>
				</template>
				<template v-else>
					<ml-empty />
				</template>
			</view>
		</view>
		
		<!-- 底部输入框 -->
		<view class="comment-input">
			<input
				type="text"
				v-model="commentVal"
				class="top-input"
				:disabled="!isLogin"
				:placeholder="isLogin ? '说点什么吧...' : '请先登录'"
			/>
			<view :class="['send-btn', (isLogin && islegalComment) ? '' : 'common-disabled']" @tap="sendComment">发送</view>
		</view>
		<!-- 登陆提示 -->
		<ml-loginTip></ml-loginTip>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	import { preview } from "@/utils/common.js";
	
	export default {
		name: "diaryDetail",
		data() {
			return {
				detailId: '',
				commentVal: '',
				current: 0,
				commentList: [{
					avatarUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg',
					content: '生活已经如此艰辛，让我怎能不努力',
					nickName: '小不点',
					time: '8-25',
					children: [{
						avatarUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771555881,3104139652&fm=26&gp=0.jpg',
						content: '生活已经如此艰辛，让我怎能不努力,怎能不努力呢',
						nickName: '奥特曼与小怪兽',
						time: '6-15'
					}]
				}],
				detail: {}
			};
		},
		computed: {
			...mapGetters(["allList", "isLogin"]),
			islegalComment() {
				return this.commentVal.replace(/^\s+|\s+$/g, "") ? true : false;
			}
		},
		onLoad(options) {
			let id = options.id;
			
			this.detail = this.allList.find(v => +v.id === +id);
		},
		methods: {
			...mapMutations({
				setLoginTip: "user/setLoginTip"
			}),
			// 关注
			handleFllow(id) {
				if (!this.isLogin) {
					this.setLoginTip(true);
					return;
				}
				
				this.detail.followed = !this.detail.followed;
			},
			// 发布评论
			sendComment() {
				if (!this.isLogin) {
					this.setLoginTip(true);
					return;
				}
				
				if (!this.islegalComment) {
					return
				}
				
				let time = new Date().Format('MM-dd hh:mm');
				let params = {
					avatarUrl: 'https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/avatar.png',
					content: this.commentVal,
					nickName: "小不点",
					time: time
				};
				this.commentList.splice(0 , 0, params);
				this.commentVal = "";
			},
			// 轮播banner切换
			swiperChange(e) {
				this.current = e.detail.current;
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
	.detail-content {
		padding: 120rpx 0 100rpx;
		background-color: var(--white-color);
		
		.detail-head {
			@include flex-box(space-between);
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 120rpx;
			padding: 20rpx 40rpx;
			border-bottom: 1px solid var(--main-color);
			background-color: var(--white-color);
			z-index: 99;
			
			.left-info {
				@extend %flex-align-center;
				
				.l-avator {
					width: 80rpx;
					height: 80rpx;
					overflow: hidden;
				}
				
				.l-nickname {
					padding-left: 40rpx;
					color: #666;
					font-size: 32rpx;
				}
			}
			
			.follow-btn {
				width: 140rpx;
				height: 60rpx;
				border: 1px solid var(--main-color);
				border-radius: 40rpx;
				color: var(--main-color);
				
				&.followed {
					background-color: var(--active-color);
					border-color: var(--active-color);
					color: var(--white-color);
				}
			}
		}
		
		.swiper-wrap {
			position: relative;
			
			.swiper-box {
				height: 600rpx;
				margin: 0 0 40rpx;
				background-color: var(--main-color);
			}
			
			.custom-indicator {
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				background-color: rgba(0, 0, 0, 0.5);
				padding: 8rpx 10rpx;
				border-radius: 24rpx;
				color: var(--white-color);
			}
		}
		
		.detail-text {
			padding: 0 40rpx;
			font-size: 32rpx;
			line-height: 50rpx;
		}
		
		.detail-time {
			padding: 20rpx 40rpx;
			font-size: 24rpx;
			color: #999;
		}
		
		.comment-wrap {
			padding: 0 40rpx 40rpx;
			background-color: var(--white-color);
			
			.scroll-wrap {
				border-top: 1px solid var(--main-color);
				.top-num {}
				
				.comment-item {
					@include flex-box(space-between);
					
					.left-avatar {
						overflow: hidden;
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
						border: 1px solid #ECECEC;
					}
					
					.right-box {
						flex: 1;
						margin-left: 20rpx;
						
						.right-mine {
							padding: 20rpx;
							border-radius: 10rpx;
							background-color: #F5F8F9;
							
							.right-top {
								@include flex-box(space-between);
								
								.reply {
									@extend %flex-align-center;
								}
								
								.title {
									flex: 1;
									color: var(--black-color);
									
									.author {
										padding: 0 8rpx;
										margin-left: 10rpx;
										border-radius: 6rpx;
										background-color: var(--active-color);
										color: #fff;
									}
									
									&.active {
										color: var(--active-color);
									}
								}
								
								.time {
									color: #999;
								}
							}
							
							.content {
								padding: 10rpx 0;
							}
						}
					}
				}
			}
		}
		// 评论框
		.comment-input {
			@include flex-box(space-between);
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 20rpx 40rpx;
			border-top: 1px solid #ECECEC;
			background-color: #f5f5f5;
			
			.top-input {
				@extend %flex-align-center;
				flex: 1;
				height: 60rpx;
				padding: 0 40rpx;
				background-color: var(--white-color);
				border-radius: 80rpx;
				color: var(--black-color);
			}
			
			.send-btn {
				@include flex-box();
				height: 60rpx;
				width: 140rpx;
				margin-left: 20rpx;
				border-radius: 40rpx;
				border: 1px solid var(--active-color);
				color: var(--active-color);
				background-color: var(--white-color);
			}
		}
	}
</style>