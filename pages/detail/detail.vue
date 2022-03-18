<template>
	<view class="container">
	<scroll-view style="flex: 1;overflow: hidden;width: 100vw;padding-left: 30rpx;padding-right: 30rpx;" scroll-y @scrolltoupper="upper"
		@scrolltolower="lower" @scroll="scroll" :scroll-top="scrollTop">
		
			<view style="margin-top: 22rpx;margin-bottom: 78rpx;font-size: 40rpx;font-weight: bold;">学员个人详情</view>
			<view style="margin-top: 53rpx;"> 
				<u-row>
					<u--image shape="circle" :showLoading="true" :src="baseUrl+detail.picUrl" width="200rpx" height="200rpx">
					</u--image>
					<view style="margin-left:37rpx;">
						<view style="font-size: 37rpx;font-weight: bold;">
							{{detail.name}}
						</view>
						<u-row customStyle="margin-top: 30rpx;">
							<view style="font-size: 27rpx;">
							{{detail.companyName}}						</view>
							<view style="margin-left:23rpx;font-size: 27rpx;">
							{{detail.employeeName}}						</view>
						</u-row>
						<u-row customStyle="margin-top: 27rpx;">
							<view style="font-size: 27rpx;">
								{{detail.phone}}
							</view>
						<view style="margin-left: 23rpx;"><u-icon color="#5479F3" size="12" name="phone"></u-icon></view>
						</u-row>
					</view>
				</u-row>
			</view>
			
			<view style="margin-top: 53rpx;">
				<view style="padding-bottom: 38rpx;font-size: 29rpx;	border-bottom: 1rpx solid #E5E5E5;">{{className}}</view>
			</view>
					<view style="margin-top: 53rpx;">
				<view style="padding-bottom: 38rpx;font-size: 29rpx;	border-bottom: 1rpx solid #E5E5E5;">{{detail.address}}</view>
			</view>	
			<view style="margin-top: 55rpx;    display: flex;">
				<view style="padding-bottom: 26rpx;font-size: 32rpx;font-weight: bold;">VR地址</view>
				<view style="margin-left: 20rpx;">				<u--text mode="link" :text="detail.vrUrl" :href="detail.vrUrl"></u--text></view>
			</view>
			<view style="margin-top: 26rpx;">
					<u--image :showLoading="true" :src="baseUrl+detail.companyPicUrl" width="690rpx" height="330rpx" ></u--image>

			</view>
			<view style="margin-top: 59rpx;font-size: 32rpx;font-weight: bold;">
				<view style="padding-bottom: 37rpx;">企业介绍:</view>
				<view style="font-size: 31rpx;line-height: 46rpx;font-weight: 400;">
					{{detail.companyIntroduction}}
				</view>
			</view>
	
	</scroll-view>
		<view style="padding-top: 20rpx;padding-bottom: 30rpx;box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.6);">
					<u-button  @click="jumpInputPage"  text="编辑" shape="circle"color="#367FF3" customStyle="float:right;margin-right:26rpx; width:190rpx;height:72rpx;font-size: 31rpx;color: #FFFFFF;"></u-button>
		
		</view>
		<!-- <view style="margin-bottom: 20rpx;" >
			<u-button text="编辑" @click="jumpInputPage"></u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				baseUrl: "",
				userInfo:{},
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				classList:[],
				className:''
			}
		},
		onLoad(option) {
			this.baseUrl = getApp().globalData.baseUrl;
			this.userInfo = uni.getStorageSync("userInfo")
			this.classList = uni.getStorageSync("classList")
			// uni.getStorage({
			// 	key:"userInfo",
			// 	success: (value) => {
			// 		this.userInfo = value;
			// 	}
			// })
		console.log("班级："+JSON.stringify(this.classList[0]))
			this.detail = JSON.parse(decodeURIComponent(option.item))
			let list= this.classList[0];
			for(var i in list){
				let e = list[i];
				if(e.id==this.detail.classId){
					this.className = e.name;
					return;
				}
			}
			
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
			jumpInputPage() {
				if(!this.userInfo.admin){
					uni.showToast({
						duration:2000,
						icon:"error",
						title:"管理员才可编辑"
					})
					return
				}
				uni.redirectTo({
					url: "/pages/input/input?detail=" + encodeURIComponent(JSON.stringify(this.detail))
				})
			}
		}
	}
</script>

<style>
	.container {
		
		line-height: 40rpx;
		font-size: 31px;
		font-weight: 400;
		color: #333333;
		height: 100vh;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		overflow: hideen
	}
</style>
