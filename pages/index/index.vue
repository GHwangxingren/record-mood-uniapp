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
		<ml-refresh>
			<view class="content-wrap">
				<view v-if="activeTab === 0">
					漂流瓶
					<view class="margin-bottom" v-for="(item, index) in cardList" :key="index">
						<!-- <y-DiaryItem :obj="item" /> -->
					</view>
				</view>
				<view v-else>
					聚集岛
					<view class="margin-bottom" v-for="(item, index) in myList" :key="index">
						<!-- <y-DiaryItem :obj="item" /> -->
					</view>
				</view>
			</view>
		</ml-refresh>
	</view>
</template>

<script>
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
				rightList: []
			}
		},
		onLoad() {

		},
		methods: {
			handleTab(index) {
				this.activeTab = index;
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
