<template>
	<view class="container" style="background-color: #FFFFFF;">
		<view style="padding-bottom:14rpx;padding-top:26rpx;">
			<view style="display: inline-block;">学员通讯录</view>
			<view style="width: 240rpx;height: 60rpx;float: right;display: inline;margin-right: 20rpx;"
				@click="show = true">
				<view style="display: inline-block;">{{showText}}</view>
				<view style="float: right">
					<u-icon name="arrow-down"></u-icon>
				</view>
				<u-picker :show="show" :columns="columns" @confirm="onPickerConfirm" @cancel="onPickerCancel">
				</u-picker>
			</view>


		</view>
		<scroll-view style="flex: 1;overflow: hidden;" scroll-y refresher-enabled="true" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll" :refresher-triggered="triggered" :lower-threshold="100"
			@refresherrefresh="onRefresh">
			<view v-for="(item, index) in dataList" :key="index">
				<u-row @click="clickItem(item)"
					customStyle="border: 2rpx;border-style: solid;border-color: #CECECE;border-radius: 52rpx;padding: 30rpx;margin-bottom: 30rpx;color: #000000;"
					class="item">

					<view>
						<u--image :showLoading="true" :src="baseUrl+item.picUrl" width="160rpx"
							height="200rpx">
						</u--image>
					</view>
					<view style="margin-left:40rpx;">
						<view>
							<u-row>
								姓名: {{item.name}}
							</u-row>
							<u-row customStyle="margin-top:34rpx;">
								职位: {{item.employeeName}}
							</u-row>
							<u-row customStyle="margin-top:16rpx;">
								公司: {{item.companyName}}
							</u-row>
							<u-row customStyle="margin-top:16rpx;">
								电话: {{item.phone}}
							</u-row>
						</view>
					</view>
				</u-row>

			</view>

		</scroll-view>

		<view style="padding-top: 10rpx;height: 120rpx;">
			<u-button text="新增名片" @click="jumpInputPage"></u-button>
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
				dataList: [],
				triggered: false,
				show: false,
				columns: [
					['中国', '美国', '日本'],
				],
				showText: "",
				pages: 0,
				_freshing: false,
				total: 0,
				baseUrl:""

			}
		},
		onLoad() {
			this.baseUrl = getApp().globalData.baseUrl;
			this.onRefresh();
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
			onPickerConfirm(arr) {
				this.show = false;
				console.log(arr.value[0]);
				this.showText = arr.value[0];
			},
			jumpInputPage() {
				console.log("跳转页面")
				uni.navigateTo({
					url: "/pages/input/input"
				})
			},
			clickItem(item) {
				console.log("item:" + encodeURIComponent(JSON.stringify(item)))
				uni.navigateTo({
					url: "/pages/detail/detail?item=" + encodeURIComponent(JSON.stringify(item))
				})
			},
			fetchList(r) {
				uni.request({
					method: "GET",
					url: getApp().globalData.baseUrl+'/infos?pos=' + this.pages + '&limit=10', //仅为示例，并非真实接口地址。
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
							}
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

			}
		,fetchClassList(){
			
		}
		}
	}
</script>

<style>
	.container {
		padding: 20rpx;
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
