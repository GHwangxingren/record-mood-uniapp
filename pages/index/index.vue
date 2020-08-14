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
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	
	export default {
		data() {
			return {
				activeTab: 0,
				tabList: [
					{
						title: '漂流瓶'
					},
					{
						title: '聚集岛'
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
				sRightList: "rightList"
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
							avatarUrl: 'https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/cat.jpg',
							nickName: '小黄鸭',
							title: '洛稚喜欢盛淮南谁也不知道',
							follow: false,
							isLike: false,
							likeNum: '24',
							commentNum: '0',
							imgList: [
								{
									url: 'https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/1e942ff08083714184afbf42eba0d87.jpg'
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
