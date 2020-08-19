<template>
	<view class="music-container">
		<!-- <ml-carousel :img-list="imgList" circular autoplay url-key="url" @selected="selectedBanner" /> -->
		<view class="music-img flex-center">
			<image src="https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/lonely.jpg" mode="widthFix" class="img"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		data() {
			return {
				imgList: [
					{
						url: "https://img9.51tietu.net/pic/2019-091200/vgkpidei2tjvgkpidei2tj.jpg",
						id: 1
					},
					{
						url: "https://img9.51tietu.net/pic/2019-091200/euzekmi5m23euzekmi5m23.jpg",
						id: 2
					},
					{
						url: "https://img9.51tietu.net/pic/2019-091200/143tt0ta4sr143tt0ta4sr.jpg",
						id: 3
					},
					{
						url: "https://img9.51tietu.net/pic/2019-091200/ff1vqwm3q33ff1vqwm3q33.jpg",
						id: 4
					},
				]
			}
		},
		methods: {
			selectedBanner(item, index) {
				console.log(item, index);
			}
		}
	}
</script>

<style lang="scss">
.music-container {
	.music-img {
		width: 100%;
		max-height: 800rpx;
		overflow: hidden;
		
		.img {
			width: 100%;
			height: 800rpx;
		}
	}
}
</style>
