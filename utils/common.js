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
			console.log(err)
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

//格式化时间
Date.prototype.Format = function(fmt) {
	let o = {
		"M+": this.getMonth() + 1, // 月份
		"d+": this.getDate(), // 日
		"h+": this.getHours(), // 小时
		"m+": this.getMinutes(), // 分
		"s+": this.getSeconds(), // 秒
		"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		"S": this.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
	}
	for (let k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	
	return fmt;
}
// new Date(1542274800000).Format('yy-MM-dd hh:mm:ss'); //"2018-11-15 17:40:00"


export {
	preview,
	backToLogin
}
