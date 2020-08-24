<template>
	<view class="detail-content">
		<!-- 头部信息 -->
		<view class="item-head">
			<view class="left-info">
				<view class="l-avator flex-center">
					<image class="img" src="../../static/img/login/ic-QQ@2x.png" mode=""></image>
				</view>
				<view class="l-nickname">奥特曼打小怪兽</view>
			</view>
			<view :class="['follow-btn flex-center']" @tap="handleFllow(item.id)">{{ true ? "关注ta" : "取消关注" }}</view>
		</view>
		<!-- 图片banner -->
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		name: "diaryDetail",
		data() {
			return {};
		},
		computed: {},
		methods: {}
	}
</script>