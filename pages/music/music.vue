<template>
	<view class="music-container">
		<view class="music-img flex-center">
			<image class="img" :src="backImg" mode="aspectFill"></image>
		</view>
		<view class="audio-controller">
			<view class="top">
				<view class="title">
					<view class="title-scrolling rolling-text"
						:class="{ 'rolling-animation': animation }"
					>
						{{ playList[playing].name }} -- {{ playList[playing].singer }}
					</view>
				</view>
				<view class="controller-icon">
					<image @click="lastSong" src="../../static/img/music/last.png" mode="aspectFit"></image>
					<image v-if="!paused" @click="play" src="../../static/img/music/play.png" mode="aspectFit"></image>
					<image v-else @click="pauseAudio" src="../../static/img/music/pause.png" mode="aspectFit"></image>
					<image @click="nextSong" src="../../static/img/music/next.png" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 下方进度条 -->
			<view class="bottom">
				<view class="progress-bar">
					<slider
						class="audio-slider"
						:block-size="12"
						:min="0"
						:max="max"
						:value="currentTime"
						activeColor="#FFCC33"
						backgroundColor="#000000"
						block-color="#8A6DE9"
						block-size="20"
						@change="sliderChange" />
				</view>
				<view class="time">
					<text>{{ now }} / {{ duration }}</text>
					<image @click="loop" v-if="recycled" src="../../static/img/music/recycled.png" mode="aspectFits"></image>
					<image @click="loop" v-else src="../../static/img/music/recycle.png" mode="aspectFits"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const innerAudioContext = uni.getBackgroundAudioManager();
	
	export default {
		data() {
			return {
				playList: [
					{
						id: 1,
						src: 'https://m10.music.126.net/20200822181252/88dde0e7eb92883d907897724b452517/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2976632872/8d33/2038/21fc/fb3bac789740ff91accaf2ca118fc75c.mp3',
						coverImg: "https://img9.51tietu.net/pic/2019-091200/vgkpidei2tjvgkpidei2tj.jpg",
						name: "让一切随风",
						album: "听涛",
						singer: "钟镇涛",
						status: 0
					},
					{
						id: 2,
						src: "https://m10.music.126.net/20200822181840/c4bb176422d3e0a78d40165e62329742/ymusic/7d85/1be7/6a7f/18a283bf6987634d2009d503504305a9.mp3",
						coverImg: "https://img9.51tietu.net/pic/2019-091200/euzekmi5m23euzekmi5m23.jpg",
						name: "南常",
						album: "小海在路上",
						singer: "小海",
						status: 0
					},
					{
						id: 3,
						src: "https://m10.music.126.net/20200822181940/ff2f3c91cfb65a38f47db8506562b159/ymusic/87ec/046a/e21c/9c4eeccc6d868b99bb9a648ab586f641.mp3",
						coverImg: "https://img9.51tietu.net/pic/2019-091200/143tt0ta4sr143tt0ta4sr.jpg",
						name: "Sleeping In(Acoustic)",
						album: "Sleeping In(Acoustic)",
						singer: "Phil Good",
						status: 0
					},
					{
						id: 4,
						src: "https://m10.music.126.net/20200822182011/9f9f1ff4f532cedfbaa92ce42fa035c8/ymusic/015a/035a/5158/60c5eb0330401d7ded24f22dea9195eb.mp3",
						coverImg: "https://img9.51tietu.net/pic/2019-091200/ff1vqwm3q33ff1vqwm3q33.jpg",
						name: "吹梦到西洲",
						album: "吹梦到西洲",
						singer: "恋恋故人难/黄私扶/妖扬",
						status: 0
					}
				],
				backImg: "https://img9.51tietu.net/pic/2019-091200/vgkpidei2tjvgkpidei2tj.jpg",
				paused: false,
				recycled: false,
				currentTime: 0,
				max: 0,
				playing: 0,
				now: "00:00",
				duration: "00:00",
				progress_max: 0,
				wrapWidth: 0,
				textWidth: 0
			}
		},
		computed: {
			animation() {
				return this.wrapWidth < this.textWidth;
			}
		},
		onLoad() {
			this.$nextTick(() => {
				this.getRollingTextWidth(".title", "wrapWidth");
				this.getRollingTextWidth(".rolling-text", "textWidth");
			})
		},
		methods: {
			// 初始化播放器
			initAudio() {
				innerAudioContext.onPlay(() => {
					this.paused = true;
					uni.hideLoading();
				});
				innerAudioContext.onWaiting(() => {
					this.paused = true;
					uni.showLoading({
						title: "正在加载"
					});
				});
				innerAudioContext.onPause(() => {
					this.paused = false;
				});
				innerAudioContext.onSeeked(() => {
					this.paused = true;
				});
				innerAudioContext.onError(res => {
					this.paused = true;
				});
				innerAudioContext.onPrev(() => {
					this.lastSong();
				});
				innerAudioContext.onNext(() => {
					this.nextSong();
				});
				innerAudioContext.onCanplay(() => {
					this.max = Math.floor(innerAudioContext.duration);
					uni.hideLoading();
				});
				innerAudioContext.onEnded(() => {
					if (!this.recycled && this.playing < this.playList.length - 1) {
						this.playing++;
						innerAudioContext.src = this.playList[this.playing].src;
						innerAudioContext.title = this.playList[this.playing].name;
					} else if (this.recycled) {
						innerAudioContext.seek(0);
						innerAudioContext.src = this.playList[this.playing].src;
						innerAudioContext.title = this.playList[this.playing].name;
					} else if (!this.recycled && this.playing == this.playList.length - 1) {
						this.playing = 0;
						innerAudioContext.src = this.playList[this.playing].src;
						innerAudioContext.title = this.playList[this.playing].name;
					}
				});
				innerAudioContext.onTimeUpdate(() => {
					this.currentTime = innerAudioContext.currentTime;
					this.now = this.timeFormat(innerAudioContext.currentTime);
					this.duration = this.timeFormat(innerAudioContext.duration);
					this.progress_max = parseInt(100 * (innerAudioContext.currentTime / innerAudioContext.duration));
					// 在此可做试听限制，比如试听15s
					// if (parseInt(innerAudioContext.currentTime) > 15) {
					// 	innerAudioContext.pause();
					// 	innerAudioContext.destroy();
					// 	// 自定义提示
					// }
					// console.log(this.timeFormat(innerAudioContext.currentTime))
					// console.log(this.timeFormat(innerAudioContext.duration))
				});
				
				this.backImg = this.playList[this.playing].coverImg;
				innerAudioContext.src = this.playList[this.playing].src;
				innerAudioContext.title = this.playList[this.playing].name;
				innerAudioContext.coverImgUrl = this.playList[this.playing].coverImg;
				innerAudioContext.singer = this.playList[this.playing].name;
			},
			sliderChange(e) {
				this.currentTime = e.detail.value
				innerAudioContext.seek(this.currentTime)
			},
			//播放器控制相关
			lastSong() {
				if (this.playing != 0) {
					this.playing--;
					innerAudioContext.src = this.playList[this.playing].src;
					innerAudioContext.title = this.playList[this.playing].name;
				} else {
					this.playing = this.playList.length - 1;
					innerAudioContext.src = this.playList[this.playing].src;
					innerAudioContext.title = this.playList[this.playing].name;
				}
				
				this.$nextTick(() => {
					this.getRollingTextWidth(".rolling-text", "textWidth");
				})
				this.backImg = this.playList[this.playing].coverImg;
			},
			nextSong() {
				if (this.playing < this.playList.length - 1) {
					this.playing++;
					innerAudioContext.src = this.playList[this.playing].src;
					innerAudioContext.title = this.playList[this.playing].name;
				} else if (this.playing == this.playList.length - 1) {
					this.playing = 0;
					innerAudioContext.src = this.playList[this.playing].src;
					innerAudioContext.title = this.playList[this.playing].name;
					uni.pageScrollTo({
						scrollTop: 0
					});
				}else{
					console.log('do nothing ');
				}
				
				this.$nextTick(() => {
					this.getRollingTextWidth(".rolling-text", "textWidth");
				})
				this.backImg = this.playList[this.playing].coverImg;
			},
			play() {
				if (!innerAudioContext.src) {
					this.initAudio()
				}
				
				innerAudioContext.play();
			},
			pauseAudio() {
				innerAudioContext.pause();
			},
			loop() {
				// innerAudioContext.loop = !innerAudioContext.loop //loop属性为true时不会触发 onEnded()
				this.recycled = !this.recycled;
				if (this.recycled) {
					uni.showToast({
						icon: 'none',
						title: '开启循环'
					});
				}
			},
			timeFormat(second) {
				let m = Math.floor((second / 60) % 60) < 10 ? '0' + Math.floor((second / 60) % 60) : Math.floor((second / 60) % 60);
				let s = Math.floor(second % 60) < 10 ? '0' + Math.floor(second % 60) : Math.floor(second % 60);
				return `${m}:${s}`;
			},
			getRollingTextWidth(dom, val) {
				let width = 0;
				const query = uni.createSelectorQuery().in(this);
				query.select(dom).boundingClientRect(data => {
					if (data) {
						this[val] = data.width;
					}
				}).exec();
			}
		}
	}
</script>

<style lang="scss" scoped>
.music-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	
	.music-img {
		flex: 1;
		width: 100%;
		overflow: hidden;
		
		.img {
			width: 100%;
			height: 100%;
		}
	}
	
	.audio-controller {
		padding: 50rpx 0;
		height: 200rpx;
		width: 100%;
		background-color: var(--white-color);
		
		.top {
			@include flex-box(space-between);
			min-height: 50rpx;
	
			.title {
				width: 57%;
				margin-left: 3%;
				font-size: 30rpx;
				overflow: hidden;
				.title-scrolling{
					display: inline-block;
					white-space: nowrap;
				}
			}
	
			.controller-icon {
				@include flex-box(space-around);
				width: 40%;
	
				image {
					display: inline-block;
					height: 30rpx;
					width: 30rpx;
				}
			}
		}
	
		.bottom {
			@include flex-box(space-between);
			margin: 25rpx 3% 0 5%;
			
			.progress-bar {
				flex: 1;
				margin-right: 30rpx;
				
				.audio-slider {
					margin: 0;
				}
			}
	
			.time {
				color: #808080;
				font-size: 28rpx;
				display: flex;
	
				image {
					display: block;
					width: 30rpx;
					height: 30rpx;
					margin-left: 30rpx;
					margin-top: 5rpx;
				}
			}
		}
	}
}

.rolling-animation {
	-webkit-animation: rolling 12s linear infinite;
	animation: rolling 12s linear infinite;
}

@-webkit-keyframes rolling {
	0% {
		transform: translate3d(100%, 0, 0);
	}

	100% {
		transform: translate3d(-100%, 0, 0);
	}
}

@keyframes rolling {
	0% {
		transform: translate3d(100%, 0, 0);
	}
	
	100% {
		transform: translate3d(-100%, 0, 0);
	}
}
</style>
