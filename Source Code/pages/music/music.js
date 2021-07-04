// pages/music/music.js
var music = require('../../libs/music.js');
const innerAudioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
		title:'今日·华语新歌首发',
    newSong: [], // 新歌首发
    musicInfo: {},
    isPlay: 0,
    musicImg: '',
  },

  playThis: function(e) {
    // console.log(e)
    this.setData({
      isPlay: 0
    })
    wx.request({
      url: 'http://m.kugou.com/app/i/getSongInfo.php',
      data: {
        cmd: 'playInfo',
        hash: e.target.dataset.hash
      },
      success: (res) => {
        console.log(res)
        // this.innerAudioContext.play()
        this.setData({
          musicInfo: res.data,
          musicURL: res.data.url,
          isPlay: 1,
        })
        this.playM()
      },
			fail: arr => {
				this.setData({
					title: '获取歌单失败'
				}
				)} 
    })
    wx.request({
      url: 'http://tools.mobile.kugou.com/api/v1/singer_header/get_by_hash',
      data: {
        size: 200,
        format: 'json',
        hash: e.target.dataset.hash
      },
      success: (res) => {
        this.setData({
          musicImg: res.data.url,
        })
      }
    })
  },
  playM: function() {
    innerAudioContext.src = this.data.musicInfo.url
    innerAudioContext.play()
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })
  },
  // 单击 播放歌曲
  playMusic: function() {
    innerAudioContext.play()
    this.setData({
      isPlay: '1'
    })
  },
  // 单击 暂停歌曲
  pauseMusic: function() {
    innerAudioContext.pause()
    this.setData({
      isPlay: '0'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function() {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取新歌
    music.getNewsong(res => {
      wx.hideLoading();
      var Newsong = res.data;
      console.log(Newsong)
      this.setData({
        newSong: Newsong,
      });
    });
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
		this.pauseMusic()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
		this.pauseMusic()
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