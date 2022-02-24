<template>

	<view class="container">
		<view style="150rpx;margin-top: 32rpx;margin-bottom: 30rpx;">学员信息录入</view>
		<scroll-view style="flex: 1;overflow: hidden;" scroll-y @scrolltoupper="upper" @scrolltolower="lower"
			@scroll="scroll" :scroll-top="scrollTop">
			<view style="display: flex;align-items: center;">
				<view>姓名:</view>
				<input v-model="detail.name" class="input-border" />
			</view>
			<view class="item">
				<view>职位:</view>
				<input v-model="detail.employeeName" class="input-border" />
			</view>
			<view class="item">
				<view>电话:</view>
				<input v-model="detail.phone" type="number" class="input-border" />
			</view>
			<view class="item">
				<view>地址:</view>
				<input v-model="detail.address" class="input-border" />
			</view>
			<view class="item">
				<view>班级:</view>
				<input v-model="detail.className" class="input-border" />
			</view>
			<view class="item">
				<view>企业名:</view>
				<input v-model="detail.companyName" class="input-border" />
			</view>
			<view class="item" style="margin-top: 30rpx;">
				<view>企业介绍:</view>
				<textarea v-model="detail.companyIntroduction" class="textarea-border" />
			</view>
			<view style="margin-top: 68rpx; display: flex; flex-direction: row; ">
				<view>照片</view>
				<uni-file-picker ref="files" :auto-upload="false"
					style="margin-left: 80rpx;width: 400rpx;height: 306rpx; " v-model="imageValue" fileMediatype="image"
					:image-styles="imageStyles" mode="grid" :limit="1" @select="select" @progress="progress"
					@success="success" @fail="fail">
				</uni-file-picker>

			</view>
			<view class="item">
				<view>VR地址:</view>
				<input v-model="detail.vrUrl" class="input-border" />
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
				scrollTop: 0,
				old: {
					scrollTop: 0
				},

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
				selectImagePath: '',
				imageData: "",
				//1new 2update
				type: 1,
				detail: {},
				userInfo:{}
			}
		},
		onLoad(option) {
			
			uni.getStorage({
				key:"userInfo",
				success: (value) => {
					this.userInfo = value;
				}
			})
			if (option.detail) {
				let detail = JSON.parse(decodeURIComponent(option.detail))
				this.type = 2;
				this.detail = detail;
				this.imageValue = [{
						name: "file." + detail.extname,
						extname: detail.extname,
						url: getApp().globalData.baseUrl + detail.picUrl,
					}],
					console.log("参数：" + detail.extname)
			} else {
				this.type = 1;
			}

		},
		methods: {
			// 获取上传状态
			select(e) {
				this.selectImagePath = e.tempFilePaths[0];
				console.log('选择文件：', e)
				console.log('选择文件路径：', this.selectImagePath)
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
				if (this.isEmpty(this.detail.name)) {
					this.showEmptyToast("姓名")
					return
				}
				if (this.isEmpty(this.detail.employeeName)) {
					this.showEmptyToast("职位")
					return
				}
				if (this.isEmpty(this.detail.phone)) {
					this.showEmptyToast("电话")
					return
				}
				if (this.isEmpty(this.detail.address)) {
					this.showEmptyToast("地址")
					return
				}
				if (this.isEmpty(this.detail.className)) {
					this.showEmptyToast("班级")
					return
				}
				if (this.isEmpty(this.detail.companyName)) {
					this.showEmptyToast("企业名")
					return
				}
				if (this.isEmpty(this.detail.companyIntroduction)) {
					this.showEmptyToast("企业介绍")
					return
				}
				if (this.isEmpty(this.detail.vrUrl)) {
					this.showEmptyToast("VR地址")
					return
				}
				if (this.selectImagePath) {
					this.uploadFile();
				} else {
					uni.showLoading({
						mask: true
					});
					if (this.type == 1) {
						this.newInfo();
					} else {
						this.updateInfo();
					}
				}
			},
			uploadFile() {
				console.log("图片数据" + this.selectImagePath)
				uni.showLoading({
					mask: true
				});
				uni.compressImage({
					src: this.selectImagePath,
					quality: 80,
					success: res => {
						console.log(res.tempFilePath)
						uni.uploadFile({
							url: getApp().globalData.baseUrl + "/avatar",
							filePath: res.tempFilePath,
							name: "file",
							header:{
								"Authorization":this.userInfo.openId
							},
							success: (res) => {
								console.log(res)
								if (res.statusCode == 200) {
									let picUrl = JSON.parse(res.data).data;
									this.detail.picUrl = picUrl;
									console.log("图片上传成功url:" + picUrl)
									if (this.type == 1) {
										this.newInfo()
									} else {
										this.updateInfo()
									}
								} else {
									uni.hideLoading();
									uni.showToast({
										title: res.errMsg,
										duration: 2000
									})
								}
							},
							fail(e) {
								console.log(e);
								uni.hideLoading();
								uni.showToast({
									icon: "error",
									title: "图片上传失败",
									duration: 2000
								})
							}

						});

					},
					fail(e) {
						console.log('图片压缩失败e:' + e)
						uni.hideLoading();
						uni.showToast({
							duration: 2000,
							title: "图片压缩失败",
							icon: "error"
						})
					}
				})

			},
			updateInfo() {
				var detail = this.detail;
				detail.phone = parseInt(detail.phone);
				console.log("detail" + JSON.stringify(this.detail))
				uni.request({
					method: "PUT",
					url: getApp().globalData.baseUrl + '/info/' + this.detail.id,
					data: detail,
					header:{
						"Authorization":this.userInfo.openId
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading();
						if (res.statusCode == 200) {
							console.log("提交成功")
							uni.showToast({
								icon: "success",
								title: "提交成功",
								duration: 2000
							})
							uni.navigateBack();
						} else {
							uni.showToast({
								title: res.errMsg,
								duration: 2000
							})
						}
					},
					fail: (e) => {
						console.log(e)
						uni.hideLoading();
						uni.showToast({
							icon: "error",
							title: "提交失败",
							duration: 2000
						})
					}
				});

			},
			newInfo(picUrl) {
				var detail = this.detail;
				detail.phone = parseInt(detail.phone);
				console.log("detail" + JSON.stringify(this.detail))
				uni.request({
					method: "POST",
					url: getApp().globalData.baseUrl + '/info', //仅为示例，并非真实接口地址。
					data: detail,
					header:{
						"Authorization":this.userInfo.openId
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading();
						if (res.statusCode == 200) {
							uni.showToast({
								icon: "success",
								title: "提交成功",
								duration: 2000
							})
							console.log("提交成功")
							uni.navigateBack();
						} else {
							uni.showToast({
								title: res.errMsg,
								duration: 2000
							})
						}
					},
					fail: (e) => {
						console.log(e)
						uni.hideLoading();
						uni.showToast({
							icon: "error",
							title: "提交失败",
							duration: 2000
						})
					}
				});
			},
			showEmptyToast(s) {
				uni.showToast({
					title: s + "不能为空",
					icon: "error",
					duration: 2000
				})
			},
			isEmpty(str) {
				return (!str || 0 === str.length);

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
