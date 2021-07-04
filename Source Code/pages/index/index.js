// pages/index/index.js
var bmap = require('../../libs/bmap-wx.min.js');
const timer = null
Page({
  data: {
    userInfo: {},
    thing: "接下来要做些什么呢?",
    things: ["听音乐", "看视频", "去学习","去逛街"],
		newThing: "看视频？听音乐？去学习？去逛街？",
		state: 'pause',
    i: 0,
    link: null,
    url: null,
    select: null,
    weatherData: '',
    today: '',
		timer: null,
		hi: '今天的天气适合去做些什么呢？'
    // btnText: "开始！",
    // isProcess: false
  },
  getUserInfo: function(e) {
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindClickTap: function() {
    var num, time = null
		var that = this
		this.data.timer = setInterval(function () {
          num = Math.ceil(Math.random() * 4), // 随机选择1-4
          that.setData({
						newThing: that.data.things[num-1]
          })
		},10)
    // console.log(num)
		that.setData({
			state: 'running',
			newThing: that.data.things[num],
      select: 0
    })
  },
  startTodo: function() {
		clearInterval(this.data.timer);
    if (this.data.newThing == '看视频') {
      this.setData({
        url: "/pages/video/video"
      });
    }
    if (this.data.newThing == '听音乐') {
      this.setData({
        url: "/pages/music/music"
      });
    }
    if (this.data.newThing == '去学习') {
      this.setData({
        url: "/pages/study/study"
      });
    }
		if (this.data.newThing == '去逛街') {
			this.setData({
				url: "/pages/shop/shop"
			});
		}
		this.setData({
			i: this.data.i += 1,
      select: this.data.select += 1,
			state: 'pause'
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'NRrzCNIyzSIMv67HPppFIl7lFl8NyL18'
    });
    var fail = function(data) {
      console.log('fail!!!!')
			that.setData({
				hi:'获取位置信息失败'
			})
    };
    var success = function(data) {
      console.log(data);
      console.log('success!!!');
      var weatherData = data.currentWeather[0];
      weatherData = '\n' + weatherData.currentCity + '\n' + weatherData.temperature + '\n' + weatherData.weatherDesc + ',' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData,
        today: data.originalData.date
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})