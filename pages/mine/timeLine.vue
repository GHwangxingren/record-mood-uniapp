<template>
	<view class="timeline-content">
		<template v-if="cardList.length">
			<view v-for="(item, index) in cardList" :key="index" class="cu-timeline">
				<view class="cu-time">{{ item.createTime }}</view>
				<view class="cu-item text-cyan">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">{{ item.createTime }}</view>
						</view>
						<view class="margin-top time-text">{{ item.title }}</view>
						<scroll-view v-if="item.imgList.length" scroll-x class="img-info nav margin-top" scroll-with-animation>
							<view v-for="(child,idx) in item.imgList" :key="idx" class="img-box flex-center">
								<image :src="child.url" class="img" mode="aspectFill" @tap="previewImage(item.imgList,idx)"></image>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<ml-empty />
		</template>
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	import { preview } from "@/utils/common.js";
	
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			 ...mapGetters(["cardList"])
		},
		methods: {
			// 预览图片
			previewImage(imgList, index) {
				if (!imgList.length) return;
				
				let imgs = imgList.map(item => item.url);
				
				preview(imgs, index);
			}
		}
	}
</script>

<style lang="scss">
.timeline-content {
	min-height: 100vh;

	.cu-time {
		color: var(--main-color);
	}
	
	.content {
		background-color: #f5f8f9;
	}
	
	.time-text {
		color: var(--main-color);
	}
	
	.img-info {
		.img-box {
			overflow: hidden;
			display: inline-block;
			width: 144rpx;
			height: 144rpx;
			margin-right: 20rpx;
			border-radius: 16rpx;
		}
	}
}
</style>
