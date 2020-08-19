<template>
	<swiper
		class="image-container"
		previous-margin="45rpx"
		next-margin="45rpx"
		:circular="circular"
		:autoplay="autoplay"
		:interval="interval"
		@change="swiperChange"
	>
		<swiper-item
			:class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'" 
			v-for="(item, index) in imgList" 
			:key="item[urlKey]"
			@tap="clickImg(item)"
		>
			<image
				:class="currentIndex == index ? 'item-img' : 'item-img-side'"
				:src="item[urlKey]"
				lazy-load
				:style="dontFirstAnimation ? 'animation: none;' : ''"
				mode="aspectFill"
			></image>
		</swiper-item>
	</swiper>
</template>
<script>
export default {
	props: {
		imgList: {
			type: Array,
			default: () => []
		},
		urlKey: {
			type: String,
			default: ""
		},
		autoplay: {
			type: Boolean,
			default: false
		},
		circular: {			type: Boolean,			default: false		},
		interval: {
			type: Number,
			default: 5000
		}
	},
	data() {
		return {
			currentIndex: 0,
			dontFirstAnimation: true
		};
	},
	methods: {
		swiperChange(e) {
			this.dontFirstAnimation = false;
			this.currentIndex = e.detail.current;
		},
		clickImg(item) {
			this.$emit('selected', item, this.currentIndex);
		}
	}
};
</script>
<style scoped>
.image-container {
	width: 750rpx;
	height: 350rpx;
}

.item-img {
	width: 630rpx;
	height: 300rpx;
	border-radius: 14rpx;
	animation: to-big 0.3s linear;
}

.swiper-item {
	width: 630rpx;
	height: 300rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.item-img-side {
	width: 630rpx;
	height: 260rpx;
	border-radius: 14rpx;
	animation: to-mini 0.3s linear;
}

.swiper-item-side {
	width: 630rpx;
	height: 260rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

@keyframes to-mini {
	from {
		height: 300rpx;
	}
	to {
		height: 260rpx;
	}
}

@keyframes to-big {
	from {
		height: 260rpx;
	}
	to {
		height: 300rpx;
	}
}
</style>
