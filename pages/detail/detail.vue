<template>
	<view class="container">
		<view style="flex: 1;overflow: hidden;">
			<view style="margin-top: 32rpx;margin-bottom: 78rpx;">学员信息详情</view>
			<u-row>

				<view style="margin-left: 30rpx;">
					<u--image :showLoading="true" :src="'http://4xg4c2.natappfree.cc'+detail.picUrl" width="160rpx" height="200rpx">
					</u--image>
				</view>
				<view style="margin-left:40rpx;">
					<view>
						<u-row>
							姓名: {{detail.name}}
						</u-row>
						<u-row customStyle="margin-top:34rpx;">
							职位: {{detail.employeeName}}
						</u-row>
						<u-row customStyle="margin-top:16rpx;">
							公司: {{detail.companyName}}
						</u-row>
						<u-row customStyle="margin-top:16rpx;">
							电话: {{detail.phone}}
						</u-row>
					</view>
				</view>
			</u-row>
			<view style="margin-top: 100rpx;">
				<view style="padding-bottom: 20rpx;">VR地址</view>
				<u--text mode="link" :text="detail.vrUrl" :href="detail.vrUrl"></u--text>
			</view>
			<view style="margin-top: 100rpx;">
				<view style="padding-bottom: 30rpx;">企业介绍:</view>
				{{detail.companyIntroduction}}
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
				isAdmin: true,
				detail:{}
			}
		},
		onLoad(option) {
			this.detail = JSON.parse(decodeURIComponent(option.item)) 
			
		},
		methods: {
			jumpInputPage() {
				uni.redirectTo({
					url: "/pages/input/input?detail="+encodeURIComponent(JSON.stringify(this.detail))
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
