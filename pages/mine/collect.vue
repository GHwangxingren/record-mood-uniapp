<template>
	<view class="collect-container">
		<template v-if="cardList.length">
			<view class="margin-bottom" v-for="(item, index) in cardList" :key="index">
				<ml-diaryItem :obj="item" />
			</view>
			</template>
			<template v-else>
				<ml-empty />
			</template>
			<ml-loginTip />
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	
	export default {
		data() {
			return {};
		},
		computed: {
			...mapGetters(["cardList"])
		}
	}
</script>

<style lang="scss" scoped></style>
