// 公用预览图片
const preview = (imgList, index) => {
	return new Promise((resolve, reject) => {
		uni.previewImage({
			current: index,
			urls: imgList,
			longPressActions: {
				itemList: ["发送给朋友", "保存图片", "收藏"]
			}
		}).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	})
};

export {
	preview
}