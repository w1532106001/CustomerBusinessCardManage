<template>

	<view class="container">
		<view style="150rpx;margin-top: 32rpx;margin-bottom: 30rpx;">学员信息录入</view>
		<scroll-view style="flex: 1;overflow: hidden;" scroll-y @scrolltoupper="upper" @scrolltolower="lower"
			@scroll="scroll">
			<view style="display: flex;align-items: center;">
				<view>姓名:</view>
				<input v-model="name" class="input-border" />
			</view>
			<view class="item">
				<view>职位:</view>
				<input v-model="position" class="input-border" />
			</view>
			<view class="item">
				<view>电话:</view>
				<input v-model="mobile" class="input-border" />
			</view>
			<view class="item">
				<view>地址:</view>
				<input v-model="address" class="input-border" />
			</view>
			<view class="item">
				<view>企业名:</view>
				<input v-model="companyName" class="input-border" />
			</view>
			<view class="item" style="margin-top: 30rpx;">
				<view>企业介绍:</view>
				<textarea v-model="enterpriseIntroduction" class="textarea-border" />
			</view>
			<view style="margin-top: 68rpx; display: flex; flex-direction: row; ">
				<view>照片</view>
				<uni-file-picker :auto-upload="false" style="margin-left: 80rpx;width: 400rpx;height: 306rpx; "
					v-model="imageValue" fileMediatype="image" :image-styles="imageStyles" mode="grid" :limit="1"
					@select="select" @progress="progress" @success="success" @fail="fail">
				</uni-file-picker>

			</view>
			<view class="item">
				<view>VR地址:</view>
				<input v-model="VRAddress" class="input-border" />
			</view>

		</scroll-view>
		<view style="background-color: #FFFFFF;padding: 20rpx;">
			<u-button text="提交" @click="submit"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				position: "",
				mobile: "",
				address: "",
				companyName: "",
				enterpriseIntroduction: "",
				VRAddress: "",
				imageValue: [],
				imageStyles: {
					width: "400rpx",
					height: "306rpx",
					border: {
						color: "#BBBBBB",
						width: "2rpx",
						radius: "0rpx",
					}
				},

			}
		},
		onLoad(option) {
			this.name = option.name;
			this.position = option.position;
			this.mobile = option.mobile;
			this.address = option.address;
			this.companyName = option.companyName;
			this.enterpriseIntroduction = option.enterpriseIntroduction;
			this.VRAddress = option.VRAddress;
			this.imageValue = JSON.parse(decodeURIComponent(option.image)) 
			console.log("参数：" + option.toString())
		},
		methods: {
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			submit() {
				console.log("name:" + this.name + "position:" + this.position + "mobile:" + this.mobile + "address:" + this
					.address)
			},
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

	.input-border {
		margin-left: 10rpx;
		border: 2rpx;
		border-style: solid;
		border-color: #BBBBBB;
		width: 400rpx;
		height: 68rpx;
	}

	.textarea-border {
		margin-left: 10rpx;
		border: 2rpx;
		border-style: solid;
		border-color: #BBBBBB;
		width: 400rpx;
		height: 200rpx;
	}

	.item {
		padding-top: 30rpx;
		display: flex;
		align-items: center;
	}
</style>
