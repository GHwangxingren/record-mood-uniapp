<script>
	export default {
		globalData: {  
				sa_referrer: "" // 设置全局属性，记录页面浏览前向地址  
		},  
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import '@/style/colorui/main.css';
	@import '@/style/colorui/icon.css';
	@import '@/style/colorui/animation.css';
	@import "@/style/variable.css";
	/*每个页面公共css */
	page {
		background-color: #f5f8f9;
	}
</style>
