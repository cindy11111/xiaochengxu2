

function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onLoad:function() {
    this.setData()
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    src: 'https://pc.v.k.360kan.com/vod-xinxiliu-tv-q3-bj/120313372_1-1525484945-84c6cedb-6aa9-6fee.mp4?time=1533471897&sign=9c8c6e2b113d3189548fd9e62b34e165&from=pc_from_2751442312',//https://pc.v.k.360kan.com/vod-xinxiliu-tv-q3-bj/120313372_1-1525484945-84c6cedb-6aa9-6fee.mp4?time=1533471897&sign=9c8c6e2b113d3189548fd9e62b34e165&from=pc_from_2751442312
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        console.log(11)
        that.setData({
          src: res.tempFilePath
        })
      },
      error: function (xhr, errorType, error) {
        console.log(error)
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  setData:function() {
    wx.request({
      url: 'http://localhost:3000/list', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
      }
    })
  }
})