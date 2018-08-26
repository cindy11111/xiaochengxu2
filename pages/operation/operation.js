// pages/operation/operation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaId:undefined,
    areaName:"",
    proiority:"",
    addUrl:"http://localhost:3000/list2",
    modifyUrl: "http://localhost:3000/list2"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.areaId == undefined) {
      return
    }
    var that = this;
    this.setData({
      areaId: options.areaId,
      areaName: options.areaName,
      proiority: options.proiority

    })
    


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
  
  },
  formSubmit: function (e) {
    console.log(e)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var params = e.detail.value;

    var url = this.data.addUrl;
    if (this.data.areaId != undefined) {//编辑
      url = this.data.modifyUrl;
      params.areaId = this.data.areaId;
    }
    wx.request({
      url: url,
      data: JSON.stringify(params),
      method:'POST',
      'content-type': 'application/json',
      success: function (res) {
        console.log(res.data)
        var list = res.data.list;
        if (list.success  && res.data.code == 200) {
          wx.navigateTo({
            url: "pages/detail/detail"
          })
        } else {
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
  formReset: function () {
    console.log('form发生了reset事件')
  }
})