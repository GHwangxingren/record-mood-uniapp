/**
 * ==========
 *日记页状态数据
 * ==========
 */
const diary = {
	namespaced: true,
	state: {
		cardList: [{
			id: 1,
			createTime: '5秒前',
			avatarUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg',
			nickName: '小不点',
			memberId: 1001,
			title: '生活就像夏天的柑橘树，挂着青皮的果，苦是一定的，甜也有。        --《少年的你，如此美丽》',
			follow: false,
			isLike: true,
			gender: 1,
			likeNum: '28',
			commentNum: '1',
			imgList: [{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share1.jpg"
			}]
		}, {
			id: 2,
			"createTime": "2天前",
			"avatarUrl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg",
			"nickName": "小不点",
			memberId: 1001,
			"title": "对你从山有木兮木有枝的满心欢喜;到沅有芷兮澧有兰的小心翼翼;经过玲珑骰子安红豆的世俗俗气;最后陷入长相思兮长相忆的无穷思念",
			follow: false,
			gender: 1,
			isLike: false,
			likeNum: '24',
			commentNum: '0',
			"imgList": [{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share2.jpg"
			}, {
				url: 'https://xing-picture.oss-cn-beijing.aliyuncs.com/share3.jpg'
			}]
		}, {
			id: 3,
			"createTime": "8-20",
			"avatarUrl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg",
			"nickName": "小不点",
			memberId: 1001,
			gender: 1,
			"title": "我说你是人间的四月天； 笑音点亮了四面风； 轻灵，在春的光艳中交舞著变。 你是四月早天里的云烟， 黄昏吹着风的软， 星子在无意中闪，细雨点洒在花前。    --民国四大美人之首林徽因《你是人间四月天》",
			follow: false,
			isLike: false,
			likeNum: '24',
			commentNum: '0',
			"imgList": [{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share10.jpg"
			},{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share11.jpg"
			},{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share12.jpg"
			},{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share13.jpg"
			},{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share14.jpg"
			}]
		}, {
			id: 4,
			"createTime": "8-19",
			"avatarUrl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3757239321,1175359126&fm=26&gp=0.jpg",
			"nickName": "奥特曼与小怪兽",
			memberId: 1002,
			"title": "长得漂亮不如活得漂亮，身上有钱不如身上有才，说的好听不如做得好看，等着被人夸不如闷声发大财，死要面子不如过得痛快，东想西想不如做了再说，难以选择不如随便瞎选。",
			follow: false,
			isLike: false,
			gender: 1,
			likeNum: '24',
			commentNum: '0',
			"imgList": [{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share4.jpg"
			},{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share5.jpg"
			},{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share6.jpg"
			}]
		}, {
			id: 5,
			"createTime": "8-10",
			"avatarUrl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3757239321,1175359126&fm=26&gp=0.jpg",
			"nickName": "奥特曼与小怪兽",
			"memberId": 1002,
			gender: 1,
			"title": "有的东西不过很久，是不可能理解的。有的东西等到理解了，又为时已晚。大多时候，我们不得不在尚未清楚认识自己的心的情况下选择行动，因而感到迷惘和困惑。——村上春树《世界尽头与冷酷仙境》",
			"follow": true,
			"isLike": true,
			"likeNum": '24',
			"commentNum": '0',
			"imgList": [{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share7.jpg"
			}]
		}],
		rightList: [{
			id: 3,
			"createTime": "8-3",
			gender: 1,
			"avatarUrl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg",
			"nickName": "小不点",
			memberId: 1001,
			"title": "他和她本就该在一起，只是差一个时机，而我和他，我们在同一片天空下沐浴着相同的阳光，呼吸着一样的空气，认识一样的人，他的日出，我的日暮，没有时差，我们之间却像是隔着渡不过的海洋，翻不过去的山。他还年少，我亦青春。当我路过他恰巧也在。只是我们相遇未曾相识。",
			follow: false,
			isLike: false,
			likeNum: '24',
			commentNum: '0',
			"imgList": [{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share8.jpg"
			},{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share9.jpg"
			},{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share10.jpg"
			},{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share11.jpg"
			}]
		},{
			id: 1,
			createTime: '2秒前',
			avatarUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg',
			nickName: '小不点',
			memberId: 1001,
			gender: 1,
			title: '生活就像夏天的柑橘树，挂着青皮的果，苦是一定的，甜也有。        --《少年的你，如此美丽》',
			follow: false,
			isLike: false,
			likeNum: '28',
			commentNum: '1',
			imgList: [{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share3.jpg"
			}]
		}, {
			id: 2,
			"createTime": "3天前",
			"avatarUrl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg",
			"nickName": "小不点",
			"title": "幸福地生活自己就证明了自己的正确，证明了它是惟一正确的生活。 ----维特根斯坦",
			follow: false,
			isLike: false,
			gender: 1,
			likeNum: '24',
			commentNum: '0',
			"imgList": [{
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share15.jpg"
			}, {
				"url": "https://xing-picture.oss-cn-beijing.aliyuncs.com/share16.jpg"
			}]
		}]
	},
	mutations: {
		setCardList(state, payload) {
			state.cardList = payload;
		}
	},
	actions: {

	}
}

export default diary
