<template>
	<view class="container">

		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
		<button @getuserinfo="onGetUserInfo" open-type="getUserInfo">获取用户信息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			onGetUserInfo(e) {
				console.log(e)
			},
			getUserInfo() {
				//登录
				uni.login({
					provider: 'weixin',
					success: res => {
						// console.log('登录成功：', res);
						//获取临时登录凭证code
						this.Code = res.code;
						//获取openid，session_key
						let appid = "wxcf9d5ce9a435c3bb" //需替换
						let secret = "1ab50a05195f0edfac9db2b1493f8eaa" //需替换
						let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' +
							secret +
							'&js_code=' +
							this.Code + '&grant_type=authorization_code';
						uni.request({
							url: url, // 请求路径
							success: res => {
								// console.log('openid session_key:', res.data);
								this.openid = res.data.openid
								this.session_key = res.data.session_key

								//获取用户信息
								uni.getUserInfo({
									provider: 'weixin',
									success: res => {
										console.log('获取用户信息', res);
										//解密encryptedData，可获取用户openId
										let pc = WXBizDataCrypt(appid, this
											.session_key);
										let data = pc.decryptData(res.encryptedData,
											res.iv);
										console.log('解密后：', data)
									},
									fail: err => {
										console.log('获取用户信息错误：', err)
									}
								})

							},
							fail: err => {
								console.log('请求失败：', err)
							}
						});
					},
					fail: err => {
						console.log('登录失败：', err)
					}
				})
			},
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
