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
				<u-row
				@click="clickItem"
					customStyle="border: 2rpx;border-style: solid;border-color: #CECECE;border-radius: 52rpx;padding: 30rpx;margin-bottom: 30rpx;color: #000000;"
					class="item">

					<view>
						<u--image :showLoading="true" :src="item.image" width="160rpx" height="200rpx">
						</u--image>
					</view>
					<view style="margin-left:40rpx;">
						<view>
							<u-row>
								姓名: {{item.name}}
							</u-row>
							<u-row customStyle="margin-top:34rpx;">
								职位: {{item.position}}
							</u-row>
							<u-row customStyle="margin-top:16rpx;">
								公司: {{item.company}}
							</u-row>
							<u-row customStyle="margin-top:16rpx;">
								电话: {{item.mobile}}
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
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
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
				showText: "中国",
				pages: 1,
				_freshing: false

			}
		},
		onLoad() {
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
				console.log("加载数据")
				this.pages++;
				for (let i = 0; i < 30; i++) {
					this.dataList.push({
						image: "https://cdn.uviewui.com/uview/album/1.jpg",
						name: '测试' + i,
						position: '测试职位' + i,
						company: "测试企业" + i,
						mobile: "12345678901"
					})
				}
				console.log("加载数据成功")
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
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
					for (let i = 0; i < 30; i++) {
						var t = (this.pages-1)*30+i;
						this.dataList.push({
							image: "https://cdn.uviewui.com/uview/album/1.jpg",
							name: '测试' + t,
							position: '测试职位' + t,
							company: "测试企业" + t,
							mobile: "12345678901"
						})
					}
					console.log("刷新数据成功")
				}, 1000)
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
			clickItem(){
				uni.navigateTo({
					url:"/pages/detail/detail"
				})
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
