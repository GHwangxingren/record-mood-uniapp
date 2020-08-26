<template>
	<view class="publish-wrap bg-white">
		<view class="input-box padding-sm"><textarea class="area-top" placeholder="碎碎念..." v-model="content"></textarea></view>
		<view class="cu-form-group img-box">
			<view class="next-title">上传图片（最多9张） {{ imgList.length }}/9</view>
			<view class="img-wrap margin-none">
				<view class="grid col-3 grid-square flex-sub padding-top-lg">
					<view class="bg-img" v-for="(item, index) in imgList" :key="index">
						<image :src="imgList[index]" class="img-item" mode="aspectFill" @tap="viewImage(index)"></image>
						<image src="@/static/img/publish/img_close.png" :data-index="index" mode="widthFix" class="close-img" @tap.stop="deleteImg"></image>
					</view>
					<view class="add-img" @tap="chooseImage" v-if="imgList.length < 9"><text class="cuIcon-add link-color"></text></view>
				</view>
			</view>
		</view>
		<view class="bottom-btn flex-center">
			<view class="btn" @tap="modalShow = true">发布</view>
		</view>
		
		<ml-modal 
			:show="modalShow" 
			:showClose="true"
			title="提示" 
			:button="button" 
			:size="28" 
			shape="circle" 
			:content="`是否确认提交？`" 
			@cancel="closeModal"
			@click="handleModal"
		/>
		
		<ml-toast ref="toast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgList: [],
			content: "",
			countImg: 0,
			modalShow: false,
			button: [
				{
					text: "取消",
					type: "blue",
					plain: true
				},
				{
					text: "确认提交",
					type: "blue",
				}
			]
		};
	},
	methods: {
		handleModal() {
			console.log("确认提交");
			uni.showLoading();
			setTimeout(() => {
				uni.hideLoading();
				this.modalShow = false;
				this.$refs.toast.show({
					title: "发布成功",
					imgUrl: "/static/img/toast/check-circle.png",
					icon: true
				});
			}, 1000)
			// this.publish();
		},
		closeModal() {
			this.modalShow = false;
		},
		// 选择图片
		async chooseImage() {
			if (this.imgList.length === 9) {
				let isContinue = await this.isFullImg();

				if (!isContinue) {
					return;
				}
			};
			
			uni.chooseImage({
				count: 9 - this.countImg,
				sizeType: ["original"], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ["album", "camera"], //从相册选择
				success: res => {
					this.imgList = this.imgList.concat(res.tempFilePaths);
					this.countImg = this.imgList.length;
				}
			});
		},
		// 图片是否上限
		isFullImg() {
			return new Promise(res => {
				uni.showModal({
					content: "已经有9张图片了,是否清空现有图片？",
					success: e => {
						if (e.confirm) {
							this.imgList = [];
							res(true);
						} else {
							res(false);
						}
					},
					fail: () => {
						res(false);
					}
				});
			});
		},
		// 发布
		async publish() {
			uni.showLoading({ title: "发布中" });
			let images = [];
			
			for (let i = 0, len = this.imgList.length; i < len; i++) {
				let image_obj = { name: "image-" + i, url: this.imgList[i] };

				images.push(image_obj);
			}
			let files = await this.uploadImg();
			
			/**
			 * @param {提交相关逻辑代码}
			 */
		},
		// 删除图片
		deleteImg(e) {
			this.imgList.splice(e.currentTarget.dataset.index, 1);
			this.countImg--;
		},
		uploadImg() {
			let cur_files = [];

			return new Promise((resolve, reject) => {
				this.imgList.length > 0 &&
					this.imgList.forEach((img, i) => {
						let _headers = {};

						uni.uploadFile({
							url: "",
							filePath: img,
							name: "file",
							header: {
								..._headers
								// "Content-Type": "multipart/form-data"
							},
							success: res => {
								let cur_file = JSON.parse(res.data);

								if (cur_file.code === 0) {
									cur_files.push(cur_file.data);

									if (cur_files.length === this.imgList.length) {
										resolve(cur_files);
									}
								} else {
									uni.showToast({
										title: cur_file.msg,
										icon: "none"
									});
									reject(cur_file.msg);
								}
							},
							fail: err => {
								uni.hideLoading();
							},
							complete: res => {
								if (res.statusCode !== 200) {
									uni.hideLoading();
								}
							}
						});
					});
			});
		},
		// 预览图片
		viewImage(index) {
			let that = this;
			uni.previewImage({
				current: index,
				urls: this.imgList
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.publish-wrap {
	.input-box {
		.area-top {
			width: 100%;
			box-shadow: inset 0 -1px 0 0 #ececec;
			min-height: 280rpx;
		}
	}

	.img-box {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		margin-bottom: 160rpx;

		.next-title {
			width: 100%;
			font-size: 36rpx;
			color: var(--mainColor);
		}

		.font-red {
			color: #ff0000;
		}

		.img-wrap {
			width: 100%;
			font-size: 28rpx;
			line-height: 44rpx;
			color: #999;
			margin: 20rpx 0;
		}

		.add-img {
			border: 4rpx dashed #999;
			font-size: 40rpx;
		}

		.grid-square {
			overflow: unset;
		}
	}

	.bottom-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 20rpx 0;

		.btn {
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			border: 1rpx solid var(--activeColor);
			background-color: var(--activeColor);
			box-shadow: 0 1px 10px 0px var(--activeColor);
			width: 400rpx;
			height: 80rpx;
		}
	}
}

.bg-img {
	overflow: visible !important;

	.img-item {
		border-radius: 20rpx;
	}

	.close-img {
		position: absolute;
		width: 36rpx !important;
		top: -18rpx;
		right: -18rpx;
	}
}
</style>
