<template>
	<view class="edit-container">
		<view class="cu-list menu">
			<view class="cu-item arrow" style="height: 80px;" @tap="ChooseImage">
				<view class="content">头像</view>
				<view class="img-wrap flex-center">
					<image :src="avatarUrl" mode="widthFix" class="img"></image>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">昵称</view>
				<view class="title"><input class="text-input text-grey" type="text" maxlength="6" v-model="nickName" /></view>
			</view>
			<view class="cu-item arrow">
				<view class="content">性别</view>
				<picker mode="selector" :range="sexArr" :value="sex" @change="handleSex">
					<view class="uni-input text-grey">{{ sexArr[sex] }}</view>
				</picker>
			</view>
			<view class="cu-item arrow">
				<view class="content">出生日期</view>
				<picker class="title" mode="date" :value="birthday" start="1992-01-01" end="2030-12-31" @change="bindDateChange">
					<view class="uni-input text-grey">{{ birthday }}</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top"><textarea maxlength="30" @input="inputChange" placeholder="与君共勉"></textarea></view>
		</view>
		<view class="bottom-btn flex-center">
			<view class="btn">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.edit-container {
	.content {
		color: #333;
	}
	
	.img-wrap {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.text-input {
		text-align: right;
	}

	.bottom-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 20rpx 0;

		.btn {
			@include flex-box();
			border: 1rpx solid var(--main-color);
			width: 400rpx;
			height: 80rpx;
			border-radius: 40rpx;
			color: var(--main-color);
		}
	}
}
</style>
