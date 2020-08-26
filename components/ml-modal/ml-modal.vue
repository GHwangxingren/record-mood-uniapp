<template>
	<view @touchmove.stop.prevent>
		<view class="ml-modal-box" :style="{width:width,padding:padding,borderRadius:radius,backgroundColor:backgroundColor}" :class="[(fadeIn || show)?'ml-modal-normal':'ml-modal-scale',show?'ml-modal-show':'']">
			<view v-if="showClose" class="ml-close-label" @tap="handleClickCancel"></view>
			<view v-if="!custom">
				<view class="ml-modal-title" v-if="title">{{title}}</view>
				<view class="ml-modal-content" :class="[title?'':'ml-mtop']" :style="{color:color,fontSize:size+'rpx'}">{{content}}</view>
				<view class="ml-modalBtn-box" :class="[button.length!=2?'ml-flex-column':'']">
					<block v-for="(item,index) in button" :key="index">
						<button class="ml-modal-btn" :class="['ml-'+(item.type || 'primary')+(item.plain?'-outline':''),button.length!=2?'ml-btn-width':'',button.length>2?'ml-mbtm':'',shape=='circle'?'ml-circle-btn':'']"
						 :hover-class="'ml-'+(item.plain?'outline':(item.type || 'primary'))+'-hover'" :data-index="index" @tap="handleClick">{{item.text || "确定"}}</button>
					</block>
				</view>
			</view>
			<view v-else>
				<slot></slot>
			</view>
		</view>
		<view class="ml-modal-mask" :class="[show?'ml-mask-show':'']" @tap="handleClickCancel"></view>

	</view>
</template>

<script>
	export default {
		name: "mlModal",
		props: {
			//是否显示
			show: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: "84%"
			},
			backgroundColor:{
				type: String,
				default: "#fff"
			},
			padding: {
				type: String,
				default: "40rpx 64rpx"
			},
			radius: {
				type: String,
				default: "24rpx"
			},
			showClose: {
				type: Boolean,
				default: false
			},
			//标题
			title: {
				type: String,
				default: ""
			},
			//内容
			content: {
				type: String,
				default: ""
			},
			//内容字体颜色
			color: {
				type: String,
				default: "#999"
			},
			//内容字体大小 rpx
			size: {
				type: Number,
				default: 28
			},
			//形状 circle, square
			shape: {
				type: String,
				default: 'square'
			},
			button: {
				type: Array,
				default: function() {
					return [{
						text: "取消",
						type: "primary",
						plain: true //是否空心
					}, {
						text: "确定",
						type: "primary",
						plain: false
					}]
				}
			},
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: true
			},
			//淡入效果，自定义弹框插入input输入框时传true
			fadeIn: {
				type: Boolean,
				default: false
			},
			//自定义弹窗内容
			custom: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handleClick(e) {
				if (!this.show) return;
				const dataset = e.currentTarget.dataset;
				this.$emit('click', {
					index: Number(dataset.index)
				});
			},
			handleClickCancel() {
				if (!this.maskClosable) return;
				this.$emit('cancel');
			}
		}
	}
</script>

<style scoped>
	.ml-modal-box {
		position: fixed;
		left: 50%;
		top: 50%;
		margin: auto;
		z-index: 9998;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		box-sizing: border-box;
		visibility: hidden;
	}
	
	.ml-close-label {
		position: absolute;
		top: 44rpx;
		right: 35rpx;
		width: 30rpx;
		height: 30rpx;
		background: url("https://hui-joy-image.oss-cn-beijing.aliyuncs.com/resource/image/close_label.png") no-repeat;
		background-size: 100%;
	}

	.ml-modal-scale {
		transform: translate(-50%, -50%) scale(0);
	}

	.ml-modal-normal {
		transform: translate(-50%, -50%) scale(1);
	}

	.ml-modal-show {
		opacity: 1;
		visibility: visible;
	}

	.ml-modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9996;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.ml-mask-show {
		visibility: visible;
		opacity: 1;
	}

	.ml-modal-title {
		text-align: center;
		font-size: 34rpx;
		color: #333;
		padding-top: 20rpx;
		font-weight: bold;
	}

	.ml-modal-content {
		text-align: center;
		color: #999;
		font-size: 28rpx;
		padding-top: 50rpx;
		padding-bottom: 70rpx;
	}

	.ml-mtop {
		margin-top: 30rpx;
	}

	.ml-mbtm {
		margin-bottom: 30rpx;
	}

	.ml-modalBtn-box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between
	}

	.ml-flex-column {
		flex-direction: column;
	}

	.ml-modal-btn {
		width: 46%;
		height: 70rpx;
		line-height: 70rpx;
		position: relative;
		border-radius: 40rpx;
		font-size: 28rpx;
		overflow: visible;
		margin-left: 0;
		margin-right: 0;
	}

	.ml-modal-btn::after {
		content: " ";
		position: absolute;
		width: 200%;
		height: 200%;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		left: 0;
		top: 0;
		border-radius: 20rpx;
	}

	.ml-btn-width {
		width: 80% !important;
	}

	.ml-primary {
		background: #5677fc;
		color: #fff;
	}

	.ml-primary-hover {
		background: #4a67d6;
		color: #e5e5e5;
	}

	.ml-primary-outline {
		color: #5677fc;
		background: transparent;
	}

	.ml-primary-outline::after {
		border: 1px solid #5677fc;
	}
	
	.ml-blue {
		background: #004AE6;
		color: #fff;
	}
	
	.ml-blue-hover {
		background: #004AE6;
		color: #e5e5e5;
	}
	
	.ml-blue-outline {
		color: #004AE6;
		background: transparent;
	}
	
	.ml-blue-outline::after {
		border: 2px solid #004AE6;
	}

	.ml-danger {
		background: #ed3f14;
		color: #fff;
	}

	.ml-danger-hover {
		background: #d53912;
		color: #e5e5e5;
	}

	.ml-danger-outline {
		color: #ed3f14;
		background: transparent;
	}

	.ml-danger-outline::after {
		border: 1px solid #ed3f14;
	}

	.ml-red {
		background: #e41f19;
		color: #fff;
	}

	.ml-red-hover {
		background: #c51a15;
		color: #e5e5e5;
	}

	.ml-red-outline {
		color: #e41f19;
		background: transparent;
	}

	.ml-red-outline::after {
		border: 1px solid #e41f19;
	}

	.ml-warning {
		background: #ff7900;
		color: #fff;
	}

	.ml-warning-hover {
		background: #e56d00;
		color: #e5e5e5;
	}

	.ml-warning-outline {
		color: #ff7900;
		background: transparent;
	}

	.ml-warning-outline::after {
		border: 1px solid #ff7900;
	}

	.ml-green {
		background: #19be6b;
		color: #fff;
	}

	.ml-green-hover {
		background: #16ab60;
		color: #e5e5e5;
	}

	.ml-green-outline {
		color: #19be6b;
		background: transparent;
	}

	.ml-green-outline::after {
		border: 1px solid #19be6b;
	}

	.ml-white {
		background: #fff;
		color: #333;
	}

	.ml-white-hover {
		background: #f7f7f9;
		color: #666;
	}

	.ml-white-outline {
		color: #333;
		background: transparent;
	}

	.ml-white-outline::after {
		border: 1px solid #333;
	}

	.ml-gray {
		background: #ededed;
		color: #999;
	}

	.ml-gray-hover {
		background: #d5d5d5;
		color: #898989;
	}

	.ml-gray-outline {
		color: #999;
		background: transparent;
	}

	.ml-gray-outline::after {
		border: 1px solid #999;
	}

	.ml-outline-hover {
		opacity: 0.6;
	}

	.ml-circle-btn {
		border-radius: 40rpx !important;
	}

	.ml-circle-btn::after {
		border-radius: 80rpx !important;
	}
</style>
