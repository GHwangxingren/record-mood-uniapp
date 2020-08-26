<template>
	<view
		class="ml-toast"
		:class="[visible ? 'ml-toast-show' : '', content ? 'ml-toast-padding' : '', icon ? '' : 'ml-unicon-padding']"
		:style="{ minWidth: getWidth(icon, content), zIndex: zIndex }"
	>
		<image :src="imgUrl" class="ml-toast-img" v-if="icon"></image>
		<view class="ml-toast-text" :class="[icon ? '' : 'ml-unicon']">{{ title }}</view>
		<view class="ml-toast-text ml-content-ptop" v-if="content && icon">{{ content }}</view>
	</view>
</template>

<script>
export default {
	name: 'mlToast',
	props: {
		zIndex: {
			type: Number,
			default: 99999
		}
	},
	data() {
		return {
			timer: null,
			//是否显示
			visible: false,
			//显示标题
			title: '操作成功',
			//显示内容
			content: '',
			//是否有icon
			icon: false,
			imgUrl: ''
		};
	},
	methods: {
		show: function(options) {
			let { duration = 2000, icon = false } = options;
			clearTimeout(this.timer);
			this.visible = true;
			this.title = options.title || '';
			this.content = options.content || '';
			this.icon = icon;
			if (icon && options.imgUrl) {
				this.imgUrl = options.imgUrl;
			}
			this.timer = setTimeout(() => {
				this.visible = false;
				clearTimeout(this.timer);
				this.timer = null;
			}, duration);
		},
		getWidth(icon, content) {
			let width = 'auto';
			if (icon) {
				width = content ? '420rpx' : '220rpx';
			}
			return width;
		}
	}
};
</script>

<style scoped>
.ml-toast {
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 10rpx;
	position: fixed;
	visibility: hidden;
	opacity: 0;
	left: 50%;
	top: 48%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	transition: 0.3s ease-in-out;
	transition-property: opacity, visibility;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 60rpx 20rpx 54rpx 20rpx;
	box-sizing: border-box;
}

.ml-toast-padding {
	padding-top: 50rpx !important;
	padding-bottom: 50rpx !important;
}
.ml-unicon-padding {
	padding: 24rpx 40rpx !important;
	word-break: break-all;
}

.ml-toast-show {
	visibility: visible;
	opacity: 1;
}

.ml-toast-img {
	width: 70rpx;
	height: 70rpx;
	display: block;
	margin-bottom: 28rpx;
}

.ml-toast-text {
	font-size: 30rpx;
	line-height: 30rpx;
	font-weight: 400;
	color: #fff;
	text-align: center;
}
.ml-unicon {
	line-height: 40rpx !important;
	font-size: 32rpx !important;
}
.ml-content-ptop {
	padding-top: 10rpx;
	font-size: 26rpx !important;
}
</style>
