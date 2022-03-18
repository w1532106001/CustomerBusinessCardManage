<template>
	<view>
		<view class="container" style="background-color: #FFFFFF;" v-if="userInfo.isBind">

			<scroll-view style="flex: 1;overflow: hidden;" scroll-y @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll" :scroll-top="scrollTop">
				<view v-for="(item, index) in classList" :key="item.id">
					<u-swipe-action>
						<u-swipe-action-item :options="options1" autoClose :key="item.id" @click="deleteClass(index,item.id)">
							<view
								style="padding-top: 60rpx;padding-bottom: 40rpx;margin-left: 30rpx;margin-right: 30rpx;border-bottom:  1rpx solid #E5E5E5;">
								{{item.name}}
							</view>
						</u-swipe-action-item>
					</u-swipe-action>



				</view>

			</scroll-view>

			<view style="padding-top: 20rpx;padding-bottom: 30rpx;box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.6);">
				<u-button @click="showModel" text="+班级" shape="circle" color="#367FF3"
					customStyle="float:right;margin-right:26rpx; width:190rpx;height:72rpx;font-size: 31rpx;color: #FFFFFF;">
				</u-button>

			</view>

		</view>

		<u-modal :show="show" :title="title" closeOnClickOverlay showConfirmButton showCancelButton @confirm="confirm"
			@close="close" @cancel="cancel">
			<view class="slot-content">
				<u--input placeholder="请输入班级名" border="surround" v-model="value" @change="change"></u--input>
			</view>
		</u-modal>
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
				baseUrl: "",
				userInfo: {},
				classList: [],
				options1: [{
					text: '删除',
					style: {
						backgroundColor: '#F33636'
					}
				}],
				show: false,
				title: '新增班级',
				value: ''

			}
		},
		onLoad() {
			this.baseUrl = getApp().globalData.baseUrl;
			this.userInfo = uni.getStorageSync("userInfo")
			this.fetchClassList();
		},
		methods: {
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
			fetchClassList() {
				uni.request({
					method: "GET",
					url: getApp().globalData.baseUrl + '/class',
					success: (res) => {
						if (res.statusCode == 200) {
							console.log("获取班级列表")
							this.classList = res.data.data;
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
			addClass(className) {
				uni.showLoading();
				uni.request({
					method: "POST",
					url: getApp().globalData.baseUrl + '/class',
					data: {
						"className":className
					},
					header: {
						"Authorization": this.userInfo.openId
					},
					success: (res) => {
						console.log(res)
						uni.hideLoading();
						if (res.statusCode == 200) {
							console.log("新增班级成功")
							uni.showToast({
								icon: "success",
								title: "新增班级成功",
								duration: 2000
							})
							this.fetchClassList();
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
							title: "新增班级失败",
							duration: 2000
						})
					}
				});

			},
			showModel() {
				this.show = true;
			},
			deleteClass(index,id) {
				this.classList.splice(index,1);
				uni.request({
					method: "DELETE",
					url: getApp().globalData.baseUrl + '/class/'+id,
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
			change(e) {
				console.log('change', e);
			},
			confirm() {
				this.show = false;
				this.addClass(this.value);
				this.value = '';
			},
			cancel() {
				this.show = false;
				this.value = '';
			},
			close() {
				this.show = false;
				this.value = '';
			}
		}
	}
</script>

<style>
	.container {
		/* padding: 20rpx; */
		font-weight: 400;
		line-height: 40rpx;
		color: #333333;
		font-size: 29rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hideen
	}
</style>
