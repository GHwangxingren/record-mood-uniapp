<template>
	<view class="music-container">
		<!-- <ml-carousel :img-list="imgList" circular autoplay url-key="url" @selected="selectedBanner" /> -->
		<view class="music-img flex-center">
			<image class="img" src="https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/lonely.jpg" mode="widthFix"></image>
		</view>
		<view class="audio-controller">
			<view class="top">
				<view class="title">{{ playList[playing].name }}</view>
				<view class="controller-icon">
					<image @click="last_song" src="../../static/img/music/last.png" mode="aspectFit"></image>
					<image v-if="!paused" @click="play" src="../../static/img/music/play.png" mode="aspectFit"></image>
					<image v-else @click="pauseAudio" src="../../static/img/music/pause.png" mode="aspectFit"></image>
					<image @click="next_song" src="../../static/img/music/next.png" mode="aspectFit"></image>
					<!-- <image @click="go_history" src="../../static/img/play-history.png" mode="aspectFit"></image> -->
				</view>
			</view>
			<!-- 下方进度条 -->
			<view class="bottom">
				<view class="progress-bar">
					<slider class="audio-slider" :block-size="12" :value="playing" @change="sliderChange" activeColor="#FFCC33" backgroundColor="#000000" block-color="#8A6DE9" block-size="20" />
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
				],
				playList: [
					{
						id: 1,
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						coverImg: "https://img9.51tietu.net/pic/2019-091200/vgkpidei2tjvgkpidei2tj.jpg",
						name: '致爱丽丝',
						album: '睡前轻音乐大全',
						status: 0
					},
					{
						id: 2,
						src: 'http://mp3.jinmiao.cn/mp3file/huiben/19/quting9xu.mp3',
						coverImg: "https://img9.51tietu.net/pic/2019-091200/euzekmi5m23euzekmi5m23.jpg",
						name: '鼹鼠做裤子',
						album: '童话故事大全',
						status: 0
					}
				],
				paused: false,
				recycled: false,
				playing: 0,
				now: "00:00",
				duration: "00:00",
				progress_max: 0
			}
		},
		methods: {
			selectedBanner(item, index) {
				console.log(item, index);
			},
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
					this.last_song();
				});
				innerAudioContext.onNext(() => {
					this.next_song();
				});
				innerAudioContext.onCanplay(() => {
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
					this.now = this.time_format(innerAudioContext.currentTime);
					this.duration = this.time_format(innerAudioContext.duration);
					this.progress_max = parseInt(100 * (innerAudioContext.currentTime / innerAudioContext.duration));
					// 在此可做试听限制，比如试听15s
					// if (parseInt(innerAudioContext.currentTime) > 15) {
					// 	innerAudioContext.pause();
					// 	innerAudioContext.destroy();
					// 	// 自定义提示
					// }
					// console.log(this.time_format(innerAudioContext.currentTime))
					// console.log(this.time_format(innerAudioContext.duration))
				});
				
				innerAudioContext.src = this.playList[this.playing].src;
				innerAudioContext.title = this.playList[this.playing].name;
				innerAudioContext.coverImgUrl = this.playList[this.playing].coverImg;
				innerAudioContext.singer = this.playList[this.playing].name;
			},
			//播放器控制相关
			last_song() {
				if (this.playing != 0) {
					this.playing--;
					innerAudioContext.src = this.playList[this.playing].src;
					innerAudioContext.title = this.playList[this.playing].name;
				}
			},
			next_song() {
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
			// pause() {
			// 	console.log(innerAudioContext);
			// 	if (innerAudioContext.paused) {
			// 		innerAudioContext.play();
			// 	} else {
			// 		innerAudioContext.pause();
			// 	}
			// },
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
			go_history() {},
			// 进度条相关
			progress_touch_start() {
				innerAudioContext.pause();
			},
			progress_touch_end(percent) {
				console.log('num :>> ', percent.detail.__args__[0]);
				let s = (percent.detail.__args__[0] / 100) * innerAudioContext.duration;
				innerAudioContext.seek(parseInt(s));
			},
			sliderChange() {},
			// 业务逻辑
			change_item(index) {
				this.playing = index;
				innerAudioContext.src = this.playList[this.playing].src;
				innerAudioContext.title = this.playList[this.playing].name;
			},
			// 点赞
			collecte(index, id) {
				this.playList[index].status == 0 ? (this.playList[index].status = 1) : (this.playList[index].status = 0);
			},
			time_format(second) {
				let m = Math.floor((second / 60) % 60) < 10 ? '0' + Math.floor((second / 60) % 60) : Math.floor((second / 60) % 60);
				let s = Math.floor(second % 60) < 10 ? '0' + Math.floor(second % 60) : Math.floor(second % 60);
				return `${m}:${s}`;
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
	
			.title {
				width: 57%;
				margin-left: 3%;
				font-size: 30rpx;
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
</style>
