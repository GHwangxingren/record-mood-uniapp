<template>
	<view class="other-container">
		<ml-myInfo :user-info="userInfo" />
		<view class="diary-wrap">
			<view class="scroll-wrapper">
				<!-- 日记list -->
				<view class="margin-bottom" v-for="(item, index) in diaryList" :key="item.id">
					<ml-diaryItem :obj="item" :radius="true" />
				</view>
				<ml-loadMore :status="loadMoreStatus" />
			</view>
		</view>
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
	}
</script>

<style lang="scss" scoped>
.other-container {
	.diary-wrap {
		margin: 0 40rpx;
	}
}
</style>
