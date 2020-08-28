<template>
	<view class="hxe-actionsheet-container" @touchmove.stop.prevent>
		<view class="hxe-actionsheet" :class="{'hxe-actionsheet-show':show,'hxe-actionsheet-radius':radius}">
			<view v-if="showHeader" class="hxe-action-btn">
				<view class="hxe-action hxe-text-grey" @tap="handleClickCancel">取消</view>
				<view v-if="title" class="hxe-action hxe-sheet-title">{{ title }}</view>
				<view class="hxe-action hxe-text-blue" @tap="handleConfirm">确定</view>
			</view>
			<view v-if="!showHeader && title" class="hxe-action hxe-sheet-title-only">{{ title }}</view>
			<view class="hxe-actionsheet-tips" :style="{fontSize:size+'rpx',color:color}" v-if="tips">
				{{tips}}
			</view>
			<view :class="[isCancel?'hxe-operate-box':'']">
				<slot name="content"></slot>
				<block v-if="showDefault">
					<block v-for="(item,index) in itemList" :key="index">
						<view class="hxe-actionsheet-btn hxe-actionsheet-divider" :class="{'hxe-btn-last':!isCancel && index==itemList.length-1}"
						 hover-class="hxe-actionsheet-hover" :hover-stay-time="150" :data-index="index" :style="{color:item.color || '#2B2B2B'}"
						 @tap="handleClickItem">{{item.text}}</view>
					</block>
				</block>
			</view>
			<view class="hxe-actionsheet-btn hxe-actionsheet-cancel" hover-class="hxe-actionsheet-hover" :hover-stay-time="150"
			 v-if="isCancel" @tap="handleClickCancel">取消</view>
		</view>
		<view class="hxe-actionsheet-mask" :class="{'hxe-mask-show':show}" @tap="handleClickMask"></view>
	</view>
</template>

<script>
	export default {
		name: "hxeActionsheet",
		props: {
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: true
			},
			// 是否展示头部操作
			showHeader: {
				type: Boolean,
				default: false
			},
			// 是否使用默认列表展示
			showDefault: {
				type: Boolean,
				default: false
			},
			//显示操作菜单
			show: {
				type: Boolean,
				default: false
			},
			//菜单按钮数组，自定义文本颜色，红色参考色：#e53a37
			itemList: {
				type: Array,
				default: function() {
					return [{
						text: "确定",
						color: "#2B2B2B"
					}]
				}
			},
			// 顶部标题
			title: {
				type: String,
				default: ""
			},
			//提示文字
			tips: {
				type: String,
				default: ""
			},
			//提示文字颜色
			color: {
				type: String,
				default: "#808080"
			},
			//提示文字大小 rpx
			size: {
				type: Number,
				default: 26
			},
			//是否需要圆角
			radius: {
				type: Boolean,
				default: true
			},
			//是否需要取消按钮
			isCancel: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleClickMask() {
				if (!this.maskClosable) return;
				this.handleClickCancel();
			},
			handleClickItem(e) {
				if (!this.show) return;
				const dataset = e.currentTarget.dataset;
				this.$emit("click", {
					index: dataset.index
				});
			},
			handleClickCancel() {
				this.$emit("cancel");
			},
			// 确定按钮
			handleConfirm() {
				this.$emit("confirm");
			}
		}
	}
</script>

<style scoped>
	.hxe-actionsheet {
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		visibility: hidden;
		transform: translate3d(0, 100%, 0);
		transform-origin: center;
		transition: all 0.25s ease-in-out;
		background-color: #FFF;
		min-height: 100rpx;
		padding-bottom: 40rpx;
	}

	.hxe-actionsheet-radius {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		overflow: hidden;
	}

	.hxe-actionsheet-show {
		transform: translate3d(0, 0, 0);
		visibility: visible;
	}

	.hxe-actionsheet-tips {
		width: 100%;
		padding: 40rpx 60rpx;
		box-sizing: border-box;
		text-align: center;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hxe-operate-box {
		padding-bottom: 12rpx;
	}

	.hxe-actionsheet-btn {
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 34rpx;
		position: relative;
	}

	.hxe-btn-last {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.hxe-actionsheet-divider::before {
		content: '';
		width: 100%;
		border-top: 1rpx solid #E7E7E7;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.hxe-actionsheet-cancel {
		color: #1a1a1a;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.hxe-actionsheet-hover {
		background-color: #f7f7f9;
	}

	.hxe-actionsheet-mask {
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

	.hxe-mask-show {
		opacity: 1;
		visibility: visible;
	}
	
	.hxe-action-btn {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100rpx;
		justify-content: space-between;
		padding: 0 50rpx;
		font-size: 28rpx;
	}
	
	.hxe-action {
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
	}
	
	.hxe-sheet-title {
		font-size: 34rpx;
		text-align: center;
		color: #222;
		line-height: 48rpx;
		letter-spacing: 4rpx;
	}
	
	.hxe-sheet-title-only {
		padding-top: 10rpx;
		font-size: 30rpx;
		text-align: center;
		font-weight: bold;
		color: #000;
		letter-spacing: 4rpx;
		line-height: 42px;
	}
		
	
	.hxe-text-grey {
		color: #9B9B9B;
	}
	
	.hxe-text-blue {
		color: #004AE6;
	}
</style>
