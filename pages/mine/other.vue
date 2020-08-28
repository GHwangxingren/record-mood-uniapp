<template>
	<view class="other-container">
		<ml-myInfo :user-info="userInfo" @change="handleMenu" />
		<view class="diary-wrap">
			<view class="scroll-wrapper">
				<!-- 日记list -->
				<view class="margin-bottom" v-for="(item, index) in diaryList" :key="item.id">
					<ml-diaryItem :obj="item" :radius="true" />
				</view>
				<ml-loadMore :status="loadMoreStatus" />
			</view>
		</view>
		<ml-loginTip />
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	
	export default {
		data() {
			return {
				diaryList: [],
				userInfo: {},
				loadMoreStatus: 2
			};
		},
		onLoad(options) {
			let memberId = options.memberId;
			
			options.userInfo && (this.userInfo = JSON.parse(decodeURIComponent(options.userInfo)));
			this.diaryList = this.cardList.filter(v => +v.memberId === +memberId);
		},
		computed: {
			...mapGetters(["cardList"])
		},
		methods: {
			handleMenu(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: "./collect"
						});
						break;
					case 1:
						uni.navigateTo({
							url: './fans?type=' + 0
						});
						break;
					case 2:
						uni.navigateTo({
							url: './fans?type=' + 1
						});
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.other-container {
	.diary-wrap {
		margin: 0 40rpx;
	}
}
</style>
