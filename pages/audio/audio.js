// pages/audio/audio.js

var innerAudioContext = wx.createInnerAudioContext("myAudio")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration:0,
    currentTime:2,
    name:"歌名",
    author:"作者",
    poster:"/images/about.jpeg",
    paused:false,//播放状态
    animationData:{},
    //存储计时器
    setInter: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.createInnerAudioContext()
    this.animat()
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
    clearInterval(this.data.setInter)
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
  
  },
  createInnerAudioContext:function() {
    // var innerAudioContext = wx.createInnerAudioContext("myAudio")
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'http://dl.stream.qqmusic.qq.com/C400003I86Ke2ZVu3g.m4a?vkey=B9B874F581EBD1E785F1306C92054578E30791C0869EADE928968BE7701A46DE94DDEF3E9B8991BE5D121D19A7617A1A6EEC99A2E0075770&guid=6206086298&uin=0&fromtag=66'
    
    innerAudioContext.onPlay(() => {
      this.setData({
        paused: innerAudioContext.paused
      })
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
      innerAudioContext.destroy()
    })
  },
  play:function() {
    innerAudioContext.play()
    this.setData({
      paused: false
    })
    this.animat()
  },
  stop:function() {
    innerAudioContext.pause(); 
    this.setData({
      paused: true
    })
    this.animatstop()
  },
  star:function() {
    innerAudioContext.seek(0)
    if (innerAudioContext.paused) {
      innerAudioContext.play()
    }
    this.animat()
  },
  animat:function() {
    var ii = 1
    var i=-1
    var animation = wx.createAnimation({
      duration: 5000,
      timingFunction: 'linear',
      repeatCount:'infinite'
    })

    this.animation = animation

    animation.rotate(180).step()

    this.setData({
      animationData: animation.export()
    })
   
    //将计时器赋值给setInter
    this.data.setInter = setInterval(function () {
     
      this.animation = animation
      // 动画脚本定义
      // animation.rotate(-180).step()
      animation.rotate(180*i).step()
      // animation.rotate(180).step()

      // 更新数据
      this.setData({
        animationData: animation.export()
      })
      ++ii;
      if(i == -1) {
        i = 1
      }else{
        i = -1
      }
    }.bind(this), 5000);//循环时间 这里1000是1秒


  },
  animatstop:function() {  
    var animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'step-start'
    })

    this.animation = animation
    animation.rotate(0).step()
    //清除计时器  即清除setInter
    clearInterval(this.data.setInter)
  }

})