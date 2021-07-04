// pages/study/study.js
// The last modify:2020.05.03 18:39(beta Ver.)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    setInter: '',
    num: null,
    min: null,
    z: null,
    state: ''
  },

  // 1 打开加速度监听:
  startAccelerometer: function() {
    wx.startAccelerometer({
      interval: 'ui'
    })
    this.setData({
      num: 0,
      state: ''
    })
    if (this.data.z >= 0.8) { //如果手机反扣
      this.startSetInter() //调用计时
    } else {
      setTimeout(this.startAccelerometer, 1000); // 递归，每秒一次
    }
  },
  // 3 判断是否要暂停:
  judgPause: function() {
    var that = this
    if (that.data.z < 0.8) {
      clearInterval(that.data.setInter), //清除计时器  即清除setInter
        that.setData({
          state: 'pause'
        })
    }
  },
  // 2 开始计时
  startSetInter: function() {
    var that = this;
    //将计时器赋值给setInter:
    that.data.setInter = setInterval(
      function() {
        that.judgPause();
        if (that.data.num == 60) {
          that.setData({
            min: that.data.min += 1,
            num: 0
          });
        }
        var numVal = that.data.num + 1;
        that.setData({
          num: numVal
        });
        console.log('计时：' + that.data.num + 's');
      }, 1000); // 循环 每1000ms执行一次
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.onAccelerometerChange(function(res) {
      that.setData({
        z: res.z
      })
    })
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