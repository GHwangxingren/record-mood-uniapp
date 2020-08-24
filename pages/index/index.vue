<template>
	<view class="home">
		<!-- 顶部分页栏 -->
		<view class="top-tab">
			<view
				v-for="(item, index) in tabList" 
				:key="index" 
				:class="['tab-item flex-center', activeTab === index ? 'active' : '']" 
				@tap="handleTab(index)">
				{{ item.title }}
			</view>
		</view>
		<!-- 中间主体内容列表 -->
		<ml-refresh ref="pullDownRefresh" @refresh="onPulldownReresh">
			<view class="content-wrap">
				<view v-if="activeTab === 0">
					<view class="margin-bottom" v-for="(item, index) in cardList" :key="item.id">
						<ml-diaryItem :obj="item" />
					</view>
				</view>
				<view v-else>
					<view class="margin-bottom" v-for="(item, index) in rightList" :key="item.id">
						<ml-diaryItem :obj="item" />
					</view>
				</view>
				<ml-loadMore :status="loadMoreStatus" />
			</view>
		</ml-refresh>
		<!-- 右下角悬浮按钮 -->
		<ml-hoverBtn :bottom="140" :right="40" :btnList="hoverBtn" @click="handleHoverBtn"></ml-hoverBtn>
		<ml-loginTip></ml-loginTip>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	
	export default {
		data() {
			return {
				activeTab: 0,
				tabList: [
					{
						title: '我们的轨迹'
					},
					{
						title: '我的轨迹'
					}
				],
				hoverBtn: [
					{
						bgColor: '#16C2C2',
						text: '发布',
						fontSize: 28,
						color: '#fff'
					},
					{
						bgColor: '#37b59d',
						text: '分享',
						fontSize: 28,
						color: '#fff'
					}
				],
				cardList: [],
				rightList: [],
				loadMoreStatus: 1, //0加载前，1加载中，2没有更多了
			}
		},
		computed: {
			...mapGetters({
				sCardList: "cardList",
				sRightList: "rightList",
				token: "token"
			})
		},
		onLoad() {
			this.loadData('add');
			this.rightList = this.sRightList;
		},
		onReachBottom() {
			this.loadData("add");
		},
		methods: {
			...mapMutations({
				setLoginTip: "user/setLoginTip"
			}),
			handleHoverBtn(e) {
				let index = e.index;
					switch (index) {
						case 0:
							if(!this.token) {
								this.setLoginTip(true);
								return;
							}
							uni.navigateTo({
								url: '../publish/publish'
							});
							break;
						case 1:
							console.log("分享");
							break;
					}
			},
			handleTab(index) {
				this.activeTab = index;
			},
			loadData(type) {
				if (type === 'add') {
					// 上拉加载
					let list = this.cardList;
					
					if (list.length === 8) {
						this.loadMoreStatus = 2;
					} else if (list.length > 0) {
						this.cardList = this.cardList.concat({
							id: 2,
							time: '06-17',
							avatarUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771555881,3104139652&fm=26&gp=0.jpg',
							nickName: '小不点',
							title: '如果一些事，没有过来，不必焦虑，过好现在的生活。何必因几年后，几月后或几天后的事而影响现在的心情。没那必要！',
							follow: false,
							isLike: false,
							likeNum: '24',
							commentNum: '0',
							imgList: [
								{
									url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598241680559&di=4da875fc6fed2f0e3e35bbe19cf59b63&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F46%2F82%2F01300542519536139979829457314.jpg'
								}
							]
						});
					} else {
						this.cardList = this.sCardList;
					}
				} else {
					// 结束下拉刷新
					setTimeout(() => {
						this.cardList = [];
						this.cardList = this.sCardList.slice(0, 4);
						this.$refs.pullDownRefresh && this.$refs.pullDownRefresh.endPulldownRefresh();
					}, 1200)
				}
			},
			//下拉刷新
			onPulldownReresh() {
				this.loadData('refresh');
			},
		}
	}
</script>

<style lang="scss" scoped>
.home {
	padding-top: 120rpx;
	
	.top-tab {
		display: flex;
		height: 120rpx;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
		background-color: var(--white-color);

		.tab-item {
			flex: 1;
			color: #999;
			border-bottom: 4rpx solid #ececec;
		}

		.active {
			color: var(--main-color);
			border-bottom: 4rpx solid var(--main-color);
		}
	}
}
</style>
