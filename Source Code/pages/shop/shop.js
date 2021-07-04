// pages/eat/eat.js
var bmap = require('../../libs/bmap-wx.min.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		rests: [],	//数据
		title: "附近的商场"
	},

	viewLocation: function (e) {
		var info = this.data.rests[e.currentTarget.id]
		console.log(info)
		wx.openLocation({
			name: info.title,
			address: info.address,
			latitude: info.latitude,
			longitude: info.longitude,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		var BMap = new bmap.BMapWX({
			ak: 'NRrzCNIyzSIMv67HPppFIl7lFl8NyL18'
		});
		var fail = function (res) {
			console.log(res)
			that.setData({
				title: '获取位置信息失败'
			})
		};
		var success = function (res) {
			console.log(res)
			var info = res.wxMarkerData;
			console.log(info)
			that.setData({
				rests: info,
			})
		}
		// 发起检索:
		BMap.search({
			"query": '商场',
			fail: fail,
			success: success
		}); 
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})