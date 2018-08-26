
// [
//   {
//     "title": "房贷标题房贷标题房贷标题房贷标题房贷标题房贷标题房贷标题",
//     "logo": "/images/logo.jpg",
//     "desc": "房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容房贷内容"
//   },
//   {
//     "title": "房贷标题",
//     "logo": "/images/logo.jpg",
//     "desc": "房贷内容"
//   },
//   {
//     "title": "房贷标题",
//     "logo": "/images/logo.jpg",
//     "desc": "房贷内容"
//   }
// ]



//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList:null,
    userInfo: null,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }],
    position: 'absolute',
    top: ""
  },
  // 滚动切换标签样式
  switchTab: function (e) {

    wx.pageScrollTo({
      scrollTop: 1000
    })
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {

    var cur = e.target.dataset.current;
   
    wx.pageScrollTo({
      scrollTop: 1000
    })

    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    this.setData({
      test:'01'
    })
    this.getProList()
    wx.showNavigationBarLoading()
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
      }
    })


    var that = this;
    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 0;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading()
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '风景demo分享标题主页',
      path: '/pages/index/index',
      imageUrl: '/images/demo.png',
      success: function (res) {
        // 转发成功

        that.shareClick();
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'none',
          duration: 2000
        })
      }

    }
  },
  toDetail: function(e) {
 
  var index = e.currentTarget.dataset.index;
  var codeValue = this.data.proList[index].codeValue
  wx.navigateTo({
    url: '/pages/detail/detail?codeValue=' + codeValue +'&index=' + index
  })
  },
  getProList: function() {
    var that = this;
    wx.request({
      url: app.globalData.host+'/common/getCode/jsbCountTaxesType', //仅为示例，并非真实的接口地址
      data: {
       
      },
      header: {
       
      },
      success: function (res) {
        that.setData({
          proList: res.data
        })
      }
    })
  },
  getUserInfo: function () {
    this.setData({
      userInfo: JSON.stringify(app.globalData.userInfo)
    })
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success(res) {
              console.log(res)
              // that.UserLogin();
              // wx.startRecord()    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // scope: 'scope.userInfo',   // 用户信息 wx.getUserInfo
              //   scope: 'scope.userLocation',   // 地理位置 wx.getLocation, wx.chooseLocation
              //     scope: 'scope.address',    // 通讯地址 wx.chooseAddress
              //       scope: 'scope.record',   // 录音功能 wx.startRecord
              //         scope: 'scope.writePhotosAlbum'   // 保存到相册  wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum
            },
            fail() { },
            complete() { }
          })
        }
        else {
          // that.UserLogin();
        }
      }
    })
  },
  footerTap: app.footerTap
})
