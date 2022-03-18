<template>

	<view class="container">
		<view style="margin-top: 23rpx;margin-bottom: 39rpx;padding-left: 32rpx;font-weight: bold;font-size: 40rpx;">
			学员信息录入</view>
		<scroll-view style="flex: 1;overflow: hidden;width: 100vw;" scroll-y @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll" :scroll-top="scrollTop">
			<view class="item" style="padding-bottom: 11rpx;">
				<view>头像</view>
				<view class="item-flex">
					<uni-file-picker ref="files" :auto-upload="false" v-model="imageValue" fileMediatype="image"
						:list-styles="listStyles" :image-styles="imageStyles" mode="grid" :limit="1" @select="select"
						@progress="progress" @success="success" @fail="fail">
					</uni-file-picker>
				</view>

				<view>
					<u-icon color="#000000" size="13" name="arrow-right"></u-icon>
				</view>

			</view>

			<view class="item" style="padding-top: 60rpx;padding-bottom: 38rpx;">
				<view>用户昵称</view>
				<view class="item-flex">
					<input v-model="detail.name" placeholder="请输入用户昵称" placeholder-style="color: #999999;" />
				</view>
				<view>
					<u-icon color="#000000" size="13" name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="item" style="padding-top: 60rpx;padding-bottom: 38rpx;">
				<view>职位</view>
				<view class="item-flex">
					<input v-model="detail.employeeName" placeholder="请输入职位" placeholder-style="color: #999999;" />
				</view>
				<view>
					<u-icon color="#000000" size="13" name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="item" style="padding-top: 60rpx;padding-bottom: 38rpx;">
				<view>电话</view>
				<view class="item-flex">
					<input v-model="detail.phone" type="number" placeholder="请输入联系电话"
						placeholder-style="color: #999999;" />
				</view>
				<view>
					<u-icon color="#000000" size="13" name="arrow-right"></u-icon>
				</view>
			</view>

			<view class="item" style="padding-top: 60rpx;padding-bottom: 38rpx;">
				<view>地址</view>
				<view class="item-flex">
					<input v-model="detail.address" placeholder="请输入地址" placeholder-style="color: #999999;" />
				</view>
				<view>
					<u-icon color="#000000" size="13" name="arrow-right"></u-icon>
				</view>
			</view>
			<view>
				<view class="item" style="padding-top: 60rpx;padding-bottom: 38rpx;" @click="showClassPickerFun">
					<view>班级</view>
					<view class="item-flex">
						<view v-if="className">{{className}}</view>
						<view v-else style="color: #999999;">请选择班级</view>
					</view>
					<view>
						<u-icon color="#000000" size="13" name="arrow-right"></u-icon>
					</view>
				</view>
				<u-picker :show="showClassPicker" :columns="classList" keyName="name" @confirm="onPickerConfirm"
					@cancel="onPickerCancel">
				</u-picker>
			</view>
			<view class="item" style="padding-top: 60rpx;padding-bottom: 38rpx;">
				<view>企业名</view>
				<view class="item-flex">
					<input v-model="detail.companyName" placeholder="请输入企业名" placeholder-style="color: #999999;" />
				</view>
				<view>
					<u-icon color="#000000" size="13" name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="item" style="padding-top: 60rpx;padding-bottom: 38rpx;">
				<view>企业介绍</view>
				<view class="item-flex">
					<input v-model="detail.companyIntroduction" placeholder="请输入企业介绍"
						placeholder-style="color: #999999;" />
				</view>
				<view>
					<u-icon color="#000000" size="13" name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="item" style="padding-top: 60rpx;padding-bottom: 38rpx;">
				<view>VR地址</view>
				<view class="item-flex">
					<input v-model="detail.vrUrl" placeholder="请输入VR地址" placeholder-style="color: #999999;" />
				</view>
				<view>
					<u-icon color="#000000" size="13" name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="item" style="padding-top: 60rpx;padding-bottom: 38rpx;">
				<view>企业照片</view>
				<view class="item-flex" style="		margin-right: 80rpx;">
					<uni-file-picker ref="files" :auto-upload="false" v-model="companyImageValue" fileMediatype="image"
						:list-styles="listStyles" :image-styles="imageStyles" mode="grid" :limit="1"
						@select="selectCompanyPicture">
					</uni-file-picker>
				</view>

			</view>


		</scroll-view>
		<view style="padding-top: 20rpx;padding-bottom: 30rpx;box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.6);">
			<u-button @click="submit" text="提交" shape="circle" color="#367FF3"
				customStyle="float:right;margin-right:26rpx; width:190rpx;height:72rpx;font-size: 31rpx;color: #FFFFFF;">
			</u-button>

		</view>
		<!-- 	<view style="background-color: #FFFFFF;padding: 20rpx;">
			<u-button text="提交" @click="submit"></u-button>
		</view> -->
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
				companyImageValue: [],
				imageStyles: {
					width: "160rpx",
					height: "160rpx",
					border: {
						color: "#BBBBBB",
						width: "2rpx",
						radius: "0rpx",
					}
				},
				listStyles: {
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						radius: 2
					}
				},
				selectImagePath: '',
				companyPicturePath: '',
				imageData: "",
				//1new 2update
				type: 1,
				detail: {},
				userInfo: {},
				classList: [],
				showClassPicker: false,
				className: ""
			}
		},
		onLoad(option) {
			console.log("进入input页面")
			this.userInfo = uni.getStorageSync("userInfo")
			this.classList = uni.getStorageSync("classList")

			if (option.detail) {
				let detail = JSON.parse(decodeURIComponent(option.detail))
				this.type = 2;
				this.detail = detail;
				this.imageValue = [{
						name: "file." + detail.extname,
						extname: detail.extname,
						url: getApp().globalData.baseUrl + detail.picUrl,
					}],
					this.companyImageValue = [{
						name: "file." + detail.extname,
						extname: detail.extname,
						url: getApp().globalData.baseUrl + detail.companyPicUrl,
					}],
					console.log("参数：" + detail.extname)
				let list = this.classList[0];
				for (var i in list) {
					let e = list[i];
					if (e.id == this.detail.classId) {
						this.className = e.name;
						return;
						}
			}
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
			selectCompanyPicture(e) {
				this.companyPicturePath = e.tempFilePaths[0];
				console.log('选择文件：', e)
				console.log('选择文件路径：', this.companyPicturePath)
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
				// if (!uni.$u.test.mobile(this.detail.phone)) {
				// 	uni.showToast({
				// 		title: "手机号格式错误",
				// 		icon: "error",
				// 		duration: 2000
				// 	})
				// 	return
				// }
				if (this.isEmpty(this.detail.address)) {
					this.showEmptyToast("地址")
					return
				}
				// if (this.isEmpty(this.detail.className)) {
				// 	this.showEmptyToast("班级")
				// 	return
				// }
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
				// if (!uni.$u.test.url(this.detail.vrUrl)) {
				// 	uni.showToast({
				// 		title: "VR地址格式错误",
				// 		icon: "error",
				// 		duration: 2000
				// 	})
				// 	return
				// }
				if (this.selectImagePath || this.companyPicturePath) {
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
				console.log("图片数据" + this.companyPicturePath)
				uni.showLoading({
					mask: true
				});
				let compressImagePromises = [];
				if (this.selectImagePath) {
					compressImagePromises.push(this.compressImage(this.selectImagePath));
				}
				if (this.companyPicturePath) {
					compressImagePromises.push(this.compressImage(this.companyPicturePath));
				}

				Promise.all(compressImagePromises).then(values => {
					var uploadImagePromises = [];
					console.log("图片压缩完成")
					if (this.selectImagePath && this.companyPicturePath) {
						uploadImagePromises.push(this.uploadImage(values[0]));
						uploadImagePromises.push(this.uploadCompanyImage(values[1]));
						console.log("上传用户与企业图片")

					} else if (this.companyPicturePath) {
						console.log("上传企业图片")
						uploadImagePromises.push(this.uploadCompanyImage(values[0]));
					} else {
						console.log("上传用户图片")
						uploadImagePromises.push(this.uploadImage(values[0]));

					}
					Promise.all(uploadImagePromises).then(values => {
						console.log("图片完成")
						console.log(values)
						if (this.type == 1) {
							this.newInfo();
						} else {
							this.updateInfo();
						}
					}).catch(err => {
						console.log(err)

					})
				}).catch(err => {
					console.log(err)

				});
			},
			compressImage(url) {
				console.log("图片压缩" + url)
				return new Promise((resolve, reject) => {
					uni.compressImage({
						src: url,
						quality: 80,
						success: res => {
							console.log("图片压缩成功" + res.tempFilePath)
							resolve(res.tempFilePath)

						},
						fail(e) {
							console.log('图片压缩失败e:' + e)
							uni.hideLoading();
							uni.showToast({
								duration: 2000,
								title: "图片压缩失败",
								icon: "error"
							})
							reject(e)
						}
					})
				});
			},
			uploadImage(url) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: getApp().globalData.baseUrl + "/upload",
						filePath: url,
						name: "file",
						header: {
							"Authorization": this.userInfo.openId
						},
						success: (res) => {
							console.log(res)
							if (res.statusCode == 200) {
								let picUrl = JSON.parse(res.data).data;
								this.detail.picUrl = picUrl;
								console.log("图片上传成功url:" + picUrl)
								resolve(picUrl)

							} else {
								uni.hideLoading();
								uni.showToast({
									title: res.errMsg,
									duration: 2000
								})
								reject(res.errMsg)
							}
						},
						fail(e) {
							uni.hideLoading();
							uni.showToast({
								icon: "error",
								title: "图片上传失败",
								duration: 2000
							})
							reject(e)
						}

					});

				})

			},
			uploadCompanyImage(url) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: getApp().globalData.baseUrl + "/upload",
						filePath: url,
						name: "file",
						header: {
							"Authorization": this.userInfo.openId
						},
						success: (res) => {
							console.log(res)
							if (res.statusCode == 200) {
								let picUrl = JSON.parse(res.data).data;
								this.detail.companyPicUrl = picUrl;
								console.log("图片上传成功url:" + picUrl)
								resolve(picUrl)
								// if (this.type == 1) {
								// 	this.newInfo()
								// } else {
								// 	this.updateInfo()
								// }
							} else {
								uni.hideLoading();
								uni.showToast({
									title: res.errMsg,
									duration: 2000
								})
								reject(res.errMsg)
							}
						},
						fail(e) {
							uni.hideLoading();
							uni.showToast({
								icon: "error",
								title: "图片上传失败",
								duration: 2000
							})
							reject(e)
						}

					});

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
					header: {
						"Authorization": this.userInfo.openId
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
				console.log("userInfo" + JSON.stringify(this.userInfo))
				uni.request({
					method: "POST",
					url: getApp().globalData.baseUrl + '/info', //仅为示例，并非真实接口地址。
					data: detail,
					header: {
						"Authorization": this.userInfo.openId
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
								title: "提交失败",
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

			},
			onPickerCancel() {
				this.showClassPicker = false;

			},
			onPickerConfirm(item) {
				this.showClassPicker = false;
				var value = item.values[0][item.indexs[0]];
				this.detail.classId = value.id;
				this.className = value.name;

			},
			showClassPickerFun() {
				this.showClassPicker = true;
			}
		}

	}
</script>

<style>
	.container {

		line-height: 40rpx;
		color: #333333;
		font-size: 29rpx;
		width: 100vw;
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
		border-bottom: 1rpx solid #E5E5E5;
		display: flex;
		flex-direction: row;
		padding-left: 32rpx;
		padding-right: 32rpx;
		align-items: center;
	}

	.item-flex {
		flex: 1;
		justify-content: flex-end;
		display: flex;
		margin-right: 54rpx;
		text-align: right;
	}
</style>
