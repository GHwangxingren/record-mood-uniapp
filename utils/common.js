import store from "@/store";
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

// 未授权登录跳转到登录页，并记录当前地址
const backToLogin = async () => {
	// 存当前页面的地址
	let e = getCurrentPages();
	const currentPage = e[e.length - 1].route;
	store.commit("route/setCurrentPage", `/${currentPage}`);
	uni.navigateTo({
		url: "/pages/login/login"
	});
};

export {
	preview,
	backToLogin
}