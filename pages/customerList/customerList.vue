<template>
	<view class="container" style="background-color: #FFFFFF;" v-if="userInfo.isBind">
		<view style="padding-top:24rpx;margin-left: 32rpx;margin-right: 30rpx;">
			<view style="display: inline-block;color: #333333;font-size: 40rpx;font-weight: bold;">学员通讯录</view>
			<view style="width: 240rpx;height: 60rpx;float: right;display: inline;margin-right: 20rpx;"
				@click="show = true">
				<u-row customStyle="float:right;">
					{{selectClass.name}}
				<view style="margin-left: 15rpx;"><u-icon name="arrow-down"></u-icon></view>
				</u-row>
				<u-picker :show="show" :columns="classList" keyName="name" @confirm="onPickerConfirm"
					@cancel="onPickerCancel">
				</u-picker>
			</view>


		</view>
		<scroll-view style="flex: 1;overflow: hidden;" scroll-y refresher-enabled="true" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll" :refresher-triggered="triggered" :lower-threshold="100"
			@refresherrefresh="onRefresh">
			<view v-for="(item, index) in dataList" :key="item.id">
				<u-swipe-action>
					<u-swipe-action-item :options="options1" autoClose :key="item.id" @click="deleteMember(index,item.id)">
						<view style="padding-left: 30rpx;padding-right: 30rpx; margin-top: 68rpx;color: #333333;" @click="clickItem(item)">
							<u-row customStyle="border-bottom:1rpx solid #E5E5E5;padding-bottom: 25rpx;position: relative;">
								<view>
									<u--image shape="circle" :showLoading="true" :src="baseUrl+item.picUrl" width="90rpx" height="90rpx">
									</u--image>
								</view>
								<view style="margin-left: 18rpx;">
									<u-row>
										<view style="font-size: 32rpx;color: #333333;font-weight: bold;">{{item.name}}</view>
										<view style="margin-left: 18rpx;font-size: 27rpx;color: #999999;">手机: {{item.phone}}</view>
									</u-row>
									<u-row customStyle="margin-top:17rpx;">
										<view>{{item.companyName}}</view>
										<view style="margin-left: 33rpx;">{{item.employeeName}}</view>
									</u-row>
								</view>
								<view style="position:absolute;right:0px;bottom: 0px;margin-bottom: 25rpx;"><u-icon color="#5479F3" size="22" name="phone"></u-icon></view>
							</u-row>
							
						</view>
						
					</u-swipe-action-item>
				</u-swipe-action>
				
				
				
			</view>

		</scroll-view>

		<view style="padding-top: 20rpx;padding-bottom: 30rpx;box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.6);">
			<u-button  @click="jumpInputPage"  text="+名片"  shape="circle"color="#367FF3" customStyle="float:right;margin-right:26rpx; width:190rpx;height:72rpx;font-size: 31rpx;color: #FFFFFF;"></u-button>
			<u-button  @click="jumpClassManagementPage"  text="班级管理" plain="true" shape="circle"color="#367FF3" customStyle="float:right;margin-right:33rpx;width:190rpx;height:72rpx;font-size: 31rpx;color: #367FF3;"></u-button>
			
		</view>

	</view>
	<view v-else-if="!userInfo.isBind" style="background-color: #FFFFFF;height: 100vh;display: flex;flex-flow: column;justify-content: center;align-items: center;">
		<view style="">
			<u--image :showLoading="true" src="https://pindtech.cn/shede/public/shedeLogo.png" width="300rpx"
				height="300rpx">
			</u--image>
		</view>
		<button type="default"
			style="margin: 120rpx;padding-left: 80rpx;padding-right: 80rpx; background-color: #09C567; border-radius: 20rpx;color: #FFFFFF;"
			open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">手机号登陆</button>
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
				dataList: [],
				triggered: false,
				show: false,

				classList: [],

				pages: 0,
				_freshing: false,
				total: 0,
				baseUrl: "",
				selectClass: {},
				userInfo: {},
				options1: [{
					text: '删除',
					style: {
						backgroundColor: '#F33636'
					}
				}],
				// bindPhone:false,

			}
		},
		onLoad() {
			this.baseUrl = getApp().globalData.baseUrl;
			this.getUserInfo();
		},
		onShow() {
	
			if (this.userInfo.isBind == true) {
	
				this.fetchClassList();
			}
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
				this.loadmore();
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			loadmore() {
				if (this.pages >= this.total) {
					return
				} else {
					this.pages++;
					this.fetchList(false);
				}

			},
			onRefresherpulling() {
				console.log("下拉")
				this.onRefresh();
			},
			onRefresh() {
				if (this._freshing) return;
				console.log("刷新")
				this._freshing = true;
				this.triggered = true;
				this.pages = 0;
				this.fetchList(true);
			},
			onPickerCancel() {
				this.show = false;

			},
			onPickerConfirm(item) {
				this.show = false;
				this.selectClass = item.values[0][item.indexs[0]];
				this.onRefresh();
			},
			jumpInputPage() {
				console.log("跳转页面")
				if (!this.userInfo.admin) {
					uni.showToast({
						duration: 2000,
						icon: "error",
						title: "管理员才可新增"
					})
					return
				}
				uni.navigateTo({
					url: "/pages/input/input"
				})
			},jumpClassManagementPage() {
				console.log("跳转页面")
				if (!this.userInfo.admin) {
					uni.showToast({
						duration: 2000,
						icon: "error",
						title: "管理员才可管理班级"
					})
					return
				}
				uni.navigateTo({
					url: "/pages/classManagement/classManagement"
				})
			},
			clickItem(item) {
				console.log("item:" + encodeURIComponent(JSON.stringify(item)))
				uni.navigateTo({
					url: "/pages/detail/detail?item=" + encodeURIComponent(JSON.stringify(item))
				})
			},
			fetchList(r) {
				console.log('fetchList infos openId:' + this.userInfo.openId);
				uni.request({
					method: "GET",
					url: getApp().globalData.baseUrl + '/infos?pos=' + this.pages + '&limit=10&classId=' + this
						.selectClass.id,
					header: {
						"Authorization": this.userInfo.openId
					},
					success: (res) => {
						if (r) {
							this.triggered = false;
							this._freshing = false;
						}
						if (res.statusCode == 200) {
							let data = res.data.data;
							this.total = res.data.total;
							console.log("page " + this.pages + "total:" + this.total)
							if (data) {
								if (r) {
									this.dataList = [];
								}
								for (var i = 0; i < data.length; i++) {
									var e = data[i];
									this.dataList.push(e)
								}
							}else{
								this.dataList = [];
							}
						} else {
							if (res.statusCode == 403) {
								uni.showToast({
									icon: "error",
									title: "没有查看权限",
									duration: 2000
								});
							} else {
								if (r) {
									uni.showToast({
										icon: "error",
										title: "刷新失败",
										duration: 2000
									});
								} else {
									uni.showToast({
										icon: "error",
										title: "加载失败",
										duration: 2000
									})
								}
							}



						}
					},
					fail: (e) => {
						console.log(e)
						if (r) {
							this.triggered = false;
							this._freshing = false;
							uni.showToast({
								icon: "error",
								title: "刷新失败",
								duration: 2000
							})
						} else {
							uni.showToast({
								icon: "error",
								title: "加载失败",
								duration: 2000
							})
						}
					}
				});

			},
			fetchClassList() {
				uni.request({
					method: "GET",
					url: getApp().globalData.baseUrl + '/class',
					success: (res) => {
						if (res.statusCode == 200) {
							console.log("获取班级列表")
							this.classList = [];
							this.classList.push(res.data.data);
							uni.setStorageSync("classList", this.classList)
							this.classList[0].unshift({
								"id":0,
								"name":"全部"
							})
							this.selectClass = this.classList[0][0];
						console.log("获取班级列表 onRefresh")
							this.onRefresh();
						} else {
							uni.showToast({
								icon: "error",
								title: "班级列表获取失败",
								duration: 2000
							});

						}
					},
					fail: (e) => {
						console.log(e)
						uni.showToast({
							icon: "error",
							title: "班级列表获取失败",
							duration: 2000
						})
					}
				});
			},
			getUserInfo() {
				//登录
				uni.login({
					provider: 'weixin',
					success: res => {
						//获取临时登录凭证code
						var code = res.code;
						uni.request({
							method: "POST",
							url: getApp().globalData.baseUrl + '/wxLogin',
							data: {
								"code": code
							},
							success: (res) => {
								console.log("code:" + code + "resultData:" + JSON.stringify(res));
								if (res.statusCode == 200) {
									if (res.data.code == 200) {
										let data = res.data.data;
										console.log("进入登录 data" + JSON.stringify(data))
										this.userInfo = data;
										uni.setStorageSync("userInfo", data)
										if (this.userInfo.isBind) {
											console.log("getUserInfo fetchClassList")
											this.fetchClassList();
										}
									} else {
										uni.showToast({
											icon: "error",
											title: "用户信息获取失败",
											duration: 2000
										})
									}


								} else {
									uni.showToast({
										icon: "error",
										title: "用户信息获取失败",
										duration: 2000
									})

								}
							},
							fail: (e) => {
								console.log(e)
								uni.showToast({
									icon: "error",
									title: "用户信息获取失败",
									duration: 2000
								})
							}
						});
					},
					fail: err => {
						console.log('登录失败：', err)
						uni.showToast({
							icon: "error",
							title: "用户信息获取失败",
							duration: 2000
						})
					}
				})

			},
			decryptPhoneNumber(e) {
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					//手机号授权成功
					let code = e.detail.code
					this.bindPhone(code)

				} else {
					uni.showToast({
						duration: 2000,
						title: "手机号授权失败",
						icon: "error"
					})
				}
			},
			bindPhone(code) {
				console.log("bindPhone code" + code + "openId" + this.userInfo.openId)
				uni.request({
					method: "POST",
					url: getApp().globalData.baseUrl + '/bind',
					data: {
						"code": code,
						"openId": this.userInfo.openId
					},
					success: (res) => {
						console.log("bindPhone" + JSON.stringify(res))
						if (res.statusCode == 200) {
							if (res.data.code == 200) {
								this.userInfo.isBind = true;
								this.userInfo.phone = res.data.msg;
								uni.setStorageSync("userInfo", this.userInfo)
								console.log("bindPhone fetchClassList")
								this.fetchClassList();

							} else {
								uni.showToast({
									icon: "error",
									title: "手机号绑定失败",
									duration: 2000
								})
							}


						} else {
							uni.showToast({
								icon: "error",
								title: "手机号绑定失败",
								duration: 2000
							})

						}
					},
					fail: (e) => {
						console.log(e)
						uni.showToast({
							icon: "error",
							title: "手机号绑定失败",
							duration: 2000
						})
					}
				});

			}
		,	deleteMember(index,id) {
				this.dataList.splice(index,1);
				uni.request({
					method: "DELETE",
					url: getApp().globalData.baseUrl + '/info/'+id,
					header: {
						"Authorization": this.userInfo.openId
					},
					success: (res) => {
						console.log(res)					
					},
					fail: (e) => {
						console.log(e)}
				});
				
			},
		}
	}
</script>

<style>
	.container {
		/* padding: 20rpx; */
		font-weight: 400;
		line-height: 40rpx;
		color: #101010;
		font-size: 28rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hideen
	}

	.text-margin {
		margin-right: 20rpx;
	}
</style>
