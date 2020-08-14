<template>
	<button @tap="goLogin">去登陆</button>
</template>

<script>
	export default {
		methods: {
			goLogin() {
				uni.navigateTo({
					url: "../login/login"
				})
			}
		}
	}
</script>
