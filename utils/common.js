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

// 手机号验证
const isPhone = function(phone) {
	const pattern = /^1[3456789]\d{9}$/;

	return pattern.test(phone)
}


// 拨打电话
const makePhone = function() {
	uni.makePhoneCall({
		phoneNumber: "10086",
		// 成功回调
		success: (res) => {
			console.log(res, "成功");
		},
		// 失败回调
		fail: (res) => {
			console.log(res, "失败");
		}
	});
}

/**
 * 点击事件埋点
 * @param {$url_path} 当前页面地址
 * @param {button_content} 按钮内容文字
 */
const sensorClick = (content = "", page = "", event = "MPButtonClick") => {
	let e = getCurrentPages();
	// 获取当前页面的地址对象
	let _curPath = e[e.length - 1] ? e[e.length - 1].route : "";
	_curPath = page || _curPath;
	this.sensors.track(event, {
		$url_path: _curPath,
		button_content: content
	})
}

/**
 * 小程序页面浏览埋点
 * @param {$url_path} 当前页面地址
 * @param {$referrer} 前向页面地址
 */
const sensorShow = (prev = "", page = "") => {
	let e = getCurrentPath();
	// 获取当前页面的前向地址的对象
	let _prevPath = prev || getApp().globalData.sa_referrer;
	// 获取当前页面的地址对象
	let _curPath = `${e}${page}` || "";
	this.sensors.track("MPViewPage", {
		$url_path: _curPath,
		$referrer: _prevPath,
	})
	getApp().globalData.sa_referrer = e
}

function prevPathFun() {
	let e = getCurrentPath();
	getApp().globalData.prevPath = e
}

export {
	preview,
	backToLogin,
	makePhone,
	isPhone,
	sensorShow,
	sensorClick
}
