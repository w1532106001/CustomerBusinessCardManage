<template>
	<view class="container">
		<view style="flex: 1;overflow: hidden;">
			<view style="margin-top: 32rpx;margin-bottom: 78rpx;">学员信息详情</view>
			<u-row>

				<view style="margin-left: 30rpx;">
					<u--image :showLoading="true" :src="image[0].url" width="160rpx" height="200rpx">
					</u--image>
				</view>
				<view style="margin-left:40rpx;">
					<view>
						<u-row>
							姓名: {{name}}
						</u-row>
						<u-row customStyle="margin-top:34rpx;">
							职位: {{position}}
						</u-row>
						<u-row customStyle="margin-top:16rpx;">
							公司: {{companyName}}
						</u-row>
						<u-row customStyle="margin-top:16rpx;">
							电话: {{mobile}}
						</u-row>
					</view>
				</view>
			</u-row>
			<view style="margin-top: 100rpx;">
				<view style="padding-bottom: 20rpx;">VR地址</view>
				<u--text mode="link" :text="VRAddress" :href="VRAddress"></u--text>
			</view>
			<view style="margin-top: 100rpx;">
				<view style="padding-bottom: 30rpx;">企业介绍:</view>
				{{enterpriseIntroduction}}
			</view>
		</view>
		<view style="margin-bottom: 20rpx;" v-show="isAdmin">
			<u-button text="编辑" @click="jumpInputPage"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image: [{
							name: "file.jpg",
							extname: "jpg",
							url: "https://cdn.uviewui.com/uview/album/1.jpg",
						}],
				name: "小米",
				position: "总经理",
				mobile: "13655511111",
				address: "上海市",
				companyName: "人寿保险",
				enterpriseIntroduction: '阿斯顿撒旦阿斯顿撒旦撒旦阿萨大实打实飞洒大夫撒发阿斯顿撒旦阿斯顿撒旦撒旦阿萨大实打实飞洒大夫撒发阿斯顿撒旦阿斯顿撒旦撒旦阿萨大实打实飞洒大夫撒发阿斯顿撒旦阿斯顿撒旦撒旦阿萨大实打实飞洒大夫撒发阿斯顿撒旦阿斯顿撒旦撒旦阿萨大实打实飞洒大夫撒发',
				VRAddress: "http://www.baidu.com",
				isAdmin: true
			}
		},
		methods: {
			jumpInputPage() {
				uni.redirectTo({
					url: "/pages/input/input" + "?image=" + encodeURIComponent(JSON.stringify(this.image)) + "&name=" + this.name +
						"&position=" + this.position + "&mobile=" + this.mobile + "&address=" + this.address +
						"&companyName=" + this.companyName +
						"&enterpriseIntroduction=" + this.enterpriseIntroduction + "&VRAddress=" + this.VRAddress
				})
			}
		}
	}
</script>

<style>
	.container {
		padding-left: 20rpx;
		padding-right: 20rpx;
		line-height: 40rpx;
		color: #101010;
		font-size: 28rpx;
		height: 100vh;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		overflow: hideen
	}
</style>
