// pages/detail/detail.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading()
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: App.globalData.local+'/list',
      method: 'GET',
      data: {},
      success: function(res) {
        var list = res.data.list;
        if (list != null && res.data.code == 200) {
          that.setData({
            list: list
          })
        }else {
          var toastText = "获取数据失败" + "res.data.errMsg";
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          })
        }
      }
    })
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '风景demo分享详情页标题',
      path: '/pages/detail/detail',
      imageUrl: '/images/demo.png'
    }
  },
  addArea: function () {
    wx.navigateTo({
      url: '/pages/operation/operation',
    })
  },
  deleteArea: function(options) {
    var that = this;
  var data = options.target.dataset;
  var areaId = data.areaid;
  var areaname = data.areaname;
  var index = data.index;
  wx.showModal({
    title: '提示',
    content: '是否确认删除【' + areaname +'】吗？',
    success: function (res) {
      if (res.confirm) {
        //删除操作
        wx.request({
          url: 'http://localhost:3000/list',
          data: { "areaId": areaId},
          method:"GET",
          success: function(res) {
            var result = res.data.success;
            var toastText = "删除成功";
            if(result != true){
              toastText = "删除失败";
            }else{
              that.data.list.splice(index); 
              that.setData({
                list:that.data.list
              })
            }
            wx.showToast({
              title: toastText,
              icon:"",
              duration:2000
            })
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
  }
})