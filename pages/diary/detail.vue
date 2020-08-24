<template>
	<view class="detail-content">
		<!-- 头部信息 -->
		<view class="detail-head">
			<view class="left-info">
				<view class="l-avator flex-center">
					<image class="img" src="../../static/img/login/ic-QQ@2x.png" mode=""></image>
				</view>
				<view class="l-nickname">奥特曼打小怪兽</view>
			</view>
			<view :class="['follow-btn flex-center']" @tap="handleFllow(detail.id)">{{ true ? "关注ta" : "取消关注" }}</view>
		</view>
		
		<!-- 图片banner -->
		<view class="swiper-wrap">
			<swiper class="swiper-box" @change="swiperChange">
				<swiper-item>
					<image src="" mode="widthFix"></image>
				</swiper-item>
			</swiper>
			<div class="custom-indicator flex-center">{{ current+1 }} / {{ detail.imgList.length }}</div>
		</view>
		
		<!-- 文字内容 -->
		<view class="detail-text">{{ detail.title }}</view>
		<view class="detail-time">2020-08-24</view>
		
		<!-- 评论内容 -->
		<view class="comment-wrap">
			<view class="scroll-wrap">
				<view class="top-num padding-tb">共{{ commentList.length }}条评论</view>
				<template v-if="commentList.length">
					
				</template>
			</view>
		</view>
		
		<!-- 底部输入框 -->
		<view class="comment-input">
			<input type="text" v-model="commentVal" class="top-input" placeholder="说点什么吧..." />
			<view class="send-btn" @tap="addCommon">发送</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		name: "diaryDetail",
		props: {
			detail: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				current: 0
			};
		},
		computed: {},
		methods: {
			swiperChange(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>