const getters = {
  cardList: state => state.diary.cardList,
  rightList: state => state.diary.rightList,
  loginTip: state => state.user.loginTip,// 登陆提示框的显隐 
  token: state => state.user.token 
};

export default getters;
