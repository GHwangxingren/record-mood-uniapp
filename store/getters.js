const getters = {
  cardList: state => state.diary.cardList,
  rightList: state => state.diary.rightList,
  loginTip: state => state.user.loginTip,// 登陆提示框的显隐 
  token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	currentPage: state => state.route.currentPage // 记录当前页面路由
};

export default getters;
